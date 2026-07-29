-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 29, 2026 at 11:00 AM
-- Server version: 10.11.18-MariaDB-cll-lve
-- PHP Version: 8.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tidf9216_tidex_titan_persada`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message_admin`
--

CREATE TABLE `message_admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pesan` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isNew` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message_admin`
--

INSERT INTO `message_admin` (`id`, `nama`, `email`, `pesan`, `created_at`, `updated_at`, `isNew`) VALUES
(7, 'Vincent', 'test123@gmail.com', 'Testing', '2025-01-26 08:39:34', '2025-02-15 08:13:04', 0),
(8, 'tes', 'tes', 'tes', '2025-01-26 13:15:22', '2025-02-15 08:12:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '0001_01_01_000000_create_users_table', 1),
(6, '0001_01_01_000001_create_cache_table', 1),
(7, '0001_01_01_000002_create_jobs_table', 1),
(8, '2025_01_19_123122_create_our_partner_table', 1),
(11, '2025_01_20_095304_remove_timestamps_from_our_product_table', 2),
(12, '2025_01_20_094446_create_our_product_table', 3),
(14, '2025_01_20_095625_create_our_product_table_without_timestamps', 4),
(15, '2025_01_20_095625_create_our_product_table', 5),
(16, '2025_01_20_124223_add_logos_to_our_product_table', 5),
(17, '2025_01_20_124524_drop_our_product_table', 5),
(18, '2025_01_20_124628_create_our_product_table', 5),
(20, '2025_01_25_080535_create_our_project_table', 6),
(29, '2025_01_25_112326_create_message_admin_table', 7),
(30, '2025_01_25_223033_add_is_new_to_message_admin_table', 8),
(31, '2025_01_26_125644_create_news_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `news` longtext NOT NULL,
  `imgURL` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `judul`, `kategori`, `news`, `imgURL`, `created_at`, `updated_at`) VALUES
(8, 'PT. Tidex Titan Persada Sukses Menyelesaikan Proyek Sistem ICT Terintegrasi di Proyek Apartment Belleview Manyar Surabaya', 'ICT', 'PT. Tidex Titan Persada kembali dipercaya dalam pengerjaan proyek sistem ICT terintegrasi di Apartment Belleview Manyar Surabaya yang telah selesai dikerjakan pada 16 Desember 2020.\r\n\r\nSebagai perusahaan System Integrator di bidang ICT, IT, dan IoT, PT. Tidex Titan Persada menghadirkan berbagai solusi teknologi untuk mendukung keamanan, komunikasi, dan konektivitas gedung modern.\r\n\r\nRuang lingkup pekerjaan yang berhasil diselesaikan meliputi:\r\n\r\nIP CCTV System\r\nServer System\r\nData Network Infrastructure\r\nAccess Point Installation\r\nHotel Lock System\r\nAir Blown Fiber\r\nGPON System\r\nIP TV System\r\nPABX System\r\nAudio Intercom System\r\n\r\nMelalui proyek ini, PT. Tidex Titan Persada menunjukkan komitmennya dalam menghadirkan solusi ICT dan infrastruktur jaringan yang handal, efisien, dan terintegrasi untuk mendukung kebutuhan smart building modern.\r\n\r\nDengan pengalaman lebih dari 20 tahun, PT. Tidex Titan Persada terus dipercaya menangani berbagai proyek teknologi di sektor swasta, BUMN, maupun pemerintahan.', '/storage/user/news/V7Y0fWXmNIVbT4gz7CP3vtsCtnAEzm8S9unWDgvJ.jpg', '2026-05-19 04:57:04', '2026-05-20 02:25:39'),
(13, 'Proyek Modernisasi Sistem ICT & Infrastruktur Jaringan di Satpas Seram Bagian Timur Maluku Resmi Diselesaikan PT. Tidex Titan Persada', 'Infrastructure', 'PT. Tidex Titan Persada kembali menyelesaikan proyek pengembangan sistem teknologi dan infrastruktur digital pada tahun 2022 di kawasan Satpas Seram Bagian Timur, Maluku. Proyek ini menjadi bagian dari komitmen perusahaan dalam menghadirkan solusi ICT-IT terintegrasi untuk mendukung pelayanan publik yang lebih modern, aman, dan efisien.\r\nDalam proyek ini, PT. Tidex Titan Persada mengerjakan berbagai kebutuhan teknologi terintegrasi mulai dari pembangunan infrastruktur jaringan hingga implementasi sistem digital pelayanan.\r\nBeberapa pekerjaan utama yang berhasil diselesaikan pada proyek ini meliputi:\r\n•	Infrastruktur jaringan Structured Cable System \r\n•	Implementasi ICT – IT Full System \r\n•	Instalasi Display Interactive System \r\n•	Sistem Antrian Digital \r\n•	Access Control Terpadu \r\nPenerapan sistem dilakukan secara terintegrasi untuk mendukung operasional pelayanan yang lebih stabil, efektif, dan mudah dikelola.\r\nMelalui implementasi Structured Cable System, seluruh jaringan komunikasi data pada area operasional dirancang agar lebih rapi, stabil, dan siap mendukung kebutuhan teknologi jangka panjang. Selain itu, sistem ICT-IT yang diterapkan juga membantu meningkatkan efisiensi pengelolaan perangkat dan konektivitas antar sistem.\r\nPT. Tidex Titan Persada juga menghadirkan Display Interactive untuk mendukung penyampaian informasi yang lebih modern dan komunikatif kepada pengunjung maupun pengguna layanan.\r\nPada sisi pelayanan, penerapan Sistem Antrian Digital membantu menciptakan proses pelayanan yang lebih tertata dan nyaman. Sedangkan Access Control Terpadu digunakan untuk meningkatkan keamanan serta pengelolaan akses area tertentu secara lebih terkontrol.\r\nKomitmen PT. Tidex Titan Persada dalam Solusi ICT-IT Indonesia\r\nSebagai perusahaan yang bergerak di bidang ICT, IT System Integrator, dan solusi teknologi terintegrasi sejak tahun 1997, PT. Tidex Titan Persada terus berkomitmen menghadirkan solusi teknologi yang sesuai dengan kebutuhan berbagai sektor, baik pemerintahan, BUMN, maupun swasta.\r\nKeberhasilan proyek Satpas Seram Bagian Timur Maluku menjadi salah satu bentuk kontribusi perusahaan dalam mendukung transformasi digital dan modernisasi infrastruktur teknologi di Indonesia.', '/storage/user/news/ab7ed9Ccx92zBA5hZzMsZrI7cjN4t8JNszVV17C1.jpg', '2026-05-21 03:09:56', '2026-05-21 03:09:56'),
(15, 'PT Tidex Titan Persada Sukses Implementasikan Smart Building ICT-IT di Polda Sumatera Selatan Palembang Tahun 2021', 'ICT', 'Pada tahun 2021, PT Tidex Titan Persada kembali menunjukkan komitmennya sebagai perusahaan system integrator terpercaya melalui penyelesaian proyek teknologi terpadu di Polda Sumatera Selatan. Proyek ini menjadi bagian dari pengembangan infrastruktur digital dan sistem keamanan modern berbasis ICT-IT Smart Building untuk mendukung operasional institusi yang lebih efektif, aman, dan terintegrasi.\r\n\r\nDalam proyek tersebut, Tidex mengerjakan berbagai solusi teknologi terintegrasi yang meliputi pembangunan Data Network, instalasi Access Point untuk konektivitas jaringan yang stabil, implementasi IP CCTV sebagai sistem pengawasan modern, pengadaan dan konfigurasi Server, Access Control Biometrik, hingga sistem komunikasi IP PABX yang mendukung komunikasi internal lebih efisien.\r\n\r\nSebagai perusahaan yang telah berpengalaman lebih dari 20 tahun di bidang ICT-IT dan system integration, PT Tidex Titan Persada menghadirkan solusi Smart Building yang tidak hanya fokus pada teknologi, tetapi juga pada integrasi sistem yang mampu meningkatkan keamanan, konektivitas, serta efisiensi operasional dalam satu ekosistem digital terpadu.\r\n\r\nMelalui proyek di Polda Sumatera Selatan ini, Tidex kembali membuktikan kemampuannya dalam menghadirkan solusi teknologi modern untuk sektor pemerintahan dan institusi strategis di Indonesia. Implementasi sistem ICT-IT Smart Building ini diharapkan dapat mendukung transformasi digital serta meningkatkan kualitas layanan dan keamanan operasional di lingkungan kepolisian.', '/storage/user/news/lpRNXXPuQ6FNpUwQB4uwTaxdsXlKrfYIChb8n7Ia.jpg', '2026-05-21 04:56:54', '2026-05-21 04:56:54'),
(16, 'Transformasi Digital Kampus : Integrasi Smart Building & ICT-IT di POLTEKKES KEMENKES RI Pangkal Pinang', 'ICT', 'PT Tidex Titan Persada kembali menunjukkan komitmennya sebagai perusahaan system integrator terpercaya melalui penyelesaian proyek teknologi terpadu di POLTEKKES KEMENKES Pangkal Pinang pada tahun 2023. Proyek ini menjadi bagian dari pengembangan infrastruktur digital modern pada pembangunan dua gedung baru, yaitu Gedung Laboratorium Terpadu dan Gedung Layanan Pendidikan.\r\n\r\nDalam proyek tersebut, Tidex menghadirkan solusi ICT-IT terintegrasi yang mencakup Structured Cabling System (SCS), IT-ICT Full System, Access Control, Interactive Display, Videotron, hingga Sistem Audio modern untuk mendukung aktivitas pendidikan dan operasional kampus yang lebih efisien, modern, dan terhubung secara digital.\r\n\r\nSalah satu keunggulan utama dalam proyek ini adalah integrasi sistem antar dua gedung yang saling terkoneksi dengan server utama yang dipusatkan di Gedung Layanan Pendidikan. Konsep integrasi ini memungkinkan pengelolaan jaringan, sistem keamanan, komunikasi, dan distribusi informasi berjalan lebih efektif dalam satu ekosistem Smart Campus yang modern dan terpusat.\r\n\r\nImplementasi Structured Cabling System yang dikerjakan oleh Tidex juga menjadi fondasi utama dalam menciptakan infrastruktur jaringan yang stabil, scalable, dan siap mendukung kebutuhan teknologi jangka panjang di lingkungan pendidikan kesehatan. Selain itu, penggunaan Interactive Display dan Videotron turut mendukung penyampaian informasi dan proses pembelajaran yang lebih interaktif serta inovatif.\r\n\r\nSebagai institusi pendidikan kesehatan di bawah Kementerian Kesehatan Republik Indonesia, POLTEKKES KEMENKES Pangkal Pinang terus melakukan pengembangan fasilitas pendidikan dan laboratorium modern guna mendukung kualitas pendidikan tenaga kesehatan di Indonesia.\r\n\r\nMelalui proyek ini, PT Tidex Titan Persada kembali membuktikan kemampuannya dalam menghadirkan solusi Smart Building dan ICT-IT Integration untuk sektor pendidikan, pemerintahan, dan industri di Indonesia.', '/storage/user/news/vV0M8C4zZvhQnmNo23JADYosPJGUlrvJYnX72GjI.jpg', '2026-05-21 08:15:55', '2026-05-21 08:50:10'),
(17, 'PT. Indofood CBP Pasuruan Percayakan Sistem Keamanan Terintegrasi kepada PT. Tidex Titan Persada', 'ICT', 'Pada tahun 2022, PT. Tidex Titan Persada berhasil menyelesaikan proyek implementasi sistem keamanan dan infrastruktur IT di PT Indofood CBP Sukses Makmur Tbk. Proyek ini menjadi bagian dari komitmen perusahaan dalam menghadirkan solusi teknologi terintegrasi untuk mendukung operasional industri modern yang aman, efisien, dan andal.\r\n\r\nDalam proyek tersebut, PT. Tidex Titan Persada mengerjakan beberapa scope pekerjaan utama, meliputi:\r\n\r\nFire Alarm System\r\nCCTV System\r\nAccess Control System\r\nStructured Cabling System (SCS)\r\n\r\nImplementasi Fire Alarm System dilakukan untuk meningkatkan sistem proteksi dan deteksi dini terhadap potensi kebakaran di area operasional. Selain itu, pemasangan CCTV System dan Access Control System membantu meningkatkan pengawasan keamanan serta pengaturan akses masuk pada area tertentu agar lebih terkontrol dan terintegrasi.\r\n\r\nTidak hanya itu, pembangunan Structured Cabling System (SCS) juga menjadi fondasi penting dalam mendukung kebutuhan jaringan komunikasi dan infrastruktur IT yang stabil serta siap mendukung perkembangan teknologi perusahaan.\r\n\r\nDengan pengalaman di bidang ICT, IT Infrastructure, dan System Integrator, PT. Tidex Titan Persada terus dipercaya dalam menangani berbagai proyek teknologi di sektor industri, manufaktur, pemerintahan, BUMN, maupun perusahaan swasta nasional.\r\n\r\nKeberhasilan proyek di PT. Indofood CBP Sukses Makmur Tbk Pasuruan ini menjadi salah satu bukti komitmen PT. Tidex Titan Persada dalam memberikan kualitas pekerjaan terbaik, layanan profesional, dan solusi teknologi yang sesuai dengan kebutuhan pelanggan.', '/storage/user/news/Y7f4i41ypenNr7g89reWHpy6EgPtPqPlPWVE4c4C.png', '2026-05-22 02:26:29', '2026-05-22 02:26:29');

-- --------------------------------------------------------

--
-- Table structure for table `our_partner`
--

CREATE TABLE `our_partner` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `imgURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `our_partner`
--

INSERT INTO `our_partner` (`id`, `nama`, `imgURL`) VALUES
(16, 'watchguard', 'user/partner/LWLsdOz9MrwTniacVYVcGFGEEewmzAVZTqmS437i.svg'),
(17, 'vimar', 'user/partner/uizubejncFj26V4dCTRbZRkhTEYZlYJDQxG8A9sQ.svg'),
(19, 'ruijie', 'user/partner/H7iwVcuC49PhWKFajApOVTmuWFKYi93ueGniUh29.svg'),
(20, 'ruckus', 'user/partner/TTRme9XEsgolqdQRX3Y0RJDx2g9QCGXJmuzma64v.svg'),
(21, 'siemon', 'user/partner/uXfAiJtpkQnqjEZnc5FCEBvavAyP6sh7EzbpKiPp.svg'),
(24, 'lg-display', 'user/partner/eC4LdHeUo7AIEBkO4FQWuWxif0Q5f6WXj5PWfb1o.svg'),
(25, 'lenovo', 'user/partner/frRAlIdA9KtX5beaHtCJ7rjVWvIcePUrWDAIwxSF.svg'),
(26, 'innoque', 'user/partner/d57ZLR3bdPmzBf2Xphh1bp0czIIhirhCKrE0oxtx.svg'),
(27, 'nutanix', 'user/partner/q3GDHKkN7wPOM40LX6Blbq4ImoJ98dY4xhCpT27f.svg'),
(28, 'juniper', 'user/partner/AdELRplcWIldsYZxQ4PeapVQzOgYPJ0T89GWXTb5.svg'),
(29, 'ikusi', 'user/partner/Lt8Kg6xiH3wQcI74JF5BKL1xippLuEOYmgPLhUZn.svg'),
(30, 'huawei', 'user/partner/eFobzXqZCjtcKj9tpStl9qXsGfKJu5Pj2VpyiM7T.svg'),
(31, 'hikvision', 'user/partner/zZG1plwNWtJC103JuCVpDGcHTQyrMxAv9gTwCp2Y.svg'),
(32, 'honeywell', 'user/partner/3RmwLh1HKU5NtQTuwRAO27UpifT9hx5ADDuvut4l.svg'),
(33, 'HID', 'user/partner/BSK5cwyFY14pwS06Cl2mRkibzZ4DJvE8dk89WKjf.svg'),
(34, 'hewlett', 'user/partner/zhKq4oOWMW8Fy10MaakpvOpT8fEHxlVzQaEOVoUm.svg'),
(35, 'h3c', 'user/partner/unVjMljpt8ZksF7pMK349mDgUKVExCr8T1XHOGZB.svg'),
(36, 'fortinet', 'user/partner/tuOcS7nyZiJOuagH97biqNzqBHHbS1DAAfKWsWis.svg'),
(37, 'entrypass', 'user/partner/orzEkihWlvD9HxUQL4xsLdnwl1myuswvtth5g9xK.svg'),
(38, 'dobot', 'user/partner/b9nzXgmTIUeND30weWMt5tsHTZudmCgoGc4wa0E8.svg'),
(39, 'dell', 'user/partner/jnWvcBKfLdtRxVbwWChhV8fM8FmFLxlIf99vHda1.svg'),
(41, 'dasan', 'user/partner/oiLG9SMNK0QIwdYhq4U3ZxpWTMifOdpp0udoQ0e4.svg'),
(42, 'cailiang', 'user/partner/NNZ3cyz6bJVKQj4jcDmJdHxRV8aeRfk0ZcFIZ3sk.svg'),
(43, 'cisco', 'user/partner/k62hK5m8j1I4HD8bYPr9hNIj2Y9SMqERiTi1lvDo.svg'),
(44, 'aruba', 'user/partner/KeE8Ud5d9w4liG4x8VBTXkLxuNr2Byq2cZuhEPsj.svg'),
(45, 'alhua', 'user/partner/M8Wup1HKCcL1LWIU7Gx9wCci6Qg675MRjn2KBCHE.svg'),
(46, 'zkt eco', 'user/partner/1Cr1KWjqYnvkIVPX70pRL0S7HobAZlekR1Yx6v9d.svg'),
(47, 'zte', 'user/partner/a9MOTbH5yHzRsuI6LbflavXjuKGCRYdtCZg10IdT.svg'),
(48, 'yeastar', 'user/partner/iFTJplQJJbPjF8xBa8EjfjgaP70XZhw9RZg5wZ4h.svg'),
(49, 'alcatel', 'user/partner/nP3A9h2ArZS9p4wiFHQuNQtmEUEVPfcEvKoYhLnm.svg'),
(58, 'tp link', 'user/partner/RgqpWbWORPfvHplCtAZ8B0K64nwaiYKrSUhgPBa0.png'),
(61, 'APC', 'user/partner/32bD017wRfu63YpfOTQauGFsOTm4tPKnLAB3P3Xx.png'),
(62, 'ICA', 'user/partner/iTGLekNqbsl0rMM3sNqVkI0fNnxMUVP5ihsLKC44.png'),
(63, 'indorack', 'user/partner/KmsC3VWDYf8VdpgA7lFvOTxdNCjvgNXZFLfaObCF.png'),
(64, 'xfusion', 'user/partner/Vj0vhmWcN4OZcPidVxHW7zcylDQtnjyT66pwFbau.png'),
(65, 'hoseki', 'user/partner/vsC2X3dAOtDqPLpjQs3LiBRMTveg2E2GP69Jdu0f.png'),
(66, 'AWP', 'user/partner/Ydla2tUWhXt6gaEnRtIyFS9Xhb34XtirwkdxiR7f.png'),
(75, 'fortigate', 'user/partner/Nj1VuCVlrjSnfpG1Go6o98K6s9w3LUKEN8Z2sG68.png'),
(76, 'netapp', 'user/partner/xdjUZv1iipIStafiMd2BSxMmDj7iOpYuuAjcIksz.png'),
(77, 'dji', 'user/partner/eM6spModxkxPClrjWgdei9XU3xrn0esdTIO2ZbZP.png'),
(79, 'dawn', 'user/partner/iXuflVtnhcFrDi8cL8CElEiDrtq46t7q7omt9LtL.jpg'),
(81, 'sangfor', 'user/partner/AsnrDuPDB9c4OWrVJ56VINLLblnsCn3OsZb8yR7W.jpg'),
(82, 'detnov', 'user/partner/pDyWC2gLxXTsPoLpc0aFkWYRCBNLPc7U1anUExPR.jpg'),
(83, 'nuveq', 'user/partner/8Xy88HkiDffQsHZKm1P29DpSZPPyu27haHYbgIFy.jpg'),
(84, 'universal robot', 'user/partner/BQpEp1SP0dhFLOyD1mWBNbL0QCl01rsTbig0Kzuw.jpg'),
(85, 'Johnson controls', 'user/partner/mYuGXIXrJiMF2S3vNmHdnH8hoKtKL4g5o6utJ3gm.jpg'),
(86, 'Elsa', 'user/partner/65v0lfjqqBQIySugGyCvaTgLJlkwucsIigwY8Nbv.jpg'),
(87, 'nx optic', 'user/partner/fKX9I3ymlLiQb88a2bSi75q4LwQfWjpEHpO8eMH6.jpg'),
(88, 'axxon', 'user/partner/0Wk6tDxGIfBOWllLrD59LDiXeq2LEZdsbaneSaZl.jpg'),
(89, 'DSPPA', 'user/partner/VsBJTGNRnkGDaJVIst87KPxYQWxs5RPXvGyZaFsm.png'),
(90, 'TOA', 'user/partner/bVPRvzoIKCg5JioeGbaJAP4r1QLHfhBeqYNP5GYF.jpg'),
(91, 'AIPHONE', 'user/partner/jhmq9TrAuVyda4qu9hJwaeRnlWwnivoIiQK9WHvx.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `our_product`
--

CREATE TABLE `our_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `imgURL` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `logos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `our_product`
--

INSERT INTO `our_product` (`id`, `kategori`, `nama`, `imgURL`, `deskripsi`, `logos`) VALUES
(1, 'Infrastructure', 'Structured Cable Systems', 'user/product/OUBsvFZtfRQFKBTVZSLgbMu246k8Yza8574LRBy0.png', 'We offer a structured cable system that includes vertical and horizontal cabling up to the backbone. Our solution supports voice, data, and video through a single wiring system, adhering to international standards for multi-vendor environments. This approach ensures long-term cost savings and includes a 25-year warranty for added peace of mind.', 'siemon'),
(2, 'Infrastructure', 'Gigabit Passive Optical Network (GPON)', 'user/product/iNgudQdxHvOLOZTxKWykCRQpfa4NhHt8XHuAfsjN.png', 'Fiber-to-the-Home (FTTH) networks are highly demanded due to their ability to support higher speeds and long-distance data transmission. GPON solutions enhance these networks by reducing active equipment, supporting triple-play services (voice, data, and IP video), and enabling point-to-multipoint connections with higher downstream speeds.', 'zte, dasan'),
(3, 'IT', 'Network Switch', 'user/product/mVjqonrw3Ff1dhYuwWrymRwKj09MxIF9wgVyvzo6.png', 'The increasing bandwidth demands in network usage drive the development of advanced network devices, including Multi-Gig technology on switches to support devices like Access Point Gen.6 and IoT devices. Many Multi-Gig Switch units have been implemented alongside WiFi Gen.6 and other IT devices to meet these growing needs.', 'cisco, aruba, alcatel, h3c, ruijie, hikvision'),
(4, 'IT', 'Access Point', 'user/product/K4EFt9rFMP7e9ZkjiVYaRJh1L8bPYqcz899WLY6t.png', 'The increasing bandwidth demands in network usage drive the development of advanced network devices, including Multi-Gig technology on switches to support devices like Access Point Gen.6 and IoT devices. Many Multi-Gig Switch units have been implemented alongside WiFi Gen.6 and other IT devices to meet these growing needs.', 'cisco, aruba, alcatel, h3c, ruijie, ruckus, tp link'),
(5, 'IT', 'Server and Storage', 'user/product/LzKK4jwMYP9EVttexptJL7PINzXZYTpS5eWwC0fn.jpg', 'The integration of servers and storage into a distributed infrastructure platform with intelligent software provides flexible building blocks, replacing traditional infrastructure that relied on separate servers, storage networks, and storage arrays.', 'hewlett, dell, lenovo, h3c, xfusion, netapp'),
(6, 'IT', 'Hyper Converged Infrastructure (HCI)', 'user/product/VM4TdXNrKJcz3NuJUOOKhPNKtFShufzN9wbIAiDf.png', 'The development of server systems must anticipate future needs with hyper-converged systems that integrate servers, storage, and virtualization. Storage systems should support scalable designs with compression to save capacity, while prioritizing automated redundancy for reliability.', 'nutanix, h3c, hewlett'),
(9, 'ICT', 'IP Telephone / IP-PBX', 'user/product/GSLUMUlh8faZItL0nd6CuqmWbJfSbre9lj19UofS.png', 'IP PBX phone systems use the internet to place and receive calls by converting analog voice signals into digital ones, routing them through a VoIP service provider. Key benefits include lower communication costs, cloud-based reliability, the ability to retain existing hardware with minimal setup, and easy scalability to add voice channels as needed.', 'alcatel, yeastar'),
(10, 'ICT', 'MATV IP-TV', 'user/product/4by49Av73RWjdSPHscv4jArefaidGN6THZSJPMS8.png', 'Master Antenna Television (MATV) provides TV services to multiple outlets using a single antenna system, while Internet Protocol Television (IPTV) delivers TV services over packet-switched networks like LAN or the internet, replacing traditional terrestrial, satellite, and cable formats.', 'ikusi'),
(11, 'ICT', 'Audio-Video Phone', 'user/product/Qh7xTW280KxZZvEOh9i06SAAjgEKXjuoRuKrxghm.jpg', 'Intercom is a Customer Communications Platform that enables personalized communication with users through targeted content, behavior-driven messages, and conversational support. Additionally, we have implemented Audio-Video Phones in many apartments to enhance communication and coordination for residents.', 'hikvision, vimar'),
(12, 'ICT', 'Display Technology Information System', 'user/product/4nQBSJQqn89GhdLe4Hjv6vF4pIVn26puR93o23Iy.png', 'Display Technology Information System is an electronic system that presents information via screens or displays. It is primarily used to share updates, announcements, directions, or other relevant details with a targeted audience in a public space, such as a transportation hub, retail store, or corporate building, and functions as a digital signage platform to convey key information in real-time. We have implemented Display Technology Information System in hospital, church, mosque, vihara, university and many more', 'hikvision, cailiang, lg-display, nx optic, axxon'),
(13, 'ICT', 'Queuing Systems – FIFO', 'user/product/dlwBzWsFizJ6DVfTRA6rSMyYehuGmgBk7Yrrfguf.png', 'Our queue system efficiently manages patient registrations, calls, and pharmacy drug queues, offering easy, informative, and measurable processes. We can also design a FIFO system integrated with Access Control, ensuring users follow procedures, promoting discipline, and maintaining system security.', 'innoque'),
(14, 'IoT', 'Robot', 'user/product/zR2VLBj0lEU4Xm3Gf6QdJCjZX7vfabgcWDrDgzyC.png', 'Industrial robotic arms are automated machines used in manufacturing to perform tasks like assembly, welding, and packaging. They improve efficiency by automating repetitive tasks, ensuring precision, and reducing human error. With the ability to be programmed for various applications, these robots enhance productivity and safety in production lines.', 'dobot, universal robot'),
(15, 'IoT', 'Building Automation System (BAS)', 'user/product/zieKUMY986yLVgzmRVGgqebjZZYdvY4PH0psE1Tz.png', 'Building Automation Systems (BAS) integrate control systems for HVAC, lighting, smart home comfort, machines, and sensors. In the manufacturing industry, BAS is increasingly used in automation solutions, working alongside PLC systems and can also be developed with IoT systems for enhanced functionality.', 'honeywell, Johnson controls'),
(16, 'IoT', 'Drone', 'user/product/V6xJyRGctHow5lb3JCKFZZ2xthGNtg3wYWhxSOzL.png', 'A drone is an unmanned aerial vehicle used for various purposes, including mapping, surveillance, and capturing images and videos. Equipped with advanced technology, drones allow for precise and efficient remote control, and can be integrated with various systems to enhance productivity and real-time data collection.', 'dji, Elsa'),
(18, 'Infrastructure', 'Uninterruptible Power Supply (UPS)', 'user/product/oBBgMM1zU3lYPfkugq1ekjpUD3VlL4X1WpEXJ4cb.jpg', 'UPS is a device that supplies emergency power to a load when the primary power supply fails. It is often used to safeguard computers, data centers, telecommunications equipment, and other electrical devices against power outages that could result in data loss, equipment damage, or downtime.', 'APC, AWP'),
(19, 'ICT', 'Integrated Security System', 'user/product/yZG4uEKCAUvjEHNryMFEXaljGpMj6cy7pNbwu70A.jpg', 'The important thing that becomes an important issue when implementing a security system is to integrate so that the system can run more automatically, and easily but provides higher security. We have combined CCTV, Access Control, and Fire Alarm systems so that the system can run optimally.', 'hikvision, honeywell, alhua, zkt eco, detnov, nuveq'),
(20, 'Infrastructure', 'Racking Server Network', 'user/product/Ks5MEMwsbtA8ZRhaO8YAAXs3l9VPMbuZKntT5sAf.jpg', 'Server racks are used to organized active devices such as Network Switch, Server Storage, NVR, etc. is neatly arranged. Server racks surely making active device maintenance easier. The components is typically installed in racks include patch panels, wire management, and cantilevers. We provide server rack installation services along with their accessories to ensure all devices are well-organized.', 'indorack, siemon'),
(21, 'ICT', 'Network Security', 'user/product/fi91QEAobU3b5gYXJ9EPbsNRe81p81D2o1WUCvHR.png', 'Network security is highly dynamic, evolving continuously to meet technological demands. It addresses both external threats attempting to access the internal network and internal practices within the local network, covering areas such as internet connections, email, viruses, and hacking.', 'fortigate, juniper, sangfor'),
(22, 'Infrastructure', 'Raised Floor', 'user/product/Cw460HKZDNB7W8GdrPrZPL1lTJexH5nazQRlYJlS.jpg', 'Enhance your IT infrastructure with our professional raised floor solutions, designed for optimal cable management, efficient cooling, and maximum flexibility. Our raised floor systems provide a secure, organized, and scalable foundation to support the demanding needs of modern data centers and server rooms.', 'dawn'),
(24, 'ICT', 'IP Public Announcement', 'user/product/o1h6MLuYMhRgHEIDIm1e1GVrtVsbPq88vABXWwHN.png', 'Ensure seamless, high-quality communication across your organization with our IP Announcement System solutions. Designed for modern businesses, hospitals, schools, factories, university, and public facilities, our system delivers real-time, clear, and efficient audio messaging over an IP network.', 'TOA, DSPPA'),
(25, 'ICT', 'Nurse Call System', 'user/product/fkgBSWXzoYmW2aCVh6WE25fvhxKzScIYNXpSAL37.jpg', 'Enhance patient care and hospital efficiency with our advanced Nurse Call System solutions. Designed for seamless communication between patients and healthcare staff, our system ensures faster response times, improved workflow, and greater patient safety.', 'AIPHONE');

-- --------------------------------------------------------

--
-- Table structure for table `our_project`
--

CREATE TABLE `our_project` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `imgURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `our_project`
--

INSERT INTO `our_project` (`id`, `nama`, `imgURL`) VALUES
(1, 'Siloam Hospital', 'user/project/bE4EwPTxaCwRSMdDTrTzrXJxTcvcfpA1TltmvgKK.svg'),
(2, 'RS Premier Surabaya', 'user/project/YMSsRmRhjEUcg21evBxw2mgGng0LybkrQhTuaPmd.svg'),
(3, 'Benson', 'user/project/pjWKD5m2LQRXe4mEIG6S8r5XFZZrL8iqLbc2T7Ha.svg'),
(4, 'OJ Hotel', 'user/project/YfpO5UTbSkVSqnkerGeez4fZ4CA848mzdSJ88Gvr.svg'),
(5, 'Indofood', 'user/project/Df33g4xeAqwMBu3gSwMdSLwBrJLPLWfybwekFsGa.svg'),
(6, 'AGC Group', 'user/project/NbU9C5AlRQCZXZ3PVhgf0pOn0PXGjb8xWmmh7xt9.svg'),
(7, 'PT Indolakto', 'user/project/1TAtidlCAT6NpkXPQgnQ4RbvKjzgCBZpgnZ3J4lc.svg'),
(8, 'Softex', 'user/project/1VvwSZynGLKuzvOOIuETejuvMjsvCP0FxREnFDDP.svg'),
(9, 'PT. Aneka Coffe Industry', 'user/project/snzGn9Hnu5KcgcbHSvMCk5rzAWjnTjsjoEuSMyYP.svg'),
(10, 'Sari Roti', 'user/project/FE6XjJWBB0BKfrU6hk5K8U5XF7Ez8eQrXYMC8bPu.svg'),
(11, 'SPS Corporate', 'user/project/P4YGb9KHfeE401X8fGliq8ZfTdsGpjm0ubQTqNIQ.svg'),
(13, 'PT Suparma TBK', 'user/project/jlkUlUqcrF7jIPNIXDYdFrbypj7JpolQ7m8SZvf5.svg'),
(14, 'Yakult', 'user/project/OnaNaBk9nafnXFNtE1pbciaDjZrnvC5ZT3JjThC5.svg'),
(15, 'Otsuka', 'user/project/CwyrkFf2f8LmijPk56mYTPIgaxtmRjft8njKOv1o.svg'),
(16, 'Jangkar Pasuruan', 'user/project/f8jsKeAgHzUKmBhjLioRSFhG5MHI3TldEucjM5iw.svg'),
(17, 'Panasonic', 'user/project/frTzylQg1vnSsqykkPqIiOxyDS67wf1j2JT0u0Ln.svg'),
(18, 'RSU Haji Surabaya', 'user/project/MlSfbssOvUfN04GTiT48NvoLuPxBku0PpNw1DBBL.svg'),
(19, 'Yello Hotels', 'user/project/B4EIFtqObmFF4xJn4xD5tLk1qDZ46epS9IjE6rUS.svg'),
(20, 'Ibis Styles', 'user/project/Gfajb6yxW3nsdVzd12B3jRzT9259QBHcFEtHdLjy.svg'),
(21, 'Meiji', 'user/project/XwfZ0cxrpFRTct3egE3YRdfmfIztD4mnUrfIoKnR.svg'),
(23, 'PT Petrokimia Gresik', 'user/project/A8sNgtFjdgUOldqgRdhz15bmczBVTQa7LjSkDLUv.svg'),
(24, 'Polres Sumatra Selatan', 'user/project/23B9TI0FerOeoSOrWjVKC0QjlfqP4mHJFSDZA6pb.svg'),
(25, 'Kemenkes Pangkalpinang', 'user/project/H5uhokKzeIUs2JILHOr93FlthqmmMQJoi9DHlrlg.svg'),
(26, 'Satpas Seram', 'user/project/7ZBME3ZKG5E9GZDPPK1FhdDPTuRdnUovWAVWMCIw.svg'),
(27, 'Pusat Laboratorium Forensik', 'user/project/5txRFgKyIJADQztvXmpPkfFZQe1789PFeK85m2QM.svg'),
(28, 'RSU Siti Aisyah', 'user/project/u1n7BR54MX9gdKV9GpOgSj7M9j2OBrf4EX4GuytE.svg'),
(29, 'RS Orthopedi & Traumatology', 'user/project/n4dNyXWmGX0pKNyjWO152lFNoutA7GVJnn8wUhTG.svg'),
(30, 'Pelindo 3', 'user/project/0FRZYZJEWh9Zgc1zZiMR2bTB52ztRph6DYCtOwz3.svg'),
(31, 'TPS', 'user/project/6lD1GT8gC9CiGmGCYJs4HrnG4eLqLUGNkAg6hEFu.svg'),
(32, 'PT Terminal Teluk Lamong', 'user/project/awrHO9feDBgWorvH0IVngMOtU0EijahzX9uGV3Ta.svg'),
(33, 'PT Pelindo Marine', 'user/project/DXXAL3SLdzzCOuPK89ezxA7csNdPi5gZwKZaE4YN.svg'),
(34, 'APBS', 'user/project/PCCemplSD1PWJcoicMr4yP5FKuJhhAXbE8WUvaA3.svg'),
(35, 'Pelindo Properti Indonesia', 'user/project/N4ulnzahl7GHXH3HBo25kJc4UOCM5WeUPG1Klcpn.svg'),
(36, 'Juanda Surabaya', 'user/project/XGFYOSgTc1GvMFrB7xT2TiVZA2BWirRmgamX6lWZ.svg'),
(37, 'Jiipe', 'user/project/JhodLwEbxXm03Kt6kekSEv2tBpkvYf4EUgweyGYL.svg'),
(58, 'RS Muhammadiyah Babat Lamongan', 'user/project/lUu4JrcU8j2wcNkl1JEOTAk4jrfdbQt1A107ZOVQ.svg'),
(62, 'Belleview Manyar Surabaya', 'user/project/MGT0cOkLCwQuu6f005upeoa5P0bjrWVh0PDxAIws.svg'),
(63, 'Hotel Santika Gunung Kidul', 'user/project/cZVsmqEwj5UrYKze86cBUtZjI0UYYWFB0fGh4yfC.svg'),
(65, 'topgolf jakarta', 'user/project/OJy4GTTLscAYmXzUpZ3Pl52tKDxRK4LzaAK8sB73.svg'),
(67, 'RS Aisyiyah Bojonegoro', 'user/project/DbZJusHRwFIXpUXoySISvBgAtSEVQq1T42wNHl22.svg'),
(68, 'DLKH SIDOARJO', 'user/project/P8o2ShnwGmXRKHoIrYgRgE7di5OaL1J7Pt7MTjXo.svg'),
(69, 'Gereja House of Glory', 'user/project/dpqtuwxXqnYZ3RBNDBBk65UMhjDYKFCyNJuvO5V9.svg'),
(72, 'PT. PAL INDONESIA', 'user/project/0sIzqwvOvWIIM6aONfXfoKKK38jUKDeAuZMz5Q1i.svg'),
(73, 'PT. Jasuindo tiga perkasa', 'user/project/ephMa9n9aHUmxKxV6iz12fPC4ayrIf4lxSYyoU2p.svg'),
(75, 'Yayasan St. Yosef', 'user/project/t0IZTwbRL4klDPdKiFpjsaCj7yhAAMag6BEzbrxI.svg'),
(76, 'Grand Kenjeran', 'user/project/FbezjpMhvbvxwHKlc9G9WPyz8slJvBaBVkSG8cDP.svg'),
(82, 'PT Sanggar Asri Sentosa', 'user/project/bsSR8agR0J3rMvSvxK7Pueld2JMuDEaNBzNpyQ51.svg'),
(86, 'PT Taikisha Indonesia Engineering', 'user/project/7z6mKTuAlHioHu3tz2ujYoYVK2t2dr8liEc1MhWI.svg'),
(87, 'PT Satoria Aneka Industri', 'user/project/e35cOzoOsmD8SxjarPfZIAgqi6RzVJ6H2eQY1aPG.svg'),
(88, 'Hisamitsu', 'user/project/xeycss47ehYVJJG9gcz8awirDXVF8q8JyXw51VrF.svg');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0VpDTsey5NRPDHZeciZMh0RsUUk09DGGGlCaVAOY', NULL, '103.177.100.47', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXpCbWtpOEdvYU9jMmx1QnBoMkU3V3FmT3A0aTJKVjFDTzZhOERUeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785297530),
('1EzwCA2YV37SDS4eTPko4qOKJM4HKDQWqPuK5Dvq', NULL, '49.51.178.45', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDRPeHE3WWhJTW9GOHdwZmd6ZWNxTVVvYmlaZXZpSnpwelZMUGlTeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785292668),
('2q7w4gFOa757HftGAsLj9pfuHZPFXrrG8yNxpUMF', NULL, '2602:fa59:10:3a9::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia0xsZ2U0dVYwRmNkQm1yN3BBOVZVZ1pZcllYbGlzUVNHZFFKcnhIOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785233902),
('3B9l2aEDxvLlEBPCvzxCvKTE1kHKJCVzVlyUTAd8', NULL, '2a06:4882:9000::a7', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXBlZTU3UWlpeklhUlF2MDlNcm81N09DamhxQWdXRFpHM1M0T0lhVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9bMjAwMTpkZjE6NzgwMDoyOjo5OmEwY2NdIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785293887),
('3o7CQlRV2fluB2CFAxMTSXvoc7fU6mlRQXKYsn5E', NULL, '2602:80d:1008::69', 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibkt4cFcyR1NLVGlnM1lyZEV1c1M5R0ZXQ0p3T0I2Qkh1RWJmWWFwMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9bMjAwMTpkZjE6NzgwMDoyOjo5OmEwY2NdL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785268638),
('3WbPJlB0QkXANyxWRP4d5eAK8UmB9s6YYCt4UDj5', NULL, '34.174.224.253', 'Mozilla/5.0 (Linux; Android 13; Infinix X688B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.48 Mobile Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibXBjRlhTdW1EVVMwYUo2SXNNdmI4NWlhYm9GQWFWWVRQaVB0dkp1diI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785278607),
('7hYlhR3j8ZMIxFXg5Dd5iKa4skYoVjFfqlDO4b4u', NULL, '74.7.242.47', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFh1cFhNQXM2dk80R1BkSXFzOU5yTmlSTnVEMFI1cDVXWWF2bm1ndyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785279312),
('8qQ5uv9ZJLbkIHr6pwtDiqo3y33SVorTqXgRrgM9', NULL, '2602:80d:1007::63', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRHhuUFVlNzJiNHNwODhRb2w0N2JtYVpzdExzcDN4ZFI1UkhvNFQyRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268345),
('8XhvKiP9inMah5WkTtonznHKkpEWG0pGG5QKcB4C', NULL, '77.74.177.118', 'Mozilla/5.0 (Linux; arm_64; Android 12; CPH2205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.3.86.00 SA/3 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMGF5SFdaN0xXVzNiMTcxU3F6YnhCUDU0Y25jc0ZSUmFadTk3eUpaWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785261396),
('BFFAoYwTkFw30vLyjjANKryttfxHEAaw3w8o3kVF', NULL, '43.130.141.193', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ3R4Vm05bElqNmxWc1BMcGhrcGpXeEJ2WmphWkFQaUZOQWVWZFYzNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785258086),
('Bfz0tGidisT0nxupvk8SRyhCyY3wAvWeYpMRqCR7', NULL, '106.52.49.148', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEp5SUNjeTJybzFMcmU3bm9uQXZKVmpkSXNDTTJrVnE4dGdtdFdGZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785255881),
('bhzF3YDGbYhxekoGZ6WcsufwfUdsUVvBQABxsfSv', NULL, '216.73.217.178', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFhiMDk0cmlvbmpqeWJtSmY3UkJ5VzZaRzU5VkJpdTNmN0R1bzBBTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785237185),
('c9YQfGjL3o95ZLABfGiklFwmCdCjdvP6MWMm3OzN', NULL, '18.159.231.78', 'Mozilla/5.0 (compatible; HubSpot Crawler; HubSpot Domain check; +https://www.hubspot.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTHFENlJ2VDJwSzFUOVozRWVaak40Y0xOOWZqb0E2WGRsQks3aFN3WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785279883),
('CMk4Z8QIxQEEmMlvOo2PvAM5AIC3cge8lnHNQKPy', NULL, '170.106.113.235', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFNyVGh2Njg3NzhRRVV2c1hYcEtzWGUwRmt2NHdlN3p3dnVRSEF2aSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785242940),
('cZ93hDm7EW8aVoUmxSO7R94kdzBRMn1A4aN7hZiy', NULL, '43.135.148.92', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkU3aEh6eW5VQzVXMlhQek1SMnVzQ1FyR2haVDJtNFc0YkRjWVJpcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785240248),
('dbsNqYCdNwZgfvEaUs8817E6tZajhcNsqov7gwkG', NULL, '170.106.180.139', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1hFYUEwNUQxa1lQcGdXcWt1dnpIMTJUcWUwV2c2MzB3N3pKR1VaRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785276839),
('drR1dDFPT7xXEMGSjsj5bfpY9CfI1jB7SWm9boLe', NULL, '2602:80d:1007::63', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUVkOUxUV1g2b0J3c1lVVmMzV2F3ZFZGYmg3S0xpYTFQVTZKS09ZUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268174),
('enFKb72iF1XkG0JNbgrQHtyPLGAEM9vk6aZsHpTG', NULL, '66.249.79.168', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.7871.128 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia051cUYyZGhla0VsWERUY0VXZmttcjFNVTZaZnlpWjNUZmVYdmdwMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785278922),
('ez3HMFzmi3l2mpdmUUnoLV5P01R0K6FIjrtuoR8F', NULL, '2602:80d:1007::63', 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2k2dTh3N2NSamVnd01FYlRwMXdZeHZOeHNlTDFWS3lEWUdPMFFMcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9bMjAwMTpkZjE6NzgwMDoyOjo5OmEwY2NdIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785268176),
('fbwbltBtS33YC5rnh1TfswsbHN3o7sY9mErkEE2m', NULL, '2602:80d:1008::69', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiclJOek1LNFpvMmM0b2ZxOXpBOUE5UnhtTWlzdTgxeWM0QVJZVmVpbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268634),
('fijkKVBd7AaAf3Wq0nUSvEJ4tkyN4yrWIgsfwhwG', NULL, '35.168.7.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFdYQ0d0WDNxMGk4cVNhbElESnl6UnhIdVdhWTVUN0FkZTFyMFdhSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785235693),
('gJwIZHKxLZhLSgTFAwCxgvWt5YkweruUkizRvl7h', NULL, '2602:80d:1008::8c', 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnJobTlrSUhtZ3FrTGNwTmpTMkk4RDlmUUpaVEtielRKcG82WGlVNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vWzIwMDE6ZGYxOjc4MDA6Mjo6OTphMGNjXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785250826),
('IGWL27eZBz0i5PMInQFJ11GhwFKYeje8wvgXm8qW', NULL, '35.168.7.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.136 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmRIMFVBV0NqTW9uWDNKdEFPYkx3RE11TXFPUVZKRXduWmJCamJDdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785235693),
('IqZPrScaQtQCR1YFFKFEU16UVVvrHnxVgILvF0cb', NULL, '74.7.242.47', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmdJZ3czQmcwZHp1eW9NMlVzdzFUUTIwMWRuNk5kUXdQQVFXMFZGNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785270203),
('ITkYO6hlNr2ItrLvFJyKRSuQxyRDLQncP31A2mCb', NULL, '2602:80d:1008::95', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib05lQnJBWW8yeDMyNkh6bDYwc3VqSzBlMkd5RG11N3Jlb2VpdnFQVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268523),
('KpQrAaENc2J2wS1G3eNbE4jRhASUVAp6Q8PHyKwm', NULL, '209.87.169.125', 'Go-http-client/1.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibHpTbmNGR01iTmtPQ3RsSFlPWURsZmhrN1F6YnlkSHhKMEhlRlg0bSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785239221),
('L9iqkW5OjgI3nNq68eNl45xlpukEiNHD30ZhHOLj', NULL, '5.39.1.239', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibTdNTGZnc2swZVI0eXAySm9qZTZzNnY3eUZiT1lmclF0UEFPdmtUdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785241596),
('LGAVWAY6LJcmt01OuItXcMRqmbKlPwo658i0Pyy2', NULL, '216.157.40.67', 'Mozilla/5.0 (compatible; HubSpot Crawler; HubSpot Domain check; +https://www.hubspot.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXJTN1BYeDVWQjMwTDZsVXdMSGVURkRWUFUzYnBhWDhvWGp1cjFrciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785279882),
('lgGa4R9YeoqjWnqKJsRmdKlLjV35wSk47lxZmZwd', NULL, '136.116.167.89', 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUlRyRHdTeUVPZW5lUVNMamhyZ2ZwQzd3SUoxclM5Smw1dmRQTEZlVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785279208),
('Lp40pKwP8rmwKfb8ifpbsvWjgjVc8h4gleGswMUP', NULL, '54.174.58.227', 'Mozilla/5.0 (compatible; HubSpot Crawler; HubSpot Domain check; +https://www.hubspot.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic21tU0V1UEdYeGxneHU3Wmw4TWt4YU51YnlaQ0hhaU84aEtWQnRyOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785284823),
('MnBLrD4dumHrJF2Mj6l5CazhpFH0Jx6OVFhUcSYz', NULL, '216.157.42.86', 'Mozilla/5.0 (compatible; HubSpot Crawler; HubSpot Domain check; +https://www.hubspot.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFhUcU12cTB6UWtjWFdpaVFjeWNqZWZ4aEZlZU42VENMWng2THYzSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785279882),
('mY6tLr0XPPnU32cpH66gv6xqeroOFqiXro4hH6pw', NULL, '121.43.168.130', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHdJREhHMW9qS1I5U2tseExpMXJpMW9CaXdjNERWaFBEanZQUWRIRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785272868),
('MyypKEmG3EVlPT9b1FhQEBVljG7duuE5X8sjjs1b', NULL, '217.217.253.159', 'Mozilla/5.0 (compatible; wp2shell-audit/3.1)', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibHlMV09VNTlqa1lIdE9nWXZBem1oelpFZkw4eHFhTGlqQk16SkN2ciI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785246046),
('nk7HSJUGmmSwWpLFpF0CNAsaZ4L6MynEGivbotRq', NULL, '43.130.174.37', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNVRWaUpsNnNLODBtYzJycnk4eDZzOGNxSktjb1NNWjdxYUxYVmRZMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785254273),
('nTDSrnUgXDcvJsqf8gkzOldetuGNEtBxjB7kAIvp', NULL, '129.226.174.80', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWk1xcU1CbmNITXJta3BUYXh6TDk1c3QwZ1R4S3k3N3Yxc3Z1ZmNpdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785280119),
('oo3wR8YOyMjuJpmykzmk4Q9HtShAMIkWiF7PLrQR', NULL, '106.52.216.13', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0pMQlFLU3BIOUtRS0JMdE5mcUFKNktmNnFwOWJ4RXVwcW9kRDNHTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785234825),
('QdD6c2KtZIvze90uV26DnBXdBtAVZeHppGlW9Wja', NULL, '43.165.174.53', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibTBYMTZBNkNQQmR4OTJrb3NKaGpaSmNNYk9kWWMzOFRzQThUZ2NweiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785295776),
('qqc7z0SvoQlrv2RRHt9mOvP8BC9L0rASXyeyMzFY', NULL, '205.210.31.149', 'Hello from Palo Alto Networks, find out more about our scans in https://docs-cortex.paloaltonetworks.com/r/1/Cortex-Xpanse/Scanning-activity', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUUwS2hkZW5RS1hUVTBla0Q5eDdZT01GSGZUMGIzUWk4QVdhZzhUeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9tYWlsLnRpZGV4LmNvLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785251016),
('qU9WkbCh2rIU8GX7S2iI6BpPZP2tKYBL8O5D3mC3', NULL, '216.157.41.73', 'Mozilla/5.0 (compatible; HubSpot Crawler; HubSpot Domain check; +https://www.hubspot.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUU1XMlhqa3JVektVU1djdE5oR3oxTVlBNEdBMTZMMnkyTGxrOGxpSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785279881),
('sAudf1K4IJ2GvTefqWczfDAfDHBHqDNLljTnqGoG', NULL, '5.135.229.111', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU0xVeWdraHNyMmZHUEMzR1JvRmVPbXJndHJEQW9RNEVwalk1cWJtYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785245174),
('sEjY6VvTPglMrflFi4exDqaW8ondTPFSo5p0TjAt', NULL, '192.36.109.75', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaktGQm1CQllRdUM5dTZLWEZ3cjI3SWM2cVhlMUtydUpGWDNSUmJxaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785257947),
('smGEHk2Qmgm035huWaEMmQi7Xz2EaxrJ5wlWD9F1', NULL, '104.210.56.224', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0hHRHh6RWxsMFZpRWVvN3lESmNtYktKOU9jSzJneFU1WDJjMXhQSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785247598),
('syJSumczqfifD0Tf1t2DsAYD9yFxedQtyMfpiiGW', NULL, '2602:80d:1008::69', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUElMVjdNTEZrdE1tRjdadjRYbEVYQzdxUmJmTWVjQnByZlhrajRtcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268656),
('t1c2viOLDS55kLQ1hNhuDBYISszdBL2974jX0cuO', NULL, '139.155.134.17', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXhYVHlHY1FwRFVocGc1NTVNejhqMWJnemFzQmsxd2FRZVdGMFhBSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785275338),
('tmNBzyjm2U1ZU53uJJUqXxoUkUdpAf8ZMojBsx6i', NULL, '198.244.168.16', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibE5aV2U0TnVvRFh0QzZ3MDVzQUIxWjVUMlYyblBiVHNjM0w1RmZWcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHBzOi8vdGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785241284),
('uilCHxZi7sCz7CZ7VWHhUw06ziPpc2N3P1i7NT8N', NULL, '118.24.135.34', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQlZnakZOVmtvR1lvOWtoZ29qRlo5Yng5ZEJTRVdCaW8xcldoNFVMZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHA6Ly93d3cudGlkZXguY28uaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1785294144),
('uvsTUgmaMZAAvLD8m8EPaLfXuxNnkAHg8Jd2giPF', NULL, '148.113.128.93', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1BVVWpDRnM0cnVWV1Faa1hXZFpNSlZ5TlZxdVJQcmhmMzFKUXJIeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHBzOi8vd3d3LnRpZGV4LmNvLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1785291824),
('WwD5kuv7iUjrk6n5C70aqs0wdxzKQWPrLG5h4dCK', NULL, '2602:80d:1008::35', 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFptcGJBcE1sUWp4MEJiWEFrUTdrQ2JMb3RucHJHblJjQnVUSlZhayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vWzIwMDE6ZGYxOjc4MDA6Mjo6OTphMGNjXS9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785250027),
('yn8xzKVolPsDSOTkIdpBn3ylOfvTPHOY8JFBtbna', NULL, '2602:80d:1008::95', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidHF6VnVEZFBrRnNPTmhBclowYTVNVXlvdDlBaVpJRXRSelpDUHgybyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268520),
('zG6ErwRhxUh1TCiJ8dEKi1YDdvjqGbsEVPXovEVh', NULL, '51.68.107.157', 'Mozilla/5.0 (compatible; MJ12bot/v2.0.5; http://mj12bot.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVmRGZk1ZOU5Kamx0eWdMNG5pS0ZDVFhEd0dmRHlzOVNsOHVoMnVCRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly90aWRleC5jby5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1785268619);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Admin Tidex', 'budhitdx@gmail.com', NULL, '$2y$12$fFcKtVUeLE/jRCemXYxkCesXFoCVgUctRsf0Fuzpb2b4jCOEfRu56', NULL, '2025-01-19 05:45:34', '2025-01-19 05:45:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_admin`
--
ALTER TABLE `message_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_partner`
--
ALTER TABLE `our_partner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_product`
--
ALTER TABLE `our_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_project`
--
ALTER TABLE `our_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message_admin`
--
ALTER TABLE `message_admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `our_partner`
--
ALTER TABLE `our_partner`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `our_product`
--
ALTER TABLE `our_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `our_project`
--
ALTER TABLE `our_project`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
