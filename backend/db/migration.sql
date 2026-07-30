-- ============================================================
-- Migration: Sesuaikan schema database dengan kode Go backend
-- Jalankan query ini di DBeaver / psql
-- ============================================================

-- ============================================================
-- 1. our_project
--    Tambah kolom: deskripsi, company_name, created_at, updated_at
-- ============================================================
ALTER TABLE our_project
    ADD COLUMN IF NOT EXISTS deskripsi   TEXT         NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS created_at  TIMESTAMPTZ  DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at  TIMESTAMPTZ  DEFAULT NULL;


-- ============================================================
-- 2. our_partner
--    Tambah kolom: website_url (dipakai frontend & akan ditambah ke entity)
-- ============================================================
ALTER TABLE our_partner
    ADD COLUMN IF NOT EXISTS website_url VARCHAR(255) DEFAULT NULL;


-- ============================================================
-- 3. news
--    Tabel news saat ini punya kolom lama (kategori, news).
--    Kode Go pakai: judul, slug, konten, imgURL, is_published, created_at, updated_at
--
--    Langkah:
--    a. Tambah kolom baru (slug, konten, is_published)
--    b. Isi slug dari judul yang sudah ada (jika ada data)
--    c. Pindahkan data dari kolom 'news' ke 'konten'
--    d. Drop kolom lama (kategori, news) setelah data dipindah
-- ============================================================
ALTER TABLE news
    ADD COLUMN IF NOT EXISTS slug         VARCHAR(255) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS konten       TEXT         NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN      NOT NULL DEFAULT FALSE;

-- Pindahkan data dari kolom 'news' (lama) ke 'konten' (baru)
UPDATE news SET konten = news.news WHERE konten = '' OR konten IS NULL;

-- Generate slug sederhana dari judul (huruf kecil, spasi → tanda hubung)
UPDATE news SET slug = LOWER(REGEXP_REPLACE(judul, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- Buat slug unik jika ada duplikat
UPDATE news n
SET slug = n.slug || '-' || n.id
WHERE EXISTS (
    SELECT 1 FROM news n2
    WHERE n2.slug = n.slug AND n2.id <> n.id
);

-- Jadikan slug NOT NULL setelah diisi
ALTER TABLE news
    ALTER COLUMN slug SET NOT NULL,
    ALTER COLUMN konten SET NOT NULL;

-- Tambah unique constraint pada slug
ALTER TABLE news
    ADD CONSTRAINT IF NOT EXISTS news_slug_unique UNIQUE (slug);

-- Drop kolom lama yang tidak dipakai kode Go
ALTER TABLE news
    DROP COLUMN IF EXISTS kategori,
    DROP COLUMN IF EXISTS news;


-- ============================================================
-- 4. messages (tabel baru, menggantikan message_admin)
--    Kode Go sudah hardcode tabel 'messages' bukan 'message_admin'
--    Kolom: id, name, email, phone, company, message, is_read, created_at
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
    id         BIGSERIAL    PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(50)  NOT NULL DEFAULT '',
    company    VARCHAR(255) NOT NULL DEFAULT '',
    message    TEXT         NOT NULL,
    is_read    BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- (Opsional) Migrasi data lama dari message_admin ke messages
-- Uncomment jika ada data lama yang ingin dipindah:
-- INSERT INTO messages (name, email, message, created_at)
-- SELECT nama, email, pesan, COALESCE(created_at, NOW())
-- FROM message_admin
-- ON CONFLICT DO NOTHING;
