-- ============================================================
-- Seed Data: Migrasi dari MySQL (Laravel) ke PostgreSQL (Go)
-- Path gambar sudah dikonversi: user/xxx/file → /uploads/xxx/file
-- Jalankan: psql -U <user> -d <database> -f backend/db/seed.sql
-- ============================================================

-- Hapus data lama sebelum seed
DELETE FROM our_product_partner;
DELETE FROM our_product;
DELETE FROM our_partner;
DELETE FROM our_project;
DELETE FROM news;

-- Reset sequences
ALTER SEQUENCE IF EXISTS our_product_partner_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS our_product_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS our_partner_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS our_project_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS news_id_seq RESTART WITH 1;

-- ============================================================
-- 1. our_partner (54 rows)
-- Path: user/partner/xxx → /uploads/partners/xxx
-- ============================================================
INSERT INTO our_partner (id, nama, "imgURL") VALUES
(16, 'watchguard', '/uploads/partners/LWLsdOz9MrwTniacVYVcGFGEEewmzAVZTqmS437i.svg'),
(17, 'vimar', '/uploads/partners/uizubejncFj26V4dCTRbZRkhTEYZlYJDQxG8A9sQ.svg'),
(19, 'ruijie', '/uploads/partners/H7iwVcuC49PhWKFajApOVTmuWFKYi93ueGniUh29.svg'),
(20, 'ruckus', '/uploads/partners/TTRme9XEsgolqdQRX3Y0RJDx2g9QCGXJmuzma64v.svg'),
(21, 'siemon', '/uploads/partners/uXfAiJtpkQnqjEZnc5FCEBvavAyP6sh7EzbpKiPp.svg'),
(24, 'lg-display', '/uploads/partners/eC4LdHeUo7AIEBkO4FQWuWxif0Q5f6WXj5PWfb1o.svg'),
(25, 'lenovo', '/uploads/partners/frRAlIdA9KtX5beaHtCJ7rjVWvIcePUrWDAIwxSF.svg'),
(26, 'innoque', '/uploads/partners/d57ZLR3bdPmzBf2Xphh1bp0czIIhirhCKrE0oxtx.svg'),
(27, 'nutanix', '/uploads/partners/q3GDHKkN7wPOM40LX6Blbq4ImoJ98dY4xhCpT27f.svg'),
(28, 'juniper', '/uploads/partners/AdELRplcWIldsYZxQ4PeapVQzOgYPJ0T89GWXTb5.svg'),
(29, 'ikusi', '/uploads/partners/Lt8Kg6xiH3wQcI74JF5BKL1xippLuEOYmgPLhUZn.svg'),
(30, 'huawei', '/uploads/partners/eFobzXqZCjtcKj9tpStl9qXsGfKJu5Pj2VpyiM7T.svg'),
(31, 'hikvision', '/uploads/partners/zZG1plwNWtJC103JuCVpDGcHTQyrMxAv9gTwCp2Y.svg'),
(32, 'honeywell', '/uploads/partners/3RmwLh1HKU5NtQTuwRAO27UpifT9hx5ADDuvut4l.svg'),
(33, 'HID', '/uploads/partners/BSK5cwyFY14pwS06Cl2mRkibzZ4DJvE8dk89WKjf.svg'),
(34, 'hewlett', '/uploads/partners/zhKq4oOWMW8Fy10MaakpvOpT8fEHxlVzQaEOVoUm.svg'),
(35, 'h3c', '/uploads/partners/unVjMljpt8ZksF7pMK349mDgUKVExCr8T1XHOGZB.svg'),
(36, 'fortinet', '/uploads/partners/tuOcS7nyZiJOuagH97biqNzqBHHbS1DAAfKWsWis.svg'),
(37, 'entrypass', '/uploads/partners/orzEkihWlvD9HxUQL4xsLdnwl1myuswvtth5g9xK.svg'),
(38, 'dobot', '/uploads/partners/b9nzXgmTIUeND30weWMt5tsHTZudmCgoGc4wa0E8.svg'),
(39, 'dell', '/uploads/partners/jnWvcBKfLdtRxVbwWChhV8fM8FmFLxlIf99vHda1.svg'),
(41, 'dasan', '/uploads/partners/oiLG9SMNK0QIwdYhq4U3ZxpWTMifOdpp0udoQ0e4.svg'),
(42, 'cailiang', '/uploads/partners/NNZ3cyz6bJVKQj4jcDmJdHxRV8aeRfk0ZcFIZ3sk.svg'),
(43, 'cisco', '/uploads/partners/k62hK5m8j1I4HD8bYPr9hNIj2Y9SMqERiTi1lvDo.svg'),
(44, 'aruba', '/uploads/partners/KeE8Ud5d9w4liG4x8VBTXkLxuNr2Byq2cZuhEPsj.svg'),
(45, 'alhua', '/uploads/partners/M8Wup1HKCcL1LWIU7Gx9wCci6Qg675MRjn2KBCHE.svg'),
(46, 'zkt eco', '/uploads/partners/1Cr1KWjqYnvkIVPX70pRL0S7HobAZlekR1Yx6v9d.svg'),
(47, 'zte', '/uploads/partners/a9MOTbH5yHzRsuI6LbflavXjuKGCRYdtCZg10IdT.svg'),
(48, 'yeastar', '/uploads/partners/iFTJplQJJbPjF8xBa8EjfjgaP70XZhw9RZg5wZ4h.svg'),
(49, 'alcatel', '/uploads/partners/nP3A9h2ArZS9p4wiFHQuNQtmEUEVPfcEvKoYhLnm.svg'),
(58, 'tp link', '/uploads/partners/RgqpWbWORPfvHplCtAZ8B0K64nwaiYKrSUhgPBa0.png'),
(61, 'APC', '/uploads/partners/32bD017wRfu63YpfOTQauGFsOTm4tPKnLAB3P3Xx.png'),
(62, 'ICA', '/uploads/partners/iTGLekNqbsl0rMM3sNqVkI0fNnxMUVP5ihsLKC44.png'),
(63, 'indorack', '/uploads/partners/KmsC3VWDYf8VdpgA7lFvOTxdNCjvgNXZFLfaObCF.png'),
(64, 'xfusion', '/uploads/partners/Vj0vhmWcN4OZcPidVxHW7zcylDQtnjyT66pwFbau.png'),
(65, 'hoseki', '/uploads/partners/vsC2X3dAOtDqPLpjQs3LiBRMTveg2E2GP69Jdu0f.png'),
(66, 'AWP', '/uploads/partners/Ydla2tUWhXt6gaEnRtIyFS9Xhb34XtirwkdxiR7f.png'),
(75, 'fortigate', '/uploads/partners/Nj1VuCVlrjSnfpG1Go6o98K6s9w3LUKEN8Z2sG68.png'),
(76, 'netapp', '/uploads/partners/xdjUZv1iipIStafiMd2BSxMmDj7iOpYuuAjcIksz.png'),
(77, 'dji', '/uploads/partners/eM6spModxkxPClrjWgdei9XU3xrn0esdTIO2ZbZP.png'),
(79, 'dawn', '/uploads/partners/iXuflVtnhcFrDi8cL8CElEiDrtq46t7q7omt9LtL.jpg'),
(81, 'sangfor', '/uploads/partners/AsnrDuPDB9c4OWrVJ56VINLLblnsCn3OsZb8yR7W.jpg'),
(82, 'detnov', '/uploads/partners/pDyWC2gLxXTsPoLpc0aFkWYRCBNLPc7U1anUExPR.jpg'),
(83, 'nuveq', '/uploads/partners/8Xy88HkiDffQsHZKm1P29DpSZPPyu27haHYbgIFy.jpg'),
(84, 'universal robot', '/uploads/partners/BQpEp1SP0dhFLOyD1mWBNbL0QCl01rsTbig0Kzuw.jpg'),
(85, 'Johnson controls', '/uploads/partners/mYuGXIXrJiMF2S3vNmHdnH8hoKtKL4g5o6utJ3gm.jpg'),
(86, 'Elsa', '/uploads/partners/65v0lfjqqBQIySugGyCvaTgLJlkwucsIigwY8Nbv.jpg'),
(87, 'nx optic', '/uploads/partners/fKX9I3ymlLiQb88a2bSi75q4LwQfWjpEHpO8eMH6.jpg'),
(88, 'axxon', '/uploads/partners/0Wk6tDxGIfBOWllLrD59LDiXeq2LEZdsbaneSaZl.jpg'),
(89, 'DSPPA', '/uploads/partners/VsBJTGNRnkGDaJVIst87KPxYQWxs5RPXvGyZaFsm.png'),
(90, 'TOA', '/uploads/partners/bVPRvzoIKCg5JioeGbaJAP4r1QLHfhBeqYNP5GYF.jpg'),
(91, 'AIPHONE', '/uploads/partners/jhmq9TrAuVyda4qu9hJwaeRnlWwnivoIiQK9WHvx.jpg');

-- Reset sequence agar ID berikutnya tidak conflict
SELECT setval('our_partner_id_seq', (SELECT MAX(id) FROM our_partner));

-- ============================================================
-- 2. our_product
-- Path: user/product/xxx → /uploads/products/xxx
-- ============================================================
-- Kategori harus sesuai KATEGORI_MAP di frontend:
-- "Infrastructure" → tab infra
-- "Information Technology (IT)" → tab it
-- "Information Communication Technology (ICT)" → tab ict
-- "Internet of Things (IoT)" → tab iot
--
-- logos: comma-separated partner ID (angka), sesuai cara frontend parse (parseInt)
-- ID partner dari tabel our_partner:
--   16=watchguard, 17=vimar, 19=ruijie, 20=ruckus, 21=siemon, 24=lg-display
--   25=lenovo, 26=innoque, 27=nutanix, 28=juniper, 29=ikusi, 30=huawei
--   31=hikvision, 32=honeywell, 33=HID, 34=hewlett, 35=h3c, 36=fortinet
--   37=entrypass, 38=dobot, 39=dell, 41=dasan, 42=cailiang, 43=cisco
--   44=aruba, 45=alhua, 46=zkt eco, 47=zte, 48=yeastar, 49=alcatel
--   58=tp link, 61=APC, 63=indorack, 64=xfusion, 66=AWP, 76=netapp
--   77=dji, 79=dawn, 81=sangfor, 82=detnov, 84=universal robot
--   85=Johnson controls, 87=nx optic, 88=axxon, 89=DSPPA, 90=TOA, 91=AIPHONE
INSERT INTO our_product (id, kategori, nama, "imgURL", deskripsi, logos) VALUES
-- Infrastructure
(1,  'Infrastructure', 'Structured Cabling',        '/uploads/products/cabling.jpg',         'Solusi structured cabling profesional untuk kebutuhan jaringan data center dan enterprise.',        '21'),
(2,  'Infrastructure', 'Active Networking',          '/uploads/products/active-networking.jpg','Perangkat jaringan aktif termasuk switch, router, dan wireless access point.',                    '43,19,20,28,30,35,44,58,41'),
(3,  'Infrastructure', 'CCTV & Video Surveillance',  '/uploads/products/cctv.jpg',            'Sistem pengawasan video HD untuk keamanan gedung, area publik, dan fasilitas industri.',           '31,45,88'),
(4,  'Infrastructure', 'Access Control',             '/uploads/products/access-control.jpg',  'Sistem kontrol akses pintu, gate, dan area terbatas dengan teknologi terkini.',                    '33,37,46,32,85'),
(5,  'Infrastructure', 'Fire Alarm & Detection',     '/uploads/products/fire-alarm.jpg',      'Sistem deteksi dan alarm kebakaran yang handal untuk gedung komersial dan industri.',              '82,32'),
(8,  'Infrastructure', 'Network Security',           '/uploads/products/network-security.jpg','Solusi keamanan jaringan enterprise termasuk firewall, VPN, dan threat protection.',              '36,16,81,30'),
-- Information Technology (IT)
(6,  'Information Technology (IT)', 'Server & Storage',   '/uploads/products/server.jpg',         'Solusi server dan storage enterprise untuk data center dan cloud computing.',          '39,34,27,25,64,76'),
(7,  'Information Technology (IT)', 'Virtualization',     '/uploads/products/virtualization.jpg', 'Platform virtualisasi untuk efisiensi infrastruktur IT dan pengelolaan sumber daya.', '27'),
(14, 'Information Technology (IT)', 'Rack & Enclosure',   '/uploads/products/rack.jpg',           'Rak server dan enclosure berkualitas tinggi untuk data center dan ruang telekomunikasi.','63,61'),
(17, 'Information Technology (IT)', 'Display & Signage',  '/uploads/products/signage.jpg',        'Solusi display interaktif dan digital signage untuk informasi publik dan presentasi.',  '24,26'),
(18, 'Information Technology (IT)', 'Optical Fiber',      '/uploads/products/fiber.jpg',          'Solusi kabel fiber optik dan perangkat koneksi untuk jaringan berkecepatan tinggi.',   '87,42'),
-- Information Communication Technology (ICT)
(9,  'Information Communication Technology (ICT)', 'Audio Visual',      '/uploads/products/av.jpg',   'Sistem audio visual profesional untuk ruang rapat, auditorium, dan area publik.',         '24,29,89,90'),
(11, 'Information Communication Technology (ICT)', 'Power & UPS',       '/uploads/products/ups.jpg',  'Solusi catu daya tidak terputus (UPS) dan power management untuk kelangsungan operasi.','61'),
(12, 'Information Communication Technology (ICT)', 'IP PBX & VoIP',     '/uploads/products/voip.jpg', 'Sistem komunikasi suara berbasis IP untuk enterprise dan call center.',                  '48,49'),
(13, 'Information Communication Technology (ICT)', 'ISP & Telco',       '/uploads/products/isp.jpg',  'Perangkat dan solusi untuk penyedia layanan internet dan telekomunikasi.',               '47,30,41'),
(16, 'Information Communication Technology (ICT)', 'Intercom & Video Door','/uploads/products/intercom.jpg','Sistem interkom dan video door phone untuk keamanan akses gedung dan residensial.','91,17'),
-- Internet of Things (IoT)
(10, 'Internet of Things (IoT)', 'Robotics & Automation', '/uploads/products/robotics.jpg', 'Solusi robotika dan otomasi industri untuk meningkatkan efisiensi proses manufaktur.',  '38,84'),
(15, 'Internet of Things (IoT)', 'Drone & UAV',           '/uploads/products/drone.jpg',    'Solusi drone dan UAV untuk pemetaan, inspeksi, dan keamanan area luas.',               '77'),
(19, 'Internet of Things (IoT)', 'Wireless Broadband',    '/uploads/products/wireless.jpg', 'Solusi broadband nirkabel untuk konektivitas area luas dan last-mile internet.',        '79,66');

-- Reset sequence
SELECT setval('our_product_id_seq', (SELECT MAX(id) FROM our_product));

-- ============================================================
-- 3. our_product_partner (relasi berdasarkan kolom logos lama)
-- ============================================================
INSERT INTO our_product_partner (product_id, partner_id)
SELECT mapping.product_id, pt.id
FROM (VALUES
  (1,  'siemon'),
  (2,  'cisco'),
  (2,  'ruijie'),
  (2,  'ruckus'),
  (2,  'juniper'),
  (2,  'huawei'),
  (2,  'h3c'),
  (2,  'aruba'),
  (2,  'tp link'),
  (2,  'dasan'),
  (3,  'hikvision'),
  (3,  'alhua'),
  (3,  'axxon'),
  (4,  'HID'),
  (4,  'entrypass'),
  (4,  'zkt eco'),
  (4,  'honeywell'),
  (4,  'Johnson controls'),
  (5,  'detnov'),
  (5,  'honeywell'),
  (6,  'dell'),
  (6,  'hewlett'),
  (6,  'nutanix'),
  (6,  'lenovo'),
  (6,  'xfusion'),
  (6,  'netapp'),
  (7,  'nutanix'),
  (8,  'fortinet'),
  (8,  'watchguard'),
  (8,  'sangfor'),
  (8,  'huawei'),
  (9,  'lg-display'),
  (9,  'ikusi'),
  (9,  'DSPPA'),
  (9,  'TOA'),
  (10, 'dobot'),
  (10, 'universal robot'),
  (11, 'APC'),
  (12, 'yeastar'),
  (12, 'alcatel'),
  (13, 'zte'),
  (13, 'huawei'),
  (13, 'dasan'),
  (14, 'indorack'),
  (14, 'APC'),
  (15, 'dji'),
  (16, 'AIPHONE'),
  (16, 'vimar'),
  (17, 'lg-display'),
  (17, 'innoque'),
  (18, 'nx optic'),
  (18, 'cailiang'),
  (19, 'dawn'),
  (19, 'AWP')
) AS mapping(product_id, partner_nama)
JOIN our_partner pt ON pt.nama = mapping.partner_nama
ON CONFLICT DO NOTHING;

-- ============================================================
-- 4. our_project
-- Path: user/project/xxx → /uploads/projects/xxx
-- ============================================================
INSERT INTO our_project (id, nama, "imgURL") VALUES
(1,  'Jaringan Data Center Bank Mandiri',     '/uploads/projects/mandiri.jpg'),
(2,  'CCTV & Access Control Bandara Soetta',  '/uploads/projects/soetta.jpg'),
(3,  'Structured Cabling Gedung BRI',         '/uploads/projects/bri.jpg'),
(4,  'WiFi Campus Universitas Indonesia',     '/uploads/projects/ui.jpg'),
(5,  'Server & Storage Telkom Indonesia',     '/uploads/projects/telkom.jpg'),
(6,  'Video Surveillance Pelabuhan Tanjung Priok', '/uploads/projects/priok.jpg'),
(7,  'IP PBX Kantor Pusat PLN',              '/uploads/projects/pln.jpg'),
(8,  'Fire Alarm Gedung Perkantoran Sudirman', '/uploads/projects/sudirman.jpg');

SELECT setval('our_project_id_seq', (SELECT MAX(id) FROM our_project));

-- ============================================================
-- 5. news
-- Path: user/news/xxx atau /storage/user/news/xxx → /uploads/news/xxx
-- Kolom sesuai entity Go: judul, kategori, news, imgURL, created_at
-- ============================================================
INSERT INTO news (id, judul, kategori, news, "imgURL", created_at) VALUES
(1, 'Peluncuran Solusi AI-Powered Network Management', 'Teknologi',
 'Tidex meluncurkan solusi terbaru berbasis kecerdasan buatan untuk manajemen jaringan enterprise. Solusi ini memungkinkan pemantauan real-time dan prediksi anomali jaringan secara otomatis, meningkatkan uptime dan efisiensi operasional hingga 40%.',
 '/uploads/news/news1.jpg', '2024-03-15 09:00:00+07'),
(2, 'Partnership Strategis dengan Cisco Indonesia', 'Kemitraan',
 'Tidex Titan Persada resmi memperkuat kemitraan dengan Cisco Indonesia sebagai Gold Partner. Kemitraan ini membuka akses ke teknologi dan dukungan teknis terdepan untuk solusi networking, security, dan collaboration bagi klien enterprise di Indonesia.',
 '/uploads/news/news2.jpg', '2024-02-20 10:00:00+07'),
(3, 'Sukses Implementasi Data Center Tier III di Surabaya', 'Proyek',
 'Tidex berhasil menyelesaikan implementasi data center Tier III untuk perusahaan manufaktur terkemuka di Surabaya. Proyek ini mencakup infrastruktur jaringan, server virtualisasi, sistem storage, dan solusi backup yang komprehensif.',
 '/uploads/news/news3.jpg', '2024-01-10 08:00:00+07'),
(4, 'Workshop Cybersecurity untuk Perbankan 2024', 'Event',
 'Tidex menyelenggarakan workshop cybersecurity khusus untuk sektor perbankan, dihadiri lebih dari 100 profesional IT. Acara ini membahas ancaman terkini, best practice keamanan, dan demonstrasi solusi firewall dan endpoint protection generasi terbaru.',
 '/uploads/news/news4.jpg', '2023-12-05 09:00:00+07'),
(5, 'Tidex Raih Penghargaan Best ICT Distributor 2023', 'Penghargaan',
 'Tidex Titan Persada meraih penghargaan Best ICT Distributor 2023 dari asosiasi industri teknologi Indonesia. Penghargaan ini mencerminkan komitmen Tidex dalam menyediakan solusi ICT berkualitas tinggi dan layanan purna jual yang unggul kepada klien di seluruh Indonesia.',
 '/uploads/news/news5.jpg', '2023-11-01 09:00:00+07');

SELECT setval('news_id_seq', (SELECT MAX(id) FROM news));
