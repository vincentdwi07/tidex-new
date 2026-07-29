-- ============================================================
-- DDL PostgreSQL — Tidex Titan Persada
-- Migrated from MySQL (MariaDB 10.11)
-- ============================================================

-- Tabel users
CREATE TABLE users (
    id                BIGSERIAL PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMPTZ  DEFAULT NULL,
    password          VARCHAR(255) NOT NULL,
    remember_token    VARCHAR(100) DEFAULT NULL,
    created_at        TIMESTAMPTZ  DEFAULT NULL,
    updated_at        TIMESTAMPTZ  DEFAULT NULL
);

-- Tabel password_reset_tokens
CREATE TABLE password_reset_tokens (
    email      VARCHAR(255) PRIMARY KEY,
    token      VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ  DEFAULT NULL
);

-- Tabel sessions
CREATE TABLE sessions (
    id            VARCHAR(255) PRIMARY KEY,
    user_id       BIGINT       DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    ip_address    VARCHAR(45)  DEFAULT NULL,
    user_agent    TEXT         DEFAULT NULL,
    payload       TEXT         NOT NULL,
    last_activity INTEGER      NOT NULL
);

CREATE INDEX sessions_user_id_index       ON sessions(user_id);
CREATE INDEX sessions_last_activity_index ON sessions(last_activity);

-- Tabel our_partner
CREATE TABLE our_partner (
    id     BIGSERIAL PRIMARY KEY,
    nama   VARCHAR(255) NOT NULL,
    "imgURL" VARCHAR(255) NOT NULL
);

-- Tabel our_product
CREATE TABLE our_product (
    id         BIGSERIAL PRIMARY KEY,
    kategori   VARCHAR(255) NOT NULL,
    nama       VARCHAR(255) NOT NULL,
    "imgURL"   VARCHAR(255) NOT NULL,
    deskripsi  TEXT         NOT NULL,
    logos      VARCHAR(255) DEFAULT NULL
);

-- Tabel pivot our_product_partner (many-to-many)
CREATE TABLE our_product_partner (
    product_id BIGINT NOT NULL REFERENCES our_product(id) ON DELETE CASCADE,
    partner_id BIGINT NOT NULL REFERENCES our_partner(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, partner_id)
);

-- Tabel our_project
CREATE TABLE our_project (
    id       BIGSERIAL PRIMARY KEY,
    nama     VARCHAR(255) NOT NULL,
    "imgURL" VARCHAR(255) NOT NULL
);

-- Tabel message_admin
CREATE TABLE message_admin (
    id         BIGSERIAL PRIMARY KEY,
    nama       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    pesan      TEXT         NOT NULL,
    "isNew"    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ  DEFAULT NULL,
    updated_at TIMESTAMPTZ  DEFAULT NULL
);

-- Tabel news
CREATE TABLE news (
    id         BIGSERIAL PRIMARY KEY,
    judul      VARCHAR(255) NOT NULL,
    kategori   VARCHAR(255) NOT NULL,
    news       TEXT         NOT NULL,
    "imgURL"   VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ  DEFAULT NULL,
    updated_at TIMESTAMPTZ  DEFAULT NULL
);

-- Tabel cache (Laravel-compatible, opsional jika masih dipakai)
CREATE TABLE cache (
    key        VARCHAR(255) PRIMARY KEY,
    value      TEXT         NOT NULL,
    expiration INTEGER      NOT NULL
);

CREATE TABLE cache_locks (
    key        VARCHAR(255) PRIMARY KEY,
    owner      VARCHAR(255) NOT NULL,
    expiration INTEGER      NOT NULL
);

-- Tabel jobs & job_batches (Laravel queue, opsional)
CREATE TABLE jobs (
    id           BIGSERIAL PRIMARY KEY,
    queue        VARCHAR(255) NOT NULL,
    payload      TEXT         NOT NULL,
    attempts     SMALLINT     NOT NULL,
    reserved_at  INTEGER      DEFAULT NULL,
    available_at INTEGER      NOT NULL,
    created_at   INTEGER      NOT NULL
);

CREATE INDEX jobs_queue_index ON jobs(queue);

CREATE TABLE job_batches (
    id             VARCHAR(255) PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    total_jobs     INTEGER      NOT NULL,
    pending_jobs   INTEGER      NOT NULL,
    failed_jobs    INTEGER      NOT NULL,
    failed_job_ids TEXT         NOT NULL,
    options        TEXT         DEFAULT NULL,
    cancelled_at   INTEGER      DEFAULT NULL,
    created_at     INTEGER      NOT NULL,
    finished_at    INTEGER      DEFAULT NULL
);

CREATE TABLE failed_jobs (
    id         BIGSERIAL PRIMARY KEY,
    uuid       VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT         NOT NULL,
    queue      TEXT         NOT NULL,
    payload    TEXT         NOT NULL,
    exception  TEXT         NOT NULL,
    failed_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
