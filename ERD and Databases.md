# Skill Backend — Tidex Laravel

## Tech Stack Backend

- **Framework**: Laravel 11 (PHP)
- **Database**: MySQL / relational database via Laravel Eloquent ORM
- **Auth**: Laravel Breeze (session-based authentication)
- **Queue**: Laravel Jobs (jobs, job_batches, failed_jobs tables)
- **Cache**: Laravel Cache (cache, cache_locks tables)

---

## ERD (Entity Relationship Diagram)

```
┌─────────────┐          ┌──────────────────────┐          ┌──────────────┐
│  our_partner │          │  our_product_partner  │          │  our_product │
│─────────────│          │──────────────────────│          │──────────────│
│ id (PK)     │◄────────►│ partner_id (FK)       │◄────────►│ id (PK)      │
│ nama        │  many     │ product_id (FK)       │  many    │ kategori     │
│ imgURL      │  to       └──────────────────────┘  to      │ nama         │
└─────────────┘  many                               many    │ imgURL       │
                                                            │ deskripsi    │
                                                            │ logos        │
                                                            └──────────────┘

┌──────────────┐
│  our_project │
│──────────────│
│ id (PK)      │   (standalone, tidak berelasi)
│ nama         │
│ imgURL       │
└──────────────┘

┌───────────────┐
│ message_admin │
│───────────────│
│ id (PK)       │   (standalone, tidak berelasi)
│ nama          │
│ email         │
│ pesan         │
│ isNew         │
│ created_at    │
│ updated_at    │
└───────────────┘

┌──────────────┐
│    news      │
│──────────────│
│ id (PK)      │   (standalone, tidak berelasi)
│ judul        │
│ kategori     │
│ news         │
│ imgURL       │
│ created_at   │
│ updated_at   │
└──────────────┘

┌──────────────┐
│    users     │
│──────────────│
│ id (PK)      │
│ name         │
│ email        │
│ password     │
│ remember_token│
│ email_verified_at│
│ created_at   │
│ updated_at   │
└──────────────┘
```

> **Catatan relasi**: Relasi `OurProduct` ↔ `OurPartner` didefinisikan di level model (`belongsToMany`) menggunakan pivot table `our_product_partner`, namun **migration untuk pivot table ini tidak ada** di codebase. Table pivot tersebut perlu dibuat manual atau migrasinya belum di-commit.

---

## Struktur Database

### 1. `users`

Tabel untuk akun admin yang bisa login ke dashboard.

| Kolom               | Tipe Data       | Keterangan                       |
| ------------------- | --------------- | -------------------------------- |
| `id`                | BIGINT UNSIGNED | Primary Key, auto increment      |
| `name`              | VARCHAR(255)    | Nama pengguna                    |
| `email`             | VARCHAR(255)    | Email, unik                      |
| `email_verified_at` | TIMESTAMP       | Waktu verifikasi email, nullable |
| `password`          | VARCHAR(255)    | Password di-hash (bcrypt)        |
| `remember_token`    | VARCHAR(100)    | Token "remember me", nullable    |
| `created_at`        | TIMESTAMP       | Waktu dibuat, nullable           |
| `updated_at`        | TIMESTAMP       | Waktu diupdate, nullable         |

- **Relasi**: Tidak berelasi dengan tabel lain secara langsung.
- **Cast di Model**: `email_verified_at` → `datetime`, `password` → `hashed`.
- **Hidden di serialisasi**: `password`, `remember_token`.

---

### 2. `password_reset_tokens`

Tabel untuk menyimpan token reset password.

| Kolom        | Tipe Data    | Keterangan             |
| ------------ | ------------ | ---------------------- |
| `email`      | VARCHAR(255) | Primary Key            |
| `token`      | VARCHAR(255) | Token reset            |
| `created_at` | TIMESTAMP    | Waktu dibuat, nullable |

---

### 3. `sessions`

Tabel untuk menyimpan session user (database session driver).

| Kolom           | Tipe Data       | Keterangan                                 |
| --------------- | --------------- | ------------------------------------------ |
| `id`            | VARCHAR(255)    | Primary Key                                |
| `user_id`       | BIGINT UNSIGNED | Foreign key ke `users.id`, nullable, index |
| `ip_address`    | VARCHAR(45)     | IP address user, nullable                  |
| `user_agent`    | TEXT            | User agent browser, nullable               |
| `payload`       | LONGTEXT        | Data session (serialized)                  |
| `last_activity` | INT             | Unix timestamp aktivitas terakhir, index   |

---

### 4. `our_partner`

Tabel untuk menyimpan data mitra/partner perusahaan.

| Kolom    | Tipe Data       | Keterangan                  |
| -------- | --------------- | --------------------------- |
| `id`     | BIGINT UNSIGNED | Primary Key, auto increment |
| `nama`   | VARCHAR(255)    | Nama partner                |
| `imgURL` | VARCHAR(255)    | URL/path logo partner       |

- **Timestamps**: Tidak ada (`public $timestamps = false`).
- **Relasi**: `belongsToMany` ke `OurProduct` via pivot `our_product_partner`.

---

### 5. `our_product`

Tabel untuk menyimpan data produk/layanan perusahaan.

| Kolom       | Tipe Data       | Keterangan                     |
| ----------- | --------------- | ------------------------------ |
| `id`        | BIGINT UNSIGNED | Primary Key, auto increment    |
| `kategori`  | VARCHAR(255)    | Kategori produk                |
| `nama`      | VARCHAR(255)    | Nama produk                    |
| `imgURL`    | VARCHAR(255)    | URL/path gambar produk         |
| `deskripsi` | TEXT            | Deskripsi panjang produk       |
| `logos`     | VARCHAR(255)    | URL/path logo produk, nullable |

- **Timestamps**: Tidak ada (`public $timestamps = false`).
- **Relasi**: `belongsToMany` ke `OurPartner` via pivot `our_product_partner`.
- **Catatan migrasi**: Tabel ini dibuat ulang dua kali — versi pertama (`2025_01_20_095625`) di-drop lalu dibuat ulang (`2025_01_20_124628`) dengan tambahan kolom `logos`. Skema final adalah versi terakhir.

---

### 6. `our_project`

Tabel untuk menyimpan data portofolio proyek perusahaan.

| Kolom    | Tipe Data       | Keterangan                  |
| -------- | --------------- | --------------------------- |
| `id`     | BIGINT UNSIGNED | Primary Key, auto increment |
| `nama`   | VARCHAR(255)    | Nama proyek                 |
| `imgURL` | VARCHAR(255)    | URL/path gambar proyek      |

- **Timestamps**: Tidak ada (`public $timestamps = false`).
- **Relasi**: Standalone, tidak berelasi dengan tabel lain.

---

### 7. `message_admin`

Tabel untuk menyimpan pesan yang dikirim pengunjung ke admin (contact form).

| Kolom        | Tipe Data       | Keterangan                                   |
| ------------ | --------------- | -------------------------------------------- |
| `id`         | BIGINT UNSIGNED | Primary Key, auto increment                  |
| `nama`       | VARCHAR(255)    | Nama pengirim                                |
| `email`      | VARCHAR(255)    | Email pengirim                               |
| `pesan`      | TEXT            | Isi pesan                                    |
| `isNew`      | TINYINT(1)      | Flag pesan baru/belum dibaca, default `true` |
| `created_at` | TIMESTAMP       | Waktu dikirim, nullable                      |
| `updated_at` | TIMESTAMP       | Waktu diupdate, nullable                     |

- **Timestamps**: Aktif (`public $timestamps = true`).
- **Kolom `isNew`** ditambahkan via migrasi terpisah (`add_is_new_to_message_admin_table`).
- **Relasi**: Standalone, tidak berelasi dengan tabel lain.

---

### 8. `news`

Tabel untuk menyimpan artikel berita perusahaan.

| Kolom        | Tipe Data       | Keterangan                  |
| ------------ | --------------- | --------------------------- |
| `id`         | BIGINT UNSIGNED | Primary Key, auto increment |
| `judul`      | VARCHAR(255)    | Judul berita                |
| `kategori`   | VARCHAR(255)    | Kategori berita             |
| `news`       | VARCHAR(255)    | Konten/isi berita           |
| `imgURL`     | VARCHAR(255)    | URL/path gambar berita      |
| `created_at` | TIMESTAMP       | Waktu dibuat, nullable      |
| `updated_at` | TIMESTAMP       | Waktu diupdate, nullable    |

- **Timestamps**: Aktif (`public $timestamps = true`).
- **Relasi**: Standalone, tidak berelasi dengan tabel lain.
- **Catatan**: Kolom `news` bertipe `VARCHAR(255)` — cocok untuk konten singkat atau path file, tapi kurang ideal untuk artikel panjang. Seharusnya `TEXT` atau `LONGTEXT` kalau konten bisa panjang.

---

### 9. `cache`

Tabel cache Laravel (driver database).

| Kolom        | Tipe Data    | Keterangan             |
| ------------ | ------------ | ---------------------- |
| `key`        | VARCHAR(255) | Primary Key            |
| `value`      | MEDIUMTEXT   | Data cache             |
| `expiration` | INT          | Unix timestamp expired |

---

### 10. `cache_locks`

Tabel untuk atomic locks pada cache.

| Kolom        | Tipe Data    | Keterangan             |
| ------------ | ------------ | ---------------------- |
| `key`        | VARCHAR(255) | Primary Key            |
| `owner`      | VARCHAR(255) | Pemilik lock           |
| `expiration` | INT          | Unix timestamp expired |

---

### 11. `jobs`

Tabel queue jobs Laravel.

| Kolom          | Tipe Data        | Keterangan                     |
| -------------- | ---------------- | ------------------------------ |
| `id`           | BIGINT UNSIGNED  | Primary Key, auto increment    |
| `queue`        | VARCHAR(255)     | Nama queue, index              |
| `payload`      | LONGTEXT         | Data job (serialized)          |
| `attempts`     | TINYINT UNSIGNED | Jumlah percobaan               |
| `reserved_at`  | INT UNSIGNED     | Waktu diambil worker, nullable |
| `available_at` | INT UNSIGNED     | Waktu tersedia untuk diproses  |
| `created_at`   | INT UNSIGNED     | Waktu dibuat (Unix timestamp)  |

---

### 12. `job_batches`

Tabel untuk batch jobs Laravel.

| Kolom            | Tipe Data    | Keterangan                 |
| ---------------- | ------------ | -------------------------- |
| `id`             | VARCHAR(255) | Primary Key                |
| `name`           | VARCHAR(255) | Nama batch                 |
| `total_jobs`     | INT          | Total jobs dalam batch     |
| `pending_jobs`   | INT          | Jobs yang belum selesai    |
| `failed_jobs`    | INT          | Jobs yang gagal            |
| `failed_job_ids` | LONGTEXT     | ID jobs yang gagal         |
| `options`        | MEDIUMTEXT   | Opsi tambahan, nullable    |
| `cancelled_at`   | INT          | Waktu dibatalkan, nullable |
| `created_at`     | INT          | Waktu dibuat               |
| `finished_at`    | INT          | Waktu selesai, nullable    |

---

### 13. `failed_jobs`

Tabel untuk mencatat jobs yang gagal diproses.

| Kolom        | Tipe Data       | Keterangan                   |
| ------------ | --------------- | ---------------------------- |
| `id`         | BIGINT UNSIGNED | Primary Key, auto increment  |
| `uuid`       | VARCHAR(255)    | UUID unik job                |
| `connection` | TEXT            | Nama koneksi queue           |
| `queue`      | TEXT            | Nama queue                   |
| `payload`    | LONGTEXT        | Data job (serialized)        |
| `exception`  | LONGTEXT        | Pesan error/exception        |
| `failed_at`  | TIMESTAMP       | Waktu gagal, default current |

---

## Ringkasan Relasi Antar Tabel

| Relasi                      | Tipe         | Pivot Table           | Keterangan                                                  |
| --------------------------- | ------------ | --------------------- | ----------------------------------------------------------- |
| `OurProduct` ↔ `OurPartner` | Many-to-Many | `our_product_partner` | Didefinisikan di model, migrasi belum ada                   |
| `sessions` → `users`        | Belongs To   | -                     | Via `user_id` (nullable, tidak ada FK constraint eksplisit) |

Tabel-tabel lain (`our_project`, `message_admin`, `news`) berdiri sendiri dan tidak memiliki relasi ke tabel lain.

---

## Catatan Penting

1. **Pivot table `our_product_partner`** — relasi many-to-many antara produk dan partner sudah didefinisikan di model (`OurProduct::partners()` dan `OurPartner::products()`), tapi file migration-nya tidak ditemukan. Perlu dipastikan apakah table ini ada di database secara manual atau ada migration yang hilang.

2. **Kolom `news` di tabel `news`** bertipe `VARCHAR(255)` — jika isi berita panjang, tipe ini akan menjadi bottleneck dan perlu diubah ke `TEXT` atau `LONGTEXT`.

3. **Tidak ada soft delete** di semua tabel (tidak ada kolom `deleted_at`). Penghapusan data bersifat permanent.

4. **Foreign key constraint** — kolom `user_id` di tabel `sessions` tidak memiliki FK constraint eksplisit meski menggunakan `foreignId()`, artinya tidak ada cascade delete di level database.
