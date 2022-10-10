-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2022 at 05:08 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sembadafarm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_users`
--

CREATE TABLE `auth_users` (
  `id_users` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp` varchar(14) NOT NULL,
  `password` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `role` enum('admin','employee','user') NOT NULL DEFAULT 'user',
  `userLastAccess` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_users`
--

INSERT INTO `auth_users` (`id_users`, `foto`, `nama_lengkap`, `username`, `email`, `no_hp`, `password`, `alamat`, `role`, `userLastAccess`, `createdAt`, `updatedAt`) VALUES
(43, NULL, 'test', 'test', 'test@test.com', 'isbfuwq', '$2b$10$s.AsPYY3h./Evlue9qIDG.Fqky/vTNAGJ6tG8dhfpDYWL2BcUzyX6', 'wqind', 'admin', '2022-10-01 07:23:40', '2022-09-29 08:09:00', '2022-10-01 07:23:40'),
(45, NULL, 'test', 'test2', 'test@gmail.com', '29478927348', '$2b$10$j6tAkkg3iAxB35fMP.NIOeBbnYmXPstIcoYqU2xwapwhahJPmbiAm', 'test', 'user', NULL, '2022-10-01 07:17:20', '2022-10-01 07:17:20'),
(46, NULL, 'test', 'test3', 'test@gmail.com', '29478927348', '$2b$10$ZP0JpWIul0J6vnKEBljymuedKGHBSf8pzh4APyTzc/Gv0P34S7X/C', 'test', 'user', NULL, '2022-10-01 07:18:33', '2022-10-01 07:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `d_blok_kandang`
--

CREATE TABLE `d_blok_kandang` (
  `id_blok` int(11) NOT NULL,
  `blok` varchar(255) NOT NULL,
  `createdAd` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_blok_kandang`
--

INSERT INTO `d_blok_kandang` (`id_blok`, `blok`, `createdAd`, `updatedAt`) VALUES
(4, 'test2', '2022-09-29 08:18:53', '2022-09-29 08:18:53');

-- --------------------------------------------------------

--
-- Table structure for table `d_fase_pemeliharaan`
--

CREATE TABLE `d_fase_pemeliharaan` (
  `id_fp` int(11) NOT NULL,
  `fase` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_fase_pemeliharaan`
--

INSERT INTO `d_fase_pemeliharaan` (`id_fp`, `fase`, `createdAt`, `updatedAt`) VALUES
(55, 'test', '2022-09-30 08:45:40', '2022-09-30 08:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `d_kandang`
--

CREATE TABLE `d_kandang` (
  `id_kandang` int(11) NOT NULL,
  `nama_kandang` varchar(255) NOT NULL,
  `id_blok` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_kandang`
--

INSERT INTO `d_kandang` (`id_kandang`, `nama_kandang`, `id_blok`, `createdAt`, `updatedAt`) VALUES
(109, 'test', 4, '2022-09-30 08:55:44', '2022-09-30 08:55:44');

-- --------------------------------------------------------

--
-- Table structure for table `d_kawin`
--

CREATE TABLE `d_kawin` (
  `id_kawin` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `tanggal_kawin` date NOT NULL,
  `id_pemancek` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_kesehatan`
--

CREATE TABLE `d_kesehatan` (
  `id_kesehatan` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `penyakit` int(11) NOT NULL,
  `tgl_sakit` date NOT NULL,
  `tgl_sembuh` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `d_kesehatan`
--
DELIMITER $$
CREATE TRIGGER `nama_penyakit` AFTER INSERT ON `d_kesehatan` FOR EACH ROW BEGIN
	UPDATE s_ternak SET id_penyakit = NEW.penyakit
    WHERE id_ternak = NEW.id_ternak;
 END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sembuh` AFTER INSERT ON `d_kesehatan` FOR EACH ROW BEGIN
IF NEW.penyakit < 31 THEN
UPDATE s_ternak SET status_sehat = "Sakit" WHERE id_ternak = NEW.id_ternak;
ELSEIF NEW.penyakit = 31 THEN
UPDATE s_ternak SET status_sehat = "Sembuh" 
WHERE id_ternak = NEW.id_ternak;
 END IF;
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `d_pakan`
--

CREATE TABLE `d_pakan` (
  `id_pakan` int(11) NOT NULL,
  `nama_pakan` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `komposisi` text DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_pakan`
--

INSERT INTO `d_pakan` (`id_pakan`, `nama_pakan`, `deskripsi`, `komposisi`, `jumlah`, `createdAt`, `updatedAt`) VALUES
(17, 'test2', 'test2', 'test2', 100, '2022-10-01 08:11:35', '2022-10-01 08:11:35');

-- --------------------------------------------------------

--
-- Table structure for table `d_penyakit`
--

CREATE TABLE `d_penyakit` (
  `id_penyakit` int(11) NOT NULL,
  `nama_penyakit` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `ciri_penyakit` text DEFAULT NULL,
  `pengobatan` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_penyakit`
--

INSERT INTO `d_penyakit` (`id_penyakit`, `nama_penyakit`, `deskripsi`, `ciri_penyakit`, `pengobatan`, `createdAt`, `updatedAt`) VALUES
(42, 'test2', 'test2', 'test2', 'test2', '2022-10-01 08:19:49', '2022-10-01 08:19:49');

-- --------------------------------------------------------

--
-- Table structure for table `d_status_keluar`
--

CREATE TABLE `d_status_keluar` (
  `id_status_keluar` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_timbangan`
--

CREATE TABLE `d_timbangan` (
  `id_timbangan` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `rf_id` varchar(255) NOT NULL,
  `berat_berkala` float NOT NULL,
  `suhu_berkala` float NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `d_timbangan`
--
DELIMITER $$
CREATE TRIGGER `berat_masuk` AFTER INSERT ON `d_timbangan` FOR EACH ROW BEGIN
	UPDATE s_ternak SET berat_berkala = NEW.berat_berkala, suhu_berkala = NEW.suhu_berkala
    WHERE id_ternak = NEW.id_ternak;
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `d_varietas`
--

CREATE TABLE `d_varietas` (
  `id_varietas` int(11) NOT NULL,
  `nama_varietas` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_varietas`
--

INSERT INTO `d_varietas` (`id_varietas`, `nama_varietas`, `createdAt`, `updatedAt`) VALUES
(46, 'test3', '2022-10-01 08:29:48', '2022-10-01 08:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `req_to_employee`
--

CREATE TABLE `req_to_employee` (
  `id_req` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `status` enum('waiting','accepted','rejected') NOT NULL DEFAULT 'waiting',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `s_ternak`
--

CREATE TABLE `s_ternak` (
  `id_ternak` int(11) NOT NULL,
  `rf_id` varchar(255) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `jenis_kelamin` enum('Betina','Jantan') DEFAULT NULL,
  `id_varietas` int(11) DEFAULT NULL,
  `berat_berkala` float DEFAULT NULL,
  `suhu_berkala` float DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `id_induk` int(11) DEFAULT NULL,
  `id_pejantan` int(11) DEFAULT NULL,
  `status_sehat` enum('Sehat','Sakit') NOT NULL DEFAULT 'Sehat',
  `id_penyakit` int(11) DEFAULT NULL,
  `id_pakan` int(11) DEFAULT NULL,
  `id_fp` int(11) DEFAULT NULL,
  `id_kandang` int(11) DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `status_keluar` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_users`
--
ALTER TABLE `auth_users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- Indexes for table `d_blok_kandang`
--
ALTER TABLE `d_blok_kandang`
  ADD PRIMARY KEY (`id_blok`);

--
-- Indexes for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  ADD PRIMARY KEY (`id_fp`);

--
-- Indexes for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD PRIMARY KEY (`id_kandang`),
  ADD KEY `id_blog_kandang` (`id_blok`),
  ADD KEY `id_blog` (`id_blok`),
  ADD KEY `id_blok` (`id_blok`);

--
-- Indexes for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD PRIMARY KEY (`id_kawin`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `id_pemancek` (`id_pemancek`);

--
-- Indexes for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  ADD PRIMARY KEY (`id_kesehatan`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `penyakit` (`penyakit`);

--
-- Indexes for table `d_pakan`
--
ALTER TABLE `d_pakan`
  ADD PRIMARY KEY (`id_pakan`);

--
-- Indexes for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  ADD PRIMARY KEY (`id_penyakit`);

--
-- Indexes for table `d_status_keluar`
--
ALTER TABLE `d_status_keluar`
  ADD PRIMARY KEY (`id_status_keluar`);

--
-- Indexes for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  ADD PRIMARY KEY (`id_timbangan`),
  ADD KEY `id_ternak` (`id_ternak`);

--
-- Indexes for table `d_varietas`
--
ALTER TABLE `d_varietas`
  ADD PRIMARY KEY (`id_varietas`);

--
-- Indexes for table `req_to_employee`
--
ALTER TABLE `req_to_employee`
  ADD PRIMARY KEY (`id_req`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `s_ternak`
--
ALTER TABLE `s_ternak`
  ADD PRIMARY KEY (`id_ternak`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_varietas` (`id_varietas`),
  ADD KEY `id_pakan` (`id_pakan`),
  ADD KEY `id_induk` (`id_induk`),
  ADD KEY `id_pejantan` (`id_pejantan`),
  ADD KEY `id_kandang` (`id_kandang`),
  ADD KEY `fase_pemeliharaan` (`id_fp`),
  ADD KEY `id_penyakit` (`id_penyakit`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_users`
--
ALTER TABLE `auth_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `d_blok_kandang`
--
ALTER TABLE `d_blok_kandang`
  MODIFY `id_blok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  MODIFY `id_fp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `d_kandang`
--
ALTER TABLE `d_kandang`
  MODIFY `id_kandang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `d_kawin`
--
ALTER TABLE `d_kawin`
  MODIFY `id_kawin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  MODIFY `id_kesehatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `d_pakan`
--
ALTER TABLE `d_pakan`
  MODIFY `id_pakan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  MODIFY `id_penyakit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `d_status_keluar`
--
ALTER TABLE `d_status_keluar`
  MODIFY `id_status_keluar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  MODIFY `id_timbangan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `d_varietas`
--
ALTER TABLE `d_varietas`
  MODIFY `id_varietas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `req_to_employee`
--
ALTER TABLE `req_to_employee`
  MODIFY `id_req` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `s_ternak`
--
ALTER TABLE `s_ternak`
  MODIFY `id_ternak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD CONSTRAINT `d_kandang_ibfk_2` FOREIGN KEY (`id_blok`) REFERENCES `d_blok_kandang` (`id_blok`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD CONSTRAINT `d_kawin_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kawin_ibfk_3` FOREIGN KEY (`id_pemancek`) REFERENCES `s_ternak` (`id_ternak`) ON UPDATE CASCADE;

--
-- Constraints for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  ADD CONSTRAINT `d_kesehatan_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kesehatan_ibfk_2` FOREIGN KEY (`penyakit`) REFERENCES `d_penyakit` (`id_penyakit`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  ADD CONSTRAINT `d_timbangan_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `req_to_employee`
--
ALTER TABLE `req_to_employee`
  ADD CONSTRAINT `req_to_employee_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `s_ternak`
--
ALTER TABLE `s_ternak`
  ADD CONSTRAINT `s_ternak_ibfk_10` FOREIGN KEY (`id_fp`) REFERENCES `d_fase_pemeliharaan` (`id_fp`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_11` FOREIGN KEY (`id_penyakit`) REFERENCES `d_penyakit` (`id_penyakit`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_12` FOREIGN KEY (`id_induk`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_13` FOREIGN KEY (`id_pejantan`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_14` FOREIGN KEY (`id_varietas`) REFERENCES `d_varietas` (`id_varietas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_15` FOREIGN KEY (`id_kandang`) REFERENCES `d_kandang` (`id_kandang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_6` FOREIGN KEY (`id_pakan`) REFERENCES `d_pakan` (`id_pakan`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_7` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
