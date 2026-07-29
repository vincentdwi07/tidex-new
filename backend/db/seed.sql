-- ============================================================
-- Seed Data PostgreSQL — Tidex Titan Persada
-- ============================================================

-- Users
INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES
(2, 'Admin Tidex', 'budhitdx@gmail.com', '$2y$12$fFcKtVUeLE/jRCemXYxkCesXFoCVgUctRsf0Fuzpb2b4jCOEfRu56', '2025-01-19 05:45:34+00', '2025-01-19 05:45:34+00');
SELECT setval('users_id_seq', 3, false);

-- message_admin
INSERT INTO message_admin (id, nama, email, pesan, created_at, updated_at, "isNew") VALUES
(7, 'Vincent', 'test123@gmail.com', 'Testing', '2025-01-26 08:39:34+00', '2025-02-15 08:13:04+00', false),
(8, 'tes', 'tes', 'tes', '2025-01-26 13:15:22+00', '2025-02-15 08:12:56+00', false);
SELECT setval('message_admin_id_seq', 9, false);

-- news
INSERT INTO news (id, judul, kategori, news, "imgURL", created_at, updated_at) VALUES
(8, 'PT. Tidex Titan Persada Sukses Menyelesaikan Proyek Sistem ICT Terintegrasi di Proyek Apartment Belleview Manyar Surabaya', 'ICT', 'PT. Tidex Titan Persada kembali dipercaya dalam pengerjaan proyek sistem ICT terintegrasi di Apartment Belleview Manyar Surabaya yang telah selesai dikerjakan pada 16 Desember 2020.', '/storage/user/news/V7Y0fWXmNIVbT4gz7CP3vtsCtnAEzm8S9unWDgvJ.jpg', '2026-05-19 04:57:04+00', '2026-05-20 02:25:39+00'),
(13, 'Proyek Modernisasi Sistem ICT & Infrastruktur Jaringan di Satpas Seram Bagian Timur Maluku Resmi Diselesaikan PT. Tidex Titan Persada', 'Infrastructure', 'PT. Tidex Titan Persada kembali menyelesaikan proyek pengembangan sistem teknologi dan infrastruktur digital pada tahun 2022 di kawasan Satpas Seram Bagian Timur, Maluku.', '/storage/user/news/ab7ed9Ccx92zBA5hZzMsZrI7cjN4t8JNszVV17C1.jpg', '2026-05-21 03:09:56+00', '2026-05-21 03:09:56+00'),
(15, 'PT Tidex Titan Persada Sukses Implementasikan Smart Building ICT-IT di Polda Sumatera Selatan Palembang Tahun 2021', 'ICT', 'Pada tahun 2021, PT Tidex Titan Persada kembali menunjukkan komitmennya sebagai perusahaan system integrator terpercaya melalui penyelesaian proyek teknologi terpadu di Polda Sumatera Selatan.', '/storage/user/news/lpRNXXPuQ6FNpUwQB4uwTaxdsXlKrfYIChb8n7Ia.jpg', '2026-05-21 04:56:54+00', '2026-05-21 04:56:54+00'),
(16, 'Transformasi Digital Kampus : Integrasi Smart Building & ICT-IT di POLTEKKES KEMENKES RI Pangkal Pinang', 'ICT', 'PT Tidex Titan Persada kembali menunjukkan komitmennya sebagai perusahaan system integrator terpercaya melalui penyelesaian proyek teknologi terpadu di POLTEKKES KEMENKES Pangkal Pinang pada tahun 2023.', '/storage/user/news/vV0M8C4zZvhQnmNo23JADYosPJGUlrvJYnX72GjI.jpg', '2026-05-21 08:15:55+00', '2026-05-21 08:50:10+00'),
(17, 'PT. Indofood CBP Pasuruan Percayakan Sistem Keamanan Terintegrasi kepada PT. Tidex Titan Persada', 'ICT', 'Pada tahun 2022, PT. Tidex Titan Persada berhasil menyelesaikan proyek implementasi sistem keamanan dan infrastruktur IT di PT Indofood CBP Sukses Makmur Tbk.', '/storage/user/news/Y7f4i41ypenNr7g89reWHpy6EgPtPqPlPWVE4c4C.png', '2026-05-22 02:26:29+00', '2026-05-22 02:26:29+00');
SELECT setval('news_id_seq', 18, false);
