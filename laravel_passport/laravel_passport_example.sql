-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2025 at 11:14 AM
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
(9, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2);

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
('46c0ba1841670dfc4f0e3a0eed8b890b433aff2d6d5cb72cdc1aeced4265997464262b06e35a1865', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:38:44', '2025-07-29 03:41:15', '2025-07-29 09:13:44'),
('7c0d03bbcf0506c2af766f59a489407db365fd69ef416b0ca7dc0bbc472c4b2af4a8c502e1481f23', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:36:38', '2025-07-29 03:37:01', '2025-07-29 09:11:38'),
('b0696d57a4947fe269c34501a6b6156f6b734c932ef4d7305d4e35c35921813a093688a93bd8bab2', 1, 1, 'API Token', '[]', 1, '2025-07-29 03:32:19', '2025-07-29 03:33:05', '2025-07-29 09:07:19');

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
(1, 'John Doe', 'john@example.com', NULL, '$2y$12$ggm6jmNMpJiqz7B6YwLrnOJEAvkthy80k834ZAXy6.ITQWCstriKK', NULL, '2025-07-29 02:55:44', '2025-07-29 02:55:44');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
