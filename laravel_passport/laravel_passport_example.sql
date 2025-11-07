-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2025 at 05:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel_passport_example`
--

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `district` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `district`, `bank_name`, `regional_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kolhapur', 'Sangli DCC Bank', 'Tasgaon', '1', '2025-11-06 04:37:48', '2025-11-06 04:37:48'),
(2, 'Sangli', 'Sangli DCC Bank', 'Sangli', '1', '2025-11-06 05:51:18', '2025-11-06 05:51:18'),
(3, 'Kolhapur', 'Gaganbavada DCC Bank', 'Kolhapur', '1', '2025-11-06 05:52:29', '2025-11-06 05:52:29'),
(4, 'Kolhapur', 'Gaganbavada DCC Bank', 'Kolhapur', '1', '2025-11-06 05:52:29', '2025-11-06 05:52:29');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `designation` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `designation`, `regional_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Developer', 'Sangli', '0', '2025-10-31 04:51:38', '2025-11-04 04:50:48'),
(2, 'Front End Developer', 'Front End Developer', '1', '2025-10-31 23:25:41', '2025-10-31 23:25:41'),
(3, 'React Developer', 'Kolhapur', '1', '2025-11-01 07:07:55', '2025-11-04 04:11:02'),
(4, 'Backend Developer', 'Kolhapur', '0', '2025-11-03 04:35:26', '2025-11-04 04:07:28'),
(5, 'PHP Developer', 'Tasgaon', '1', '2025-11-03 04:36:59', '2025-11-04 04:10:46'),
(6, 'Java Developer', 'Sangli', '1', '2025-11-04 02:06:44', '2025-11-04 02:06:44'),
(7, 'Backend Developer', 'Tasgaon', '1', '2025-11-04 04:11:21', '2025-11-04 04:11:21'),
(8, 'Analyst', 'Tasgaon', '1', '2025-11-04 04:12:30', '2025-11-04 04:12:30');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `district` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `district`, `regional_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sangli', 'सांगली', '1', '2025-11-05 01:55:18', '2025-11-05 01:55:57'),
(2, 'Kolhapur', 'कोल्हापूर', '1', '2025-11-05 05:37:25', '2025-11-05 05:44:36'),
(3, 'Satara', 'सातारा', '1', '2025-11-05 05:42:56', '2025-11-05 05:42:56'),
(4, 'Pune', 'पुणे', '1', '2025-11-05 05:43:21', '2025-11-05 05:43:21');

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
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
(6, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
(7, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(8, '2016_06_01_000004_create_oauth_clients_table', 2),
(9, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2),
(10, '2025_10_30_094135_create_districts_table', 3),
(11, '2025_10_30_125100_organizations', 4),
(12, '2025_10_31_071908_update_districts_table_add_columns', 5),
(13, '2025_10_31_090206_create_designations_table', 6),
(14, '2025_10_31_114013_update_organizations_table_add_columns', 7),
(15, '2025_11_04_115126_create_products_table', 8),
(16, '2025_11_05_060017_create_districts_table', 9),
(17, '2025_11_05_085616_create_roles_table', 10),
(18, '2025_11_05_123727_create_talukas_table', 11),
(19, '2025_11_06_093832_create_banks_table', 12),
(20, '2025_11_06_120936_create_modules_table', 13);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `product`, `module`, `regional_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'FGHFGH', 'fgdfgdf', 'Sangli', '1', '2025-11-06 07:08:03', '2025-11-06 07:08:03'),
(2, 'FGHFGH', 'fgdfgdf', 'Sangli', '1', '2025-11-06 07:08:03', '2025-11-06 07:08:03');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0798a74ad5a6e5e12428fe7de275c775658be51e77fd035ea8b25babc6f78c8dc813c4b94df0cd4a', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:07:35', '2025-10-29 23:07:36', '2025-10-30 04:42:36'),
('07990049c3b4981b665396bf7c26aca719db5fcabe5c14066cf18f8d9919ec4e6642f4888b751db0', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:13:36', '2025-10-29 23:13:36', '2025-10-30 04:48:36'),
('07b171ba7030079daa4b671a140de1080d63ad1a9e53eafd52086a824c0c67eda5a52001c8a2e139', 1, 1, 'API Token', '[]', 0, '2025-11-05 05:42:20', '2025-11-05 05:42:20', '2025-11-05 11:17:20'),
('09f3075910d85bee851e4d7068915142a1061a2609981fd62bb3d4d6efc9f3e3243aa8fad4246ed1', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:44:47', '2025-10-29 07:44:47', '2025-10-29 13:19:47'),
('0c5a8cb5d9da231b955cc02dc2a8a7d6965ae62c1deab298f214a8e2c31c2e92a793ccb96fa68eed', 1, 1, 'API Token', '[]', 0, '2025-10-30 01:56:22', '2025-10-30 01:56:22', '2025-10-30 07:31:22'),
('0d5c4b0d954a06a08136afa87a2148b8b96ac710c42a01fb73eb75420758e6155b6e7735e39f5721', 1, 1, 'API Token', '[]', 0, '2025-11-04 02:06:09', '2025-11-04 02:06:09', '2025-11-04 07:41:09'),
('0dee2241197774ece1773a018b25741d19ce1635cfaa67a20ce8b7fa497c073fffff5508c5a7b944', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:46:53', '2025-10-29 07:46:53', '2025-10-29 13:21:53'),
('155343a1cbdbe76d6d6a65802e3e265b6f7cc81f7147344bf5bc2e29a06c2d987ce7731e599584a2', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:12:46', '2025-10-29 23:12:46', '2025-10-30 04:47:46'),
('1a678a6f3946a50772c7dd1297e7d0b08d8fde04b723dfec468a4229bae928e56fe458303a19832d', 1, 1, 'API Token', '[]', 0, '2025-11-01 06:10:25', '2025-11-01 06:10:26', '2025-11-01 11:45:26'),
('1d51974a819314ecf69ebad7a97b6140fc00f20a0241089ebb71c8446c0fd954760dd31b85cb71ef', 1, 1, 'API Token', '[]', 0, '2025-11-05 01:46:45', '2025-11-05 01:46:45', '2025-11-05 07:21:45'),
('2412ecff5a80868ac26f201eb1e6c70107f27916b220fa050df026c21be8318e4968744b9df2c0cc', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:11:57', '2025-10-29 23:11:57', '2025-10-30 04:46:57'),
('271c559b4bf5d50df976c0a618d454b6d114b8af88632c9d7f380483262d8b39f86160b504aee73a', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:51:11', '2025-10-29 07:51:11', '2025-10-29 13:26:11'),
('2b8e53bdc4eeb9b5e7f4fec31462168ee5af07e5e783761664a34c43a86215bf50d8a640da667af6', 1, 1, 'API Token', '[]', 0, '2025-11-05 23:22:47', '2025-11-05 23:22:48', '2025-11-06 04:57:48'),
('2f8a1a1c3ed41727d1fff9f8a3e6081dc02e494194b06920bb2dffb1a18f53fb9ffb4b28426831fe', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:44:18', '2025-10-29 07:44:18', '2025-10-29 13:19:18'),
('3ba3f5ea36981eed43d8ff1fe810d0d6da52057be036ffb9a2fb79f56d28357999c197123acd031a', 1, 1, 'API Token', '[]', 0, '2025-10-31 23:09:04', '2025-10-31 23:09:04', '2025-11-01 04:44:04'),
('46c0ba1841670dfc4f0e3a0eed8b890b433aff2d6d5cb72cdc1aeced4265997464262b06e35a1865', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:38:44', '2025-07-29 03:41:15', '2025-07-29 09:13:44'),
('4e9b1e6ef353fe3c7a6defa42cd1cfd45e601299df0b89d629b21d8ca5e55d168655bdc2faefbd9e', 1, 1, 'API Token', '[]', 0, '2025-10-31 23:09:06', '2025-10-31 23:09:06', '2025-11-01 04:44:06'),
('585350a079ffcdca877a9260edac8ab7cf5c7ca005d1327d83e4bb422196e2a11fc2a2a88aa8f4e3', 1, 1, 'API Token', '[]', 0, '2025-11-03 00:23:47', '2025-11-03 00:23:48', '2025-11-03 05:58:48'),
('68dd4bc10854a527cece5d9136021f28567727df085c3f2eba5096ef20ae9172d0b35c7266ec6628', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:09:13', '2025-10-29 23:09:13', '2025-10-30 04:44:13'),
('73fae660dd7bbb5039ce7894fef7acef20ed488df6d7826c633ff397067280d76a905bd192ec0082', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:26:18', '2025-10-29 23:26:18', '2025-10-30 05:01:18'),
('763dc2ac187109a94a8dfe1dfc19783e1e646855e0ab46fdad8e4ec88b12b44d0db135372ae489a4', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:51:29', '2025-10-29 07:51:29', '2025-10-29 13:26:29'),
('7b2eccd83cd234c2296fd58a2c64f020ed063437c97576d397d50c7b45ad9fa5593529588b365eea', 1, 1, 'API Token', '[]', 0, '2025-11-06 01:36:34', '2025-11-06 01:36:34', '2025-11-06 07:11:34'),
('7c0d03bbcf0506c2af766f59a489407db365fd69ef416b0ca7dc0bbc472c4b2af4a8c502e1481f23', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:36:38', '2025-07-29 03:37:01', '2025-07-29 09:11:38'),
('83572bda8ae56255d7055d40fc932b9b0eb1484ddb6fd24fc086d51dc5a282faeae219aac66d27bc', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:31:45', '2025-10-29 23:31:45', '2025-10-30 05:06:45'),
('844493dc0f6a90f7740c4ba38eccbcf0ef7ca027cd6f1397bf942fa440b0139894181f3874755977', 1, 1, 'API Token', '[]', 0, '2025-11-06 01:36:35', '2025-11-06 01:36:35', '2025-11-06 07:11:35'),
('87e5ed8158099ccf48647d689f4a8c0bf9272d831b74bf6e137b4ab0e6a2d303c1891efb8c43e9c1', 1, 1, 'API Token', '[]', 0, '2025-10-30 23:23:50', '2025-10-30 23:23:51', '2025-10-31 04:58:51'),
('8fbf8f0fe947478cdde7327fcd45544b7816b320cfad9d44cffb495c6a29e57bfbadfbccc89884eb', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:47:44', '2025-10-29 07:47:44', '2025-10-29 13:22:44'),
('a6e77399edc70441098a4880c23984b7249ddeba6710b5a88cb07bf6b0ca53d94937de520b9b7f01', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:09:36', '2025-10-29 23:09:36', '2025-10-30 04:44:36'),
('a806e86245e80c4e55ad5a1923d7237f7d47d9df4e2b86221b5d0189f0cafe5deb626727caf36a1f', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:19:15', '2025-10-29 23:19:15', '2025-10-30 04:54:15'),
('a83a3a4c1c3eb11e918460e7d0574182b8ecc553ac6f2a3f76541742f9b2caad9cb441c867437fc3', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:43:55', '2025-10-29 07:43:55', '2025-10-29 13:18:55'),
('ab32587bbfcf946a70cf2ed58652351f9faa148c0c949fb536d58dbfd9901214e40e7552c1ababb6', 1, 1, 'API Token', '[]', 0, '2025-11-05 01:51:02', '2025-11-05 01:51:03', '2025-11-05 07:26:03'),
('ad884dc26e2c0aeebda1f2690503f2336b896f1cac19635beb2a11175dcca726c76ac8175ba84b12', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:11:14', '2025-10-29 23:11:14', '2025-10-30 04:46:14'),
('b0696d57a4947fe269c34501a6b6156f6b734c932ef4d7305d4e35c35921813a093688a93bd8bab2', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:32:19', '2025-07-29 03:33:05', '2025-07-29 09:07:19'),
('b98b3de7d6e873f0cff4ae3d604a31b2eb0fb6605a9cf7c9b1e21c0bddd708c58213632e20782a99', 1, 1, 'API Token', '[]', 0, '2025-11-01 06:10:22', '2025-11-01 06:10:23', '2025-11-01 11:45:23'),
('beb27defc0d132ea9449bfa39fe71614f2905f8be272084d3f7a289713b3a1e88ebf6f8547b355d5', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:45:55', '2025-10-29 07:45:55', '2025-10-29 13:20:55'),
('c0526a1972845e1322e50b7f48d6772bcda9e9bca8777abb1ebf1a3bc53a554e6c2deddcc9ffe25f', 1, 1, 'API Token', '[]', 0, '2025-11-04 23:17:08', '2025-11-04 23:17:08', '2025-11-05 04:52:08'),
('c27170abde96a6fec5e94cb6a59a98da90a28fbc06b378f3011689f232eb00fcc7087347ab24c3a9', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:26:24', '2025-10-29 23:26:24', '2025-10-30 05:01:24'),
('c6646cd2b9448a2e946c2af7db983f16602f7336b954b81a696cd053e77a31dfb6f1d9db754a8afe', 1, 1, 'API Token', '[]', 0, '2025-11-06 01:36:30', '2025-11-06 01:36:33', '2025-11-06 07:11:33'),
('cd43988f403dc74d2c8bf08ae3aecbd9f79803072ba9d60e50dc555e2ce5d274e41b8c43b70441db', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:08:37', '2025-10-29 23:08:38', '2025-10-30 04:43:38'),
('d25becb2c8ede565c733f364cb3e778b81ee43e7a6c50ffc99193ffc8444681bdc54cc4a6bd2f58b', 1, 1, 'API Token', '[]', 0, '2025-11-04 23:17:05', '2025-11-04 23:17:06', '2025-11-05 04:52:06'),
('e784f8333a221a4ebbf978cfa44565c588dc0b10717414e18d80d0d1d083e76060c828dabd9ff8cf', 1, 1, 'API Token', '[]', 0, '2025-11-04 01:30:01', '2025-11-04 01:30:01', '2025-11-04 07:05:01'),
('e86c031c1b24f0b9a3861b7e9e8520108fe89c711b163bc2e0af2858e3a4526e4e8650f4bf055d2b', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:11:24', '2025-10-29 23:11:24', '2025-10-30 04:46:24'),
('ea6977faaa5f35cb9e0c41698d367e9a7f6f49f69a6ec80af6cbbf2bc71249b0abd2027bc398bc13', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:31:13', '2025-10-29 07:31:14', '2025-10-29 13:06:14'),
('ebb3940ed973eb960a42d2532c2b2a51b52a3130adba4f0567031e30bed7117f1fc7bd2a5ac8f023', 1, 1, 'API Token', '[]', 0, '2025-11-05 00:57:47', '2025-11-05 00:57:48', '2025-11-05 06:32:48'),
('ed17bd0efa0bad6273dbd053a24b30d643a358128407166de05825dfb31412b6e1a23267711d4882', 1, 1, 'API Token', '[]', 0, '2025-10-29 23:18:04', '2025-10-29 23:18:04', '2025-10-30 04:53:04'),
('fddfbda6443680293cd5331551f6a66f61eb42f85e0124e484a45c8106eb9aaf7d9927c2f6e7eb38', 1, 1, 'API Token', '[]', 0, '2025-10-29 07:43:26', '2025-10-29 07:43:26', '2025-10-29 13:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', '6EMbGugzBrPszczmOh0Wy4dOTqS2k6N3JTsTXBcx', NULL, 'http://localhost', 1, 0, 0, '2025-07-29 02:48:51', '2025-07-29 02:48:51'),
(2, NULL, 'Laravel Password Grant Client', 'Z1jGY2cJrvyfAAfqMwpmMSS87S1hg1FU3gjnK8zW', 'users', 'http://localhost', 0, 1, 0, '2025-07-29 02:48:51', '2025-07-29 02:48:51');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-07-29 02:48:51', '2025-07-29 02:48:51');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `org_name` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `org_name`, `regional_name`, `created_at`, `updated_at`, `status`) VALUES
(1, 'New Organization', 'Kolhapur', '2025-10-31 00:44:22', '2025-11-03 04:34:52', '1'),
(2, 'Test', 'Kolhapur', '2025-10-31 00:46:48', '2025-11-03 04:34:59', '0'),
(3, 'New Demo', 'Pune123', '2025-10-31 00:47:25', '2025-10-31 23:29:30', '1'),
(4, 'ABC', 'Tasgaon', '2025-10-31 00:51:49', '2025-10-31 00:51:49', '1'),
(5, 'Own Organization', 'Tasgaon', '2025-10-31 04:20:35', '2025-11-01 06:32:28', '1'),
(6, 'Test', 'Tasgaon', '2025-10-31 04:20:36', '2025-10-31 04:20:36', '1'),
(7, 'Test', 'Tasgaon', '2025-10-31 04:39:08', '2025-11-01 06:43:50', '0'),
(8, 'Test123', 'Kolhapur', '2025-10-31 06:19:56', '2025-11-01 06:44:22', '1'),
(9, 'NGO Organization', 'NGO Organization', '2025-10-31 23:27:50', '2025-10-31 23:27:50', '1'),
(10, 'New Demo', 'Sangli', '2025-10-31 23:28:28', '2025-10-31 23:28:28', '1'),
(11, 'My Organization', 'Sangli', '2025-10-31 23:29:15', '2025-10-31 23:29:15', '1'),
(12, 'New Demo', 'Sangli', '2025-11-05 05:38:25', '2025-11-05 05:38:25', '1');

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
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'API Token', '0ef2825f7cf6e73a5f46a0d096449276c2d7cd262a780e80450f5714ede42b70', '[\"*\"]', NULL, NULL, '2025-07-29 02:55:44', '2025-07-29 02:55:44'),
(2, 'App\\Models\\User', 1, 'API Token', '7001058778cf20a14d0f0970654a43549a7b39d214c34862f0d9af423d1a8f90', '[\"*\"]', NULL, NULL, '2025-07-29 02:56:23', '2025-07-29 02:56:23'),
(3, 'App\\Models\\User', 1, 'API Token', '97d411593821a452ce0be54197e97e01438630b34bc18cf3474094031d1c81c0', '[\"*\"]', NULL, NULL, '2025-07-29 02:56:52', '2025-07-29 02:56:52'),
(4, 'App\\Models\\User', 1, 'API Token', '47afcc79b926e28afcfbfe0b8bfdde74b0d06e2ca60a5b58d73906bfd0e4c3d0', '[\"*\"]', NULL, NULL, '2025-07-29 02:58:49', '2025-07-29 02:58:49'),
(5, 'App\\Models\\User', 1, 'API Token', '6930b81d103e9d05cc89c6ac70da153a5bf7c4aeee9ce0583e27f4b61a016ef0', '[\"*\"]', NULL, NULL, '2025-07-29 02:59:33', '2025-07-29 02:59:33'),
(6, 'App\\Models\\User', 1, 'API Token', '4be312dbb5951ea09583a5d96e3953b47237092fb43fa516cd989e18f6d361ee', '[\"*\"]', NULL, NULL, '2025-07-29 02:59:36', '2025-07-29 02:59:36'),
(7, 'App\\Models\\User', 1, 'API Token', '66313b3c09629581d3c02b4fb2be410259a6435464044d2d5f1d5761ba889ac6', '[\"*\"]', NULL, NULL, '2025-07-29 02:59:37', '2025-07-29 02:59:37'),
(8, 'App\\Models\\User', 1, 'API Token', '43ea72ed75918e97f8c0716f6ba9fde815b8b51d9d902c9adbcc67f6692c2cb9', '[\"*\"]', NULL, NULL, '2025-07-29 03:01:09', '2025-07-29 03:01:09'),
(9, 'App\\Models\\User', 1, 'API Token', '5519fbe497555e647bef636f77437decaf3e1fbc124b5ce5377836b35b63e9e7', '[\"*\"]', NULL, NULL, '2025-07-29 03:04:06', '2025-07-29 03:04:06'),
(10, 'App\\Models\\User', 1, 'API Token', '53df0397b0529138e3ed27118d9ddb95e97c5840d07ae885eca4a90ca935534a', '[\"*\"]', NULL, NULL, '2025-07-29 03:06:23', '2025-07-29 03:06:23'),
(11, 'App\\Models\\User', 1, 'API Token', '6c9e82f5779b9b88c43cc802fbe625b0650c46eeff30f79cdadddce57449ae18', '[\"*\"]', NULL, NULL, '2025-07-29 03:09:41', '2025-07-29 03:09:41'),
(12, 'App\\Models\\User', 1, 'API Token', '718ce536dbbc8f2e176a71c5f3bdd2550fd839a516d8c9e94e7e4406b0be0dd2', '[\"*\"]', NULL, NULL, '2025-07-29 03:17:13', '2025-07-29 03:17:13'),
(13, 'App\\Models\\User', 1, 'API Token', 'c69bd30e38995044740e47769593c33cb1aa9600185243bbeaa28ae950d92faf', '[\"*\"]', NULL, NULL, '2025-07-29 03:19:15', '2025-07-29 03:19:15'),
(14, 'App\\Models\\User', 1, 'API Token', 'ee8b99e6f3f61922339d48fd86b08c4ab7f1420a2381c1be1a66b1f87fbfae1c', '[\"*\"]', NULL, NULL, '2025-07-29 03:19:28', '2025-07-29 03:19:28'),
(15, 'App\\Models\\User', 1, 'API Token', '92e05f3c82773bc26e703b2585487c20d99ca762260e0fc84ce3158d691da5bd', '[\"*\"]', NULL, NULL, '2025-07-29 03:19:34', '2025-07-29 03:19:34'),
(16, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '8565bed56b1bcaae41fc58ffa1f74038843edeca539da0261e4b71952efc7341', '[\"*\"]', NULL, NULL, '2025-07-29 03:20:48', '2025-07-29 03:20:48'),
(17, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', 'd75431496fec4e57fa159cbe51d8653776978cc168784dfc5d9121efe3818f01', '[\"*\"]', NULL, NULL, '2025-07-29 03:21:07', '2025-07-29 03:21:07'),
(18, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '93eaaf0333424de047f2e2c8bb856479e4c87ce1eab7be52314b0bf3e0cb3512', '[\"*\"]', NULL, NULL, '2025-07-29 03:21:22', '2025-07-29 03:21:22'),
(19, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '287ad5c07c54b45bc819024d45dee3fd6ca66950be0308391a7c92016f4e86b0', '[\"*\"]', NULL, NULL, '2025-07-29 03:21:37', '2025-07-29 03:21:37'),
(20, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '21f0308f795e38831f9c62db63956c2c872d2e5d7899a69a9e1dfaa623917e9a', '[\"*\"]', NULL, NULL, '2025-07-29 03:21:49', '2025-07-29 03:21:49'),
(21, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '53dadeab644bdbf31241f65c596bc3ee72343143e48bfe69a8b4e90b686d8287', '[\"*\"]', NULL, NULL, '2025-07-29 03:23:05', '2025-07-29 03:23:05'),
(22, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '3c3c6490d5d55e8733708f52b38bc6207d0a1ef1f20fa26fa01ba2b568041517', '[\"*\"]', NULL, '2025-07-29 03:28:33', '2025-07-29 03:23:33', '2025-07-29 03:23:33'),
(23, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '3d56007b0bedbcf862dfc7974960f6cc24882c5fb61c232d5567669e3917f236', '[\"*\"]', NULL, '2025-07-29 03:28:47', '2025-07-29 03:23:47', '2025-07-29 03:23:47'),
(24, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', 'f0b3f8248fd54bac1f2e9374c85e5c47982829fe127f465cbd5792d7008161a2', '[\"*\"]', NULL, '2025-07-29 03:28:49', '2025-07-29 03:23:49', '2025-07-29 03:23:49'),
(25, 'App\\Models\\User', 1, 'ajdkhaskdASDASD42423234234', 'bcd2508e580039015a3828f9d417a2fb631b6f92c2e4c4992d93afd7b602c5f6', '[\"*\"]', NULL, '2025-07-29 03:29:04', '2025-07-29 03:24:04', '2025-07-29 03:24:04'),
(26, 'App\\Models\\User', 1, 'ajdkhaskdASDASD42423234234', '32113d9b4acb5e1e60f2bc3c87e7f51876721dcdc56ac86606d836ea2c5771a2', '[\"*\"]', NULL, '2025-07-29 03:29:06', '2025-07-29 03:24:06', '2025-07-29 03:24:06'),
(27, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '5c2e561f23175a08a8dcba24f2ead85239569bb9078d348a8b8867fd2f46827a', '[\"*\"]', NULL, NULL, '2025-07-29 03:24:19', '2025-07-29 03:24:19'),
(28, 'App\\Models\\User', 1, 'ASDJKASHDK32I423784623876S776786as78das8d6a8d6sa8d6as78', '68f22517abf71042217b877ec3d2584af785ba28d20e48a180a1bf8258a417f2', '[\"*\"]', NULL, NULL, '2025-07-29 03:24:49', '2025-07-29 03:24:49'),
(29, 'App\\Models\\User', 1, 'token_access', 'dbe61a200f7cb19e34a8653bdd2c9257812f64a07efba7b2fee84a84beffdbd7', '[\"*\"]', NULL, NULL, '2025-07-29 03:26:14', '2025-07-29 03:26:14'),
(30, 'App\\Models\\User', 1, 'token_access', '65ae65ebc43553c7537bfebd1e5437fdb2b082d5b7869381c23bcd71249704d6', '[\"*\"]', NULL, NULL, '2025-07-29 03:26:21', '2025-07-29 03:26:21'),
(31, 'App\\Models\\User', 1, 'token_access', 'ea8984166681fda386e45a727f24ef7279d555b13ef1d0d14d88433f9022d8d1', '[\"*\"]', NULL, NULL, '2025-07-29 03:26:23', '2025-07-29 03:26:23'),
(32, 'App\\Models\\User', 1, 'token_access', 'e8a6784ea09170b76b2e00544ec29198fff8a0ba6ac46379cfba772b7b095c24', '[\"*\"]', NULL, NULL, '2025-07-29 03:26:42', '2025-07-29 03:26:42'),
(33, 'App\\Models\\User', 1, 'API Token', '45c5afc4eb23a90a13a5d0d27dad155f50841ba359aa03c1e5d5281230704fac', '[\"*\"]', NULL, NULL, '2025-07-29 03:28:13', '2025-07-29 03:28:13'),
(34, 'App\\Models\\User', 1, 'API Token', '91dc387a902ede5b6d0cf35e40778e057bb2bda4daa2a8ded0313bef19bb3dfd', '[\"*\"]', NULL, NULL, '2025-07-29 03:31:10', '2025-07-29 03:31:10');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product`, `regional_name`, `priority`, `status`, `created_at`, `updated_at`) VALUES
(1, 'FGHFGH', 'Kolhapur', 'Critical', '1', '2025-11-06 00:45:37', '2025-11-06 00:45:37'),
(2, 'demo', 'सातारा', 'High', '1', '2025-11-06 01:02:27', '2025-11-06 01:02:27');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Demo454', 'Active', '2025-11-05 04:05:48', '2025-11-05 04:05:48'),
(2, 'Developer', 'Active', '2025-11-05 04:30:54', '2025-11-05 04:30:54'),
(3, 'Help Desk', 'Inactive', '2025-11-05 05:06:21', '2025-11-05 05:06:21'),
(4, 'Tester', 'Active', '2025-11-05 05:06:39', '2025-11-05 05:06:39'),
(5, 'Supporter', 'Inactive', '2025-11-05 05:07:06', '2025-11-05 05:07:06'),
(6, 'Demo454', 'Active', '2025-11-05 05:07:22', '2025-11-05 05:07:22');

-- --------------------------------------------------------

--
-- Table structure for table `talukas`
--

CREATE TABLE `talukas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `district` varchar(255) NOT NULL,
  `taluka_name` varchar(255) NOT NULL,
  `regional_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `talukas`
--

INSERT INTO `talukas` (`id`, `district`, `taluka_name`, `regional_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sangli', 'Walwa', 'वाळवा', '1', '2025-11-05 07:24:16', '2025-11-05 07:24:16'),
(2, 'Sangli', 'Shirala', 'शिराळा', '1', '2025-11-05 07:32:13', '2025-11-05 07:32:13'),
(3, 'Kolhapur', 'Panhala', 'पन्हाळा', '1', '2025-11-05 07:33:20', '2025-11-05 07:33:20'),
(4, 'Kolhapur', 'Hatkanangle', 'हातकणंगले', '1', '2025-11-05 07:34:15', '2025-11-05 07:34:15'),
(5, 'Satara', 'Karad', 'कराड', '1', '2025-11-05 07:35:10', '2025-11-05 07:35:10'),
(6, 'Kolhapur', 'Kagal', 'कागल', '1', '2025-11-05 23:38:08', '2025-11-05 23:38:08');

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
(1, 'John Doe', 'john@example.com', NULL, '$2y$12$Fp0whK1VWHGvYH4OYEX9s.Ul9reP7ns7QIDnOB0aOkfM5RKtw5srq', NULL, '2025-07-29 02:55:44', '2025-07-29 02:55:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talukas`
--
ALTER TABLE `talukas`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `talukas`
--
ALTER TABLE `talukas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
