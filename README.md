# Tidex - Titan Persada

Monorepo project dengan frontend (Next.js) dan backend (Go) yang terpisah.

## 📁 Struktur Folder

```
tidex/
├── frontend/          # Next.js Application
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-specific modules (Admin & User)
│   ├── lib/          # Utilities, API clients, contexts
│   ├── public/       # Static assets
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── .env.local
│
├── backend/          # Go REST API
│   ├── cmd/          # Entry points (main.go)
│   ├── internal/     # Internal packages
│   │   ├── auth/     # Authentication module
│   │   ├── features/ # Business features (products, partners, projects, news, messages)
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── utils/
│   │   └── router/
│   ├── db/           # Database scripts (DDL, seed)
│   ├── go.mod
│   └── .env
│
├── .gitignore
├── pnpm-workspace.yaml
├── ERD and Databases.md
├── skill.md
└── README.md
```

## 🚀 Quick Start

### Frontend (Next.js)

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend akan berjalan di `http://localhost:3000`

**Environment Variables:**

- Copy `.env.local` dan sesuaikan `NEXT_PUBLIC_API_URL`

### Backend (Go)

```bash
cd backend
go mod download
go run cmd/main.go
```

Backend API akan berjalan di `http://localhost:8000`

**Environment Variables:**

- Copy `.env` dan sesuaikan:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `PORT`

## 🔐 Admin Login

- Email: `admin@gmail.com`
- Password: `tidex1234`
- URL: `http://localhost:3000/admin/login`

## 🗄️ Database

Database menggunakan PostgreSQL. Jalankan script DDL dan seed:

```bash
cd backend
psql "postgres://user:pass@localhost:5432/tidex" -f db/ddl.sql
psql "postgres://user:pass@localhost:5432/tidex" -f db/seed.sql
```

Lihat `ERD and Databases.md` untuk detail schema.

## 📦 Tech Stack

**Frontend:**

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP

**Backend:**

- Go 1.23+
- PostgreSQL
- JWT Authentication
- Clean Architecture

## 📝 Notes

- Frontend dan backend sekarang terpisah untuk memudahkan development dan deployment
- API base URL: `http://localhost:8000/api/v1`
- File uploads disimpan di `backend/uploads/`
