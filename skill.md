# Nexus Project — Skill Reference

<!-- BACKEND -->

## BACKEND

### Tech Stack

- **Language:** Go (Golang)
- **Router:** `github.com/go-chi/chi/v5` — lightweight, idiomatic HTTP router
- **Database:** PostgreSQL — diakses menggunakan `database/sql` + driver `github.com/lib/pq` (raw SQL, tanpa ORM)
- **Auth:** `github.com/golang-jwt/jwt/v5` — JWT HS256, dengan in-memory blacklist + cleanup goroutine
- **Password hashing:** `golang.org/x/crypto/bcrypt`
- **Validation:** `github.com/go-playground/validator/v10`
- **File storage:** MinIO (S3-compatible), diakses via AWS SDK v2 (`github.com/aws/aws-sdk-go-v2`)
- **UUID:** `github.com/google/uuid`
- **Config:** dibaca manual dari `.env` tanpa library eksternal (menggunakan `bufio.Scanner`)
- **Module name:** `backend`

---

### Arsitektur

**Clean Architecture** — setiap fitur dibagi menjadi 5 layer:

```
entity → repository → service → handler → route
```

- **entity** — struct domain/model database (tidak ada ORM tag, hanya `json` tag)
- **repository** — interface + implementasi PostgreSQL, berisi raw SQL query
- **service** — interface + implementasi bisnis logika, tidak tahu soal HTTP
- **handler** — menerima HTTP request, decode/validasi, panggil service, tulis response
- **route** — mendaftarkan endpoint ke chi router beserta middleware yang dipakai

Dependency injection dilakukan secara manual di `cmd/main.go` (tidak pakai DI container).

Contoh urutan inisialisasi di `cmd/main.go`:

```go
// 1. Load config
cfg := config.LoadConfig()

// 2. Inisialisasi database
db := database.InitPostgres(cfg.DBURL)

// 3. Inisialisasi utils/shared
jwtManager := utils.NewJWTManager(cfg.JWTSecret, cfg.JWTExpiry)
validator  := validator.NewValidator()
s3Uploader := s3.NewS3Uploader(cfg)

// 4. Wire auth feature (repo → service → handler)
authRepo    := authrepo.NewAuthRepository(db)
authService := authservice.NewAuthService(authRepo, jwtManager)
authHandler := authhandler.NewAuthHandler(authService, validator, jwtManager)

// 5. Wire product feature
productRepo     := productrepo.NewProductRepository(db)
photoRepo       := photorepo.NewProductPhotoRepository(db)
productService  := productservice.NewProductService(productRepo, photoRepo, ..., s3Uploader)
productHandler  := producthandler.NewProductHandler(productService, validator)

// 6. Setup router
r := chi.NewRouter()
r.Use(middleware.Logger, middleware.Recoverer, ...)
router.SetupRoutes(r, authHandler, productHandler, ..., jwtManager)

// 7. Start server
http.ListenAndServe(":"+cfg.Port, r)
```

---

### Struktur Folder

```
backend/
├── cmd/
│   └── main.go                  # Entry point: inisialisasi config, DB, semua layer, router, server
├── router/
│   └── route.go                 # SetupRoutes() — menyusun semua route group /api/v1
├── internal/
│   ├── config/
│   │   └── config.go            # Struct Config, LoadConfig() baca .env manual
│   ├── database/
│   │   └── postgres.go          # InitPostgres() — sql.Open + Ping
│   ├── middleware/
│   │   ├── cors_middleware.go       # CORS: allow localhost:3000, credentials, preflight
│   │   ├── jwt_middleware.go        # JWTAuth() — cek Bearer header / cookie "token", blacklist, inject claims ke context
│   │   ├── logger_middleware.go     # Logger — wrap ResponseWriter, log method+path+status+durasi
│   │   ├── rate_limit_middleware.go # RateLimit(n, window) — token bucket per IP, cleanup goroutine
│   │   └── recover_middleware.go    # Recoverer — recover dari panic, log stack trace
│   ├── response/
│   │   └── response.go          # Helper: Success, SuccessPaginated, Error, ValidationError, WriteJSON
│   ├── validator/
│   │   └── validator.go         # Wrapper go-playground/validator, return map[string]string errors
│   ├── utils/
│   │   ├── jwt.go               # JWTManager: GenerateToken, VerifyToken, BlacklistToken, IsTokenBlacklisted
│   │   ├── time.go              # utils.Now() — helper waktu
│   │   ├── common/
│   │   │   └── pagination.go    # Helper pagination (offset dari page+limit)
│   │   └── s3/
│   │       └── s3_uploader.go   # S3Uploader: UploadFile, DeleteObject — terhubung ke MinIO via path-style
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.go         # LoginRequest (email, password), LoginResponse (id,email,name,role,access_token)
│   │   │   └── register.go      # RegisterRequest, RegisterResponse
│   │   ├── entity/
│   │   │   └── user.go          # User{ID,Name,Email,Password(json:"-"),Role,CreatedAt}
│   │   ├── repository/
│   │   │   └── auth_repository.go   # Interface AuthRepository + postgresAuthRepository (FindByEmail, Register)
│   │   ├── service/
│   │   │   └── auth_service.go      # Interface AuthService + authService (Login, Register, BlacklistToken)
│   │   ├── handler/
│   │   │   └── auth_handler.go      # AuthHandler: Login, Register, Me, Logout
│   │   └── route/
│   │       └── route.go             # RegisterAuthRoutes: POST /login (rate-limit 5/min), POST /register, GET /me (JWT), POST /logout (JWT)
│   └── features/
│       ├── master/
│       │   ├── attributes/          # Sama strukturnya: dto, entity, handler, repository, route, service
│       │   ├── categories/          # Sama strukturnya
│       │   └── colors/              # Sama strukturnya
│       └── products/
│           ├── dto/
│           │   └── product.go       # ProductRequest, ProductDetailResponse, ProductListResponse, nested photo/category/color/attribute DTOs
│           ├── entity/
│           │   └── product.go       # Product, ProductPhoto, ProductCategory, ProductColor, ProductAttribute
│           ├── repository/
│           │   ├── product_repository.go            # CRUD produk utama (soft delete via deleted_at)
│           │   ├── product_photo_repository.go      # FindByProductID, CreateBatch, DeleteByProductID
│           │   ├── product_color_repository.go      # FindByProductID, CreateBatch, DeleteByProductID
│           │   ├── product_category_repository.go   # FindByProductID, CreateBatch, DeleteByProductID
│           │   └── product_attribute_repository.go  # FindByProductID, CreateBatch, DeleteByProductID
│           ├── service/
│           │   └── product_service.go   # Interface ProductService + productService (List, Detail, Create, Update, Delete)
│           ├── handler/
│           │   └── product_handler.go   # ProductHandler: GetList, GetDetailByID, Create, Update, Delete
│           └── route/
│               └── route.go             # RegisterProductRoutes — semua endpoint JWT-protected
```

---

### Interface Pattern (Repository & Service)

Setiap layer repository dan service selalu punya **interface** di file yang sama, diikuti struct implementasinya. Ini yang membuat dependency injection bisa bekerja.

```go
// auth/repository/auth_repository.go

// Interface — didaftarkan sebagai dependency di service
type AuthRepository interface {
    FindByEmail(ctx context.Context, email string) (*entity.User, error)
    Register(ctx context.Context, user *entity.User) (*entity.User, error)
}

// Struct implementasi — hanya tahu tentang *sql.DB
type postgresAuthRepository struct {
    db *sql.DB
}

// Constructor — return interface, bukan concrete type
func NewAuthRepository(db *sql.DB) AuthRepository {
    return &postgresAuthRepository{db: db}
}

func (r *postgresAuthRepository) FindByEmail(ctx context.Context, email string) (*entity.User, error) {
    var user entity.User
    err := r.db.QueryRowContext(ctx,
        "SELECT id, name, email, password, role, created_at FROM users WHERE email = $1",
        email,
    ).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.Role, &user.CreatedAt)
    if err != nil {
        return nil, err
    }
    return &user, nil
}
```

```go
// auth/service/auth_service.go

type AuthService interface {
    Login(ctx context.Context, req *dto.LoginRequest) (*dto.LoginResponse, error)
    Register(ctx context.Context, req *dto.RegisterRequest) (*dto.RegisterResponse, error)
}

type authService struct {
    repo       repository.AuthRepository
    jwtManager *utils.JWTManager
}

func NewAuthService(repo repository.AuthRepository, jwtManager *utils.JWTManager) AuthService {
    return &authService{repo: repo, jwtManager: jwtManager}
}
```

Pola yang sama berlaku untuk semua fitur lain (product, category, color, attribute).

---

### Cara Routing Bekerja

1. `cmd/main.go` membuat `chi.Router`, mendaftarkan middleware global, lalu memanggil `router.SetupRoutes()`
2. `router/route.go` → `SetupRoutes()` membuat prefix `/api/v1` lalu mendelegasikan ke tiap fungsi `Register*Routes()` per fitur
3. Setiap `route/route.go` per fitur mendaftarkan endpoint-nya sendiri, termasuk menerapkan `middleware.JWTAuth()` pada group yang perlu proteksi

Contoh route lengkap:

```
GET  /api/v1/auth/me
POST /api/v1/auth/login       ← rate-limited 5 req/menit
POST /api/v1/auth/logout      ← JWT required
GET  /api/v1/products/        ← JWT required
GET  /api/v1/products/{id}    ← JWT required
POST /api/v1/products/        ← JWT required, multipart/form-data
PUT  /api/v1/products/{id}    ← JWT required, multipart/form-data
DELETE /api/v1/products/{id}  ← JWT required
```

---

### Middleware

| Middleware                | Keterangan                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ |
| `Recoverer`               | Recover panic, log stack trace, return 500                                                                                          |
| `Logger`                  | Log `[METHOD] path                                                                                                                  | Status: N | Durasi: Xms` |
| `CORS`                    | Allow `http://localhost:3000`, credentials, preflight OPTIONS                                                                       |
| `JWTAuth(jwtManager)`     | Cek Bearer header atau cookie `token`, cek blacklist, inject `*JWTClaims` ke context key `user_claims` dan raw token ke `raw_token` |
| `RateLimit(n, window)`    | Token bucket per IP, cleanup goroutine setiap 10 menit                                                                              |
| `chiMiddleware.CleanPath` | Normalkan path URL (dari chi/v5/middleware)                                                                                         |

Middleware global (semua request): Recoverer → Logger → CORS → CleanPath
Middleware per-route: JWTAuth, RateLimit

---

### Response Format

Semua response menggunakan struct `APIResponse`:

```json
{
  "success": true/false,
  "message": "...",
  "data": {...},           // omitempty
  "metadata": {...},       // omitempty — untuk pagination
  "errors": {...}          // omitempty — untuk validation errors
}
```

Helper functions di `internal/response/response.go`:

- `Success(w, status, message, data)`
- `SuccessPaginated(w, status, message, data, metadata)` — metadata berisi `page`, `limit`, `nextPage`
- `Error(w, status, message)`
- `ValidationError(w, message, errors)` — status 422

---

### Validasi

- Menggunakan `go-playground/validator/v10` yang di-wrap di `internal/validator/validator.go`
- Struct DTO diberi tag `validate:"required,email,min=6"` dsb.
- Method `Validate(s interface{}) map[string]string` mengembalikan map field → pesan error
- Handler memanggil `h.validator.Validate(req)` sebelum memanggil service
- Jika validasi gagal → `response.ValidationError(w, "Validation failed", validationErrors)` → 422

Contoh pemakaian di handler:

```go
// DTO dengan tag validasi
type LoginRequest struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=6"`
}

// Di handler
var req dto.LoginRequest
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    response.Error(w, http.StatusBadRequest, "Invalid JSON format")
    return
}
if validationErrors := h.validator.Validate(req); validationErrors != nil {
    response.ValidationError(w, "Validation failed", validationErrors)
    return
}
```

---

### Auth Flow

1. **Login**: decode JSON → validasi → `repo.FindByEmail` → `bcrypt.CompareHashAndPassword` → `jwtManager.GenerateToken` → set HttpOnly cookie `token` + return access token di body
2. **Auth check**: JWT middleware ambil token dari `Authorization: Bearer` header atau cookie `token` → cek blacklist → `jwtManager.VerifyToken` → inject `*JWTClaims` ke context
3. **Me**: baca `*JWTClaims` dari context key `user_claims`
4. **Logout**: `jwtManager.BlacklistToken(token, expiresAt)` → hapus cookie (`MaxAge: -1`)
5. **Blacklist**: in-memory `map[string]time.Time`, dilindungi `sync.RWMutex`, goroutine cleanup setiap 1 jam

Cara membaca claims dari context di handler:

```go
// Ambil claims dari context (sudah di-inject oleh JWTAuth middleware)
claims, ok := r.Context().Value(middleware.UserContextKey).(*utils.JWTClaims)
if !ok {
    response.Error(w, http.StatusUnauthorized, "Unauthorized")
    return
}
// claims.ID, claims.Email, claims.Role, claims.Name tersedia
```

Cara mendaftarkan route dengan JWT protection:

```go
// route/route.go — gunakan r.Group() + r.Use(middleware.JWTAuth())
func RegisterProductRoutes(r chi.Router, h *handler.ProductHandler, jwtManager *utils.JWTManager) {
    r.Group(func(r chi.Router) {
        r.Use(middleware.JWTAuth(jwtManager))
        r.Get("/", h.GetList)
        r.Get("/{id}", h.GetDetailByID)
        r.Post("/", h.Create)
        r.Put("/{id}", h.Update)
        r.Delete("/{id}", h.Delete)
    })
}
```

---

### Product Flow (fitur paling kompleks)

- Product punya 5 sub-repository: product utama, photo, color, category, attribute
- **Create**: validasi → insert produk → upload foto ke MinIO (folder `"products"`) → batch insert photo/category/color/attribute
- **Update**: validasi → update produk → hapus relasi lama (delete-then-reinsert) → jika ada file baru: hapus foto lama dari MinIO + DB, upload yang baru
- **Delete**: hapus foto dari MinIO → soft delete produk (`deleted_at = NOW()`)
- **List**: support query param `search` (ILIKE), `page`, `limit` (default 30)
- Foto pertama selalu di-set sebagai `is_primary = true`
- Upload via `multipart/form-data`, max 10MB, field name `photos`
- Attributes dikirim sebagai JSON string di field `attributes`

---

### Konfigurasi (`.env`)

| Key              | Default                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `PORT`           | `8000`                                                               |
| `JWT_SECRET`     | `default_secret_key`                                                 |
| `JWT_EXPIRY`     | `24` (jam)                                                           |
| `DB_URL`         | postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable |
| `ENV`            | `development`                                                        |
| `S3_ENDPOINT`    | —                                                                    |
| `S3_ACCESS_KEY`  | —                                                                    |
| `S3_SECRET_KEY`  | —                                                                    |
| `S3_REGION`      | —                                                                    |
| `S3_BUCKET_NAME` | —                                                                    |

<!-- FRONTEND -->

## FRONTEND

### Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + `clsx` + `tailwind-merge` (helper `cn()` di `lib/utils.ts`)
- **HTTP Client:** Axios — dikonfigurasi di `lib/axios.ts` dengan interceptor request (auto-inject token) dan interceptor response (global toast error)
- **Server State:** TanStack Query v5 (`@tanstack/react-query`) — wrap di `providers/QueryProvider.tsx`
- **Form:** React Hook Form v7 + Zod v4 (via `@hookform/resolvers/zod`)
- **Table:** `@tanstack/react-table` v8
- **Notifications:** `sonner` — `<Toaster>` di root layout, `toast.success/error()` dari hook
- **Icons:** `lucide-react`
- **Cookie:** `js-cookie`
- **Animation:** `gsap`
- **Font:** Montserrat (Google Fonts via `next/font/google`)
- **Package manager:** pnpm

---

### Arsitektur Frontend

**Layered Feature Architecture** — setiap fitur (feature slice) dibagi menjadi file-file terpisah berdasarkan tanggung jawab:

```
feature/
├── feature.constant.ts    # Konstanta (query keys, route, nilai default, dll)
├── feature.types.ts       # TypeScript interfaces & types
├── feature.schema.ts      # Zod schema + type inferensi (LoginInput, dsb)
├── feature.hook.ts        # Custom hook: state, form, API calls, navigasi
└── feature.tsx            # UI komponen — hanya render, tidak ada logika bisnis
```

Pola ini konsisten di seluruh `admin/features/**` dan masing-masing sub-fitur (list, form, detail) punya file sendiri.

---

### Struktur Folder

```
frontend/
├── middleware.ts                  # Next.js middleware: route guard /admin/* — cek cookie token via /auth/me
├── next.config.ts
├── tsconfig.json
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout: font Montserrat, QueryProvider, ConfirmProvider, Toaster
│   ├── page.tsx                   # Landing page (user-facing)
│   ├── admin/
│   │   ├── layout.tsx             # Admin layout (client): AuthGuard — cek /auth/me, handle network error, render PageLayout
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── master/
│   │   │   ├── attribute/
│   │   │   ├── category/
│   │   │   └── color/
│   │   └── product/
│   │       ├── page.tsx           # Product list page
│   │       ├── create/page.tsx
│   │       └── [id]/
│   │           ├── page.tsx       # Product detail
│   │           └── edit/page.tsx  # Product edit (reuse form)
│   └── dashboard/                 # User-facing dashboard
├── admin/                         # Admin feature slice
│   ├── api/                       # URL constants per resource
│   │   ├── auth.api.ts            # AUTH_API_URL: login, logout, me
│   │   ├── product.api.ts         # PRODUCT_API_URL: list, detail(id), create, update(id), delete(id)
│   │   ├── category.api.ts
│   │   ├── color.api.ts
│   │   └── attribute.api.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── loading/           # Loading skeleton/spinner komponen
│   │   │   ├── pageLayout/        # PageLayout + TitleContext (judul halaman dinamis via context)
│   │   │   ├── sidebar/           # Sidebar navigasi admin
│   │   │   └── topbar/            # Topbar dengan info user
│   │   └── ui/                    # Reusable UI components
│   │       ├── button/
│   │       ├── card/
│   │       ├── detailField/
│   │       ├── dropdown/          # Dropdown component (mendukung InfiniteDropdown via sentinelRef)
│   │       ├── input/
│   │       ├── modal/
│   │       ├── skeleton/
│   │       └── table/
│   └── features/
│       ├── login/
│       │   ├── login.constant.ts  # COOKIE_EXPIRY_DAYS = 1
│       │   ├── login.types.ts     # LoginResponseData { access_token }
│       │   ├── login.schema.ts    # loginSchema (zod), LoginInput type
│       │   ├── login.hook.ts      # useLogin(): form, onSubmit, isPending, showPassword, togglePassword
│       │   └── login.tsx          # UI form login
│       ├── dashboard/
│       │   ├── dashboard.constant.ts
│       │   ├── dashboard.type.ts
│       │   ├── dashboard.schema.ts
│       │   ├── dashboard.hooks.tsx
│       │   └── dashboard.tsx
│       ├── master/
│       │   ├── attribute/         # constant/, detail/, form/, list/, store/, types/
│       │   ├── category/          # Sama
│       │   └── color/             # Sama
│       └── product/
│           ├── constant/
│           │   └── product.constant.ts    # PRODUCT_QUERY_KEYS: list(params), lists(), detail(id)
│           ├── types/
│           │   └── product.types.ts       # Product, ProductList, ProductPhoto, ProductCategory, ProductColor, ProductAttribute
│           ├── store/
│           │   └── product.mapper.ts      # mapProductToForm(), mapFormToFormData() → FormData
│           ├── list/
│           │   ├── product.list.constant.ts
│           │   ├── product.list.schema.tsx    # getProductColumns() — kolom TanStack Table
│           │   ├── product.list.hooks.tsx     # useProductList(): query, delete+confirm, search, navigasi
│           │   └── product.list.tsx           # UI tabel produk
│           ├── detail/
│           │   ├── product.detail.constant.ts
│           │   ├── product.detail.schema.tsx
│           │   ├── product.detail.hooks.tsx   # useProductDetail()
│           │   └── product.detail.tsx
│           └── form/
│               ├── product.form.constant.ts
│               ├── product.form.schema.tsx    # productSchema (zod), ProductFormInput
│               ├── product.form.hooks.tsx     # useProductForm(id?): create+update, fieldArray attributes+colors, photo replace logic
│               ├── product.form.tsx
│               └── sections/                  # Sub-komponen form (foto, atribut, dll)
├── hooks/
│   ├── useApi.ts                  # useApiQuery(), useApiMutation() — wrapper TanStack Query + Axios
│   ├── useDebounce.ts             # useDebounce(value, delay)
│   └── useInfiniteDropdown.ts     # useInfiniteDropdown() — infinite scroll dropdown via IntersectionObserver
├── lib/
│   ├── axios.ts                   # Axios instance: baseURL, withCredentials, request interceptor (inject Bearer), response interceptor (toast error)
│   ├── cookies.ts                 # setToken(), getToken(), removeToken() via js-cookie
│   ├── utils.ts                   # cn(), formatIDR(), parseIDR(), maskPriceInput(), formatIconName()
│   └── useDebounce.tsx            # (duplikat di lib, canonical ada di hooks/)
├── providers/
│   ├── QueryProvider.tsx          # QueryClientProvider — refetchOnWindowFocus: false, retry: false
│   └── ConfirmProvider.tsx        # Promise-based confirm dialog via React context (useConfirm hook)
├── types/
│   ├── api.ts                     # BaseResponse<T>, ApiError (AxiosError)
│   └── auth.types.ts              # LoginResponse, LoginResponseData
├── user/
│   ├── components/
│   │   ├── button.tsx
│   │   ├── searchBar.tsx
│   │   └── layout/
│   └── features/
│       ├── home/
│       └── login/
└── asset/
    ├── logo-black.png
    ├── logo-white.png
    └── images/
```

---

### Cara Auth Bekerja di Frontend

**Dua lapis proteksi:**

1. **Next.js Middleware** (`middleware.ts`) — server-side, matcher `/admin/:path*`
   - Skip `/admin/login`
   - Ambil cookie `token` → fetch `/auth/me` dengan `Authorization: Bearer`
   - Jika response gagal atau role bukan `admin` → hapus cookie → redirect `/admin/login`
   - Jika network error → `NextResponse.next()` (biarkan client-side handle)

2. **Admin Layout** (`app/admin/layout.tsx`) — client-side AuthGuard
   - Tiap perubahan `pathname` memanggil `api.get("/auth/me")`
   - Jika 401 → `removeToken()` + redirect login
   - Jika network error → tampilkan halaman "Koneksi Bermasalah" dengan tombol Coba Lagi
   - Saat loading → tampilkan spinner fullscreen
   - Jika sukses dan role `admin` → set state `user` → render `<PageLayout>`

**Token disimpan di cookie** dengan `js-cookie` (bukan localStorage) agar bisa dibaca Next.js middleware.

---

### Types API (`types/api.ts`)

Semua response dari backend dibungkus `BaseResponse<T>`. Ini dipakai di seluruh frontend:

```ts
// types/api.ts
export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  metadata?: {
    page: number;
    limit: number;
    nextPage: number | null;
    total?: number;
  };
  errors?: Record<string, string>; // validation errors
}

// ApiError — shape dari axios error response
export type ApiError = {
  success: false;
  message: string;
  errors?: Record<string, string>;
};
```

Contoh cara mengakses data dari response:

```ts
const { data: response } = useApiQuery<Product[]>({ ... });
// response adalah BaseResponse<Product[]>
// response.data → Product[]
// response.success → boolean
// response.metadata?.nextPage → pagination
```

---

### Pattern API Calls (useApi hooks)

Semua API call menggunakan dua global hook di `hooks/useApi.ts`:

**`useApiQuery<TData>`** — untuk GET request:

```ts
const { data, isLoading } = useApiQuery<Product[]>({
  queryKey: PRODUCT_QUERY_KEYS.list(params),
  url: PRODUCT_API_URL.list,
  params: queryParams,
});
```

- `queryKey` otomatis digabung dengan `params` agar cache unik per filter
- Return `BaseResponse<TData>` langsung dari Axios

**`useApiMutation<TData, TVariables>`** — untuk POST/PUT/PATCH/DELETE:

```ts
const { mutateAsync, isPending } = useApiMutation<Product, FormData>({
  url: PRODUCT_API_URL.create,
  method: "POST",
  options: { onSuccess: ..., onError: ... },
});
```

- Otomatis deteksi `FormData` → hapus `Content-Type` header (biarkan browser set boundary)
- URL bisa string atau fungsi `(variables) => string` untuk dynamic URL

Implementasi lengkap `hooks/useApi.ts`:

```ts
// hooks/useApi.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import api from "@/lib/axios";
import type { BaseResponse } from "@/types/api";

interface UseApiQueryProps<TData> {
  queryKey: unknown[];
  url: string;
  params?: Record<string, unknown>;
  options?: Omit<UseQueryOptions<BaseResponse<TData>>, "queryKey" | "queryFn">;
}

export function useApiQuery<TData>({
  queryKey,
  url,
  params,
  options,
}: UseApiQueryProps<TData>) {
  return useQuery<BaseResponse<TData>>({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      const res = await api.get<BaseResponse<TData>>(url, { params });
      return res.data;
    },
    ...options,
  });
}

interface UseApiMutationProps<TData, TVariables, TError = unknown> {
  url: string | ((variables: TVariables) => string);
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  options?: UseMutationOptions<BaseResponse<TData>, TError, TVariables>;
}

export function useApiMutation<TData, TVariables, TError = unknown>({
  url,
  method,
  options,
}: UseApiMutationProps<TData, TVariables, TError>) {
  return useMutation<BaseResponse<TData>, TError, TVariables>({
    mutationFn: async (variables) => {
      const resolvedUrl = typeof url === "function" ? url(variables) : url;
      const isFormData = variables instanceof FormData;
      const config = isFormData
        ? { headers: { "Content-Type": undefined } }
        : {};
      const res = await api.request<BaseResponse<TData>>({
        method,
        url: resolvedUrl,
        data: method !== "DELETE" ? variables : undefined,
        ...config,
      });
      return res.data;
    },
    ...options,
  });
}
```

---

### Pattern Form (React Hook Form + Zod)

Setiap form punya tiga file:

1. **`*.schema.ts`** — Zod schema + `z.infer<typeof schema>` type
2. **`*.hook.ts`** — `useForm({ resolver: zodResolver(schema) })` + `useMutation` + submit handler
3. **`*.tsx`** — hanya render, tidak ada logika

Contoh schema (`login.schema.ts`):

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>; // type otomatis dari schema
```

Contoh hook (`login.hook.ts`):

```ts
export const useLogin = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync, isPending } = useApiMutation<
    LoginResponseData,
    LoginInput
  >({
    url: AUTH_API_URL.login,
    method: "POST",
    options: {
      onSuccess: (response) => {
        if (response.success && response.data?.access_token) {
          setToken(response.data.access_token, COOKIE_EXPIRY_DAYS);
          router.push("/admin/dashboard");
        }
      },
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data).catch(() => {});
  });

  return {
    form,
    onSubmit,
    isPending: form.formState.isSubmitting || isPending,
  };
};
```

Contoh UI (`login.tsx`) — hanya render, tidak ada logika:

```tsx
const { form, onSubmit, isPending } = useLogin();
return (
  <form onSubmit={onSubmit}>
    <input {...form.register("email")} />
    {form.formState.errors.email && (
      <span>{form.formState.errors.email.message}</span>
    )}
    <button disabled={isPending}>Login</button>
  </form>
);
```

Contoh alur form produk:

- `productSchema` di `product.form.schema.tsx` mendefinisikan validasi
- `useProductForm(id?)` di `product.form.hooks.tsx` menggabungkan:
  - `useForm` dengan `zodResolver`
  - `useFieldArray` untuk `attributes` dan `colors` (dynamic fields)
  - `useApiQuery` untuk fetch data saat edit
  - `useApiMutation` untuk create/update
  - `mapProductToForm()` untuk isi default values dari API response
  - `mapFormToFormData()` untuk konversi form state ke `FormData` (multipart)
  - `useConfirm()` untuk konfirmasi sebelum submit

---

### Query Keys Constant Pattern

Setiap fitur punya `*.constant.ts` yang mendefinisikan query keys dengan factory pattern:

```ts
// product/constant/product.constant.ts
export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_QUERY_KEYS.all, "list"],
  list: (params?: Record<string, unknown>) => [
    ...PRODUCT_QUERY_KEYS.lists(),
    params,
  ],
  detail: (id: string) => [...PRODUCT_QUERY_KEYS.all, "detail", id],
};

// Pemakaian — invalidate semua list saat mutasi berhasil:
queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });

// Pemakaian — fetch detail spesifik:
useApiQuery({
  queryKey: PRODUCT_QUERY_KEYS.detail(id),
  url: PRODUCT_API_URL.detail(id),
});
```

---

### Mapper Pattern (`store/`)

File mapper di folder `store/` bertugas konversi antara format API dan format form, tidak ada side effect:

```ts
// product/store/product.mapper.ts

// API response → form default values
export const mapProductToForm = (product?: Product): ProductFormInput => ({
  name: product?.name || "",
  price_idr: product?.price_idr || 0,
  category_id: product?.categories?.[0]?.id || undefined,
  colors: product?.colors?.map((c) => ({ color_id: c.id })) || [],
  attributes: product?.attributes?.map((a) => ({
    attribute_id: a.attribute_id,
    attribute_value: a.attribute_value,
  })) || [{ attribute_id: undefined, attribute_value: "" }],
  photoFiles: [],
});

// Form state → FormData (multipart/form-data untuk upload)
export const mapFormToFormData = (data: ProductFormInput): FormData => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", String(data.price_idr)); // field "price" untuk create
  formData.append("price_idr", String(data.price_idr)); // field "price_idr" untuk update
  data.colors.forEach((c) => formData.append("color_ids", String(c.color_id)));
  formData.append(
    "attributes",
    JSON.stringify(data.attributes.filter((a) => a.attribute_id)),
  );
  data.photoFiles?.forEach((file) => formData.append("photos", file));
  return formData;
};
```

---

### Axios Instance (`lib/axios.ts`)

Axios dikonfigurasi dengan interceptor otomatis:

```ts
// lib/axios.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:8000/api/v1
  withCredentials: true, // kirim cookie di setiap request
});

// Request interceptor — inject token dari cookie ke header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — global error toast
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as ApiError)?.message || "Terjadi kesalahan";
    if (error.response?.status !== 401) toast.error(message);
    return Promise.reject(error);
  },
);
```

---

### Infinite Scroll Dropdown (`useInfiniteDropdown`)

Hook di `hooks/useInfiniteDropdown.ts` menggunakan:

- `useInfiniteQuery` dari TanStack Query
- `IntersectionObserver` via `sentinelRef` callback — saat elemen sentinel masuk viewport, otomatis `fetchNextPage()`
- Props: `queryKey`, `url`, `params`, `pageSize`, `search`, `mapToOption: (item) => DropdownOption`
- Return: `options`, `isLoading`, `isFetchingNextPage`, `hasNextPage`, `fetchNextPage`, `sentinelRef`
- Membaca `metadata.nextPage` dari response API untuk menentukan halaman berikutnya

---

### Providers (Root Level)

Di `app/layout.tsx`, children dibungkus:

```
QueryProvider          ← TanStack Query client
  └── ConfirmProvider  ← Promise-based dialog
        └── {children}
<Toaster />            ← sonner, posisi top-right, richColors
```

QueryProvider dikonfigurasi dengan:

```tsx
// providers/QueryProvider.tsx
const [queryClient] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
);
return (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

**ConfirmProvider** — Promise-based confirm dialog:

```tsx
// providers/ConfirmProvider.tsx
// Pemakaian di hook mana saja:
const { confirm } = useConfirm();

const confirmed = await confirm({
  title: "Delete Product",
  description: "Are you sure? This action cannot be undone.",
  variant: "danger", // "danger" | "primary"
});
if (!confirmed) return;
// lanjutkan operasi...
```

---

### Utility Functions (`lib/utils.ts`)

- `cn(...inputs)` — merge Tailwind classes via `clsx` + `tailwind-merge`
- `formatIDR(value)` — format angka ke string "Rp 150.000" menggunakan `Intl.NumberFormat`
- `parseIDR(display)` — strip non-digit characters, kembalikan number
- `maskPriceInput(rawInput)` — kombinasi parse + format untuk input harga (dipakai di form)
- `formatIconName(name)` — konversi PascalCase icon name ke kebab-case

---

### TitleContext

`admin/components/layout/pageLayout/TitleContext` — React context untuk mengatur judul halaman secara dinamis dari child page tanpa prop drilling.

---

### Pola Naming Konvensi (Frontend)

| Tipe file          | Konvensi                                         |
| ------------------ | ------------------------------------------------ |
| Schema Zod         | `feature.schema.ts`                              |
| Types/interfaces   | `feature.types.ts` atau `feature.type.ts`        |
| Custom hook        | `feature.hook.ts` atau `feature.hooks.tsx`       |
| Konstanta          | `feature.constant.ts`                            |
| URL API            | `resource.api.ts` di `admin/api/`                |
| UI komponen        | `feature.tsx` atau sub-folder dengan `index.tsx` |
| Mapper/transformer | `feature.mapper.ts` di folder `store/`           |
| Page               | `app/admin/[route]/page.tsx`                     |
