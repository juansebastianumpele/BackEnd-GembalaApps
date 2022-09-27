-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 27, 2022 at 04:52 AM
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
  `foto` varchar(64) DEFAULT NULL,
  `nama_mitra` varchar(100) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_hp` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `level` set('Super Admin','Mitra','Non Mitra') NOT NULL DEFAULT 'Non Mitra',
  `userLastAccess` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_users`
--

INSERT INTO `auth_users` (`id_users`, `foto`, `nama_mitra`, `username`, `password`, `email`, `no_hp`, `alamat`, `level`, `userLastAccess`, `createdAt`, `updatedAt`) VALUES
(41, NULL, 'test2', 'test', '$2b$10$ugCumDoTNGV/Zai8dRPzBO8bn5E1vlzGD2mcx40eBxa5FMaLFd0Oi', 'test@test.com', 'isbfuwq', 'wqind', 'Non Mitra', NULL, '2022-09-27 01:15:27', '2022-09-27 01:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `d_blok_kandang`
--

CREATE TABLE `d_blok_kandang` (
  `id_blok` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `blok` varchar(255) NOT NULL,
  `createdAd` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_blok_kandang`
--

INSERT INTO `d_blok_kandang` (`id_blok`, `id_users`, `blok`, `createdAd`, `updatedAt`) VALUES
(3, 41, 'test', '2022-09-27 02:03:45', '2022-09-27 02:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `d_detail_penjualan`
--

CREATE TABLE `d_detail_penjualan` (
  `id_detail` int(6) NOT NULL,
  `id_penjualan` int(6) NOT NULL,
  `id_ternak` int(6) NOT NULL,
  `berat` float NOT NULL,
  `harga` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_fase_pemeliharaan`
--

CREATE TABLE `d_fase_pemeliharaan` (
  `id_fp` int(6) NOT NULL,
  `id_users` int(11) NOT NULL,
  `fase` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_kandang`
--

CREATE TABLE `d_kandang` (
  `id_kandang` int(6) NOT NULL,
  `id_users` int(6) NOT NULL,
  `nama_kandang` varchar(50) NOT NULL,
  `id_blok` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_kandang`
--

INSERT INTO `d_kandang` (`id_kandang`, `id_users`, `nama_kandang`, `id_blok`) VALUES
(107, 41, 'test', 3);

-- --------------------------------------------------------

--
-- Table structure for table `d_kawin`
--

CREATE TABLE `d_kawin` (
  `id_kawin` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `tanggal_kawin` date NOT NULL,
  `id_pemancek` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_keranjang`
--

CREATE TABLE `d_keranjang` (
  `id_keranjang` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_ternak_for_sale` int(11) NOT NULL
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
  `id_pakan` int(6) NOT NULL,
  `id_users` int(6) NOT NULL,
  `nama_pakan` varchar(50) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `komposisi` text DEFAULT NULL,
  `jumlah` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_pakan`
--

INSERT INTO `d_pakan` (`id_pakan`, `id_users`, `nama_pakan`, `deskripsi`, `komposisi`, `jumlah`, `createdAt`, `updatedAt`) VALUES
(15, 41, 'test3', 'test2', 'test2', '100', '2022-09-27 02:16:13', '2022-09-27 02:41:01');

-- --------------------------------------------------------

--
-- Table structure for table `d_penyakit`
--

CREATE TABLE `d_penyakit` (
  `id_penyakit` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `nama_penyakit` varchar(255) NOT NULL,
  `deskripsi` varchar(500) DEFAULT NULL,
  `ciri_penyakit` varchar(500) DEFAULT NULL,
  `pengobatan` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_penyakit`
--

INSERT INTO `d_penyakit` (`id_penyakit`, `id_users`, `nama_penyakit`, `deskripsi`, `ciri_penyakit`, `pengobatan`, `createdAt`, `updatedAt`) VALUES
(40, 41, 'test3', 'test2', 'test2', 'test2', '2022-09-27 02:15:53', '2022-09-27 02:50:37'),
(41, 41, 'test2', 'test2', 'test2', 'test2', '2022-09-27 02:49:31', '2022-09-27 02:49:31');

-- --------------------------------------------------------

--
-- Table structure for table `d_status_keluar`
--

CREATE TABLE `d_status_keluar` (
  `id_status_keluar` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_ternak_for_sale`
--

CREATE TABLE `d_ternak_for_sale` (
  `id_ternak_for_sale` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `harga_per` enum('kg','ekor') NOT NULL,
  `harga` int(11) NOT NULL,
  `harga_total` decimal(10,0) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_timbangan`
--

CREATE TABLE `d_timbangan` (
  `id_timbangan` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `rf_id` varchar(60) NOT NULL,
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
-- Table structure for table `d_transaksi`
--

CREATE TABLE `d_transaksi` (
  `id_penjualan` int(6) NOT NULL,
  `id_pembeli` int(6) NOT NULL,
  `id_penjual` int(6) NOT NULL,
  `id_ternak` int(6) NOT NULL,
  `tgl_penjualan` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_berat` float NOT NULL,
  `total_harga` decimal(10,0) NOT NULL,
  `status` set('Diproses','Ditolak','Menunggu Pembayaran','Menunggu Konfirmasi','Selesai') NOT NULL,
  `bukti_transfer` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_varietas`
--

CREATE TABLE `d_varietas` (
  `id_varietas` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `nama_varietas` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_varietas`
--

INSERT INTO `d_varietas` (`id_varietas`, `id_users`, `nama_varietas`, `createdAt`, `updatedAt`) VALUES
(45, 41, 'test', '2022-09-27 02:15:20', '2022-09-27 02:15:20');

-- --------------------------------------------------------

--
-- Table structure for table `s_ternak`
--

CREATE TABLE `s_ternak` (
  `id_ternak` int(11) NOT NULL,
  `rf_id` varchar(60) DEFAULT NULL,
  `id_users` int(11) DEFAULT NULL,
  `foto` varchar(64) DEFAULT NULL,
  `jenis_kelamin` enum('Betina','Jantan') NOT NULL,
  `id_varietas` int(11) NOT NULL,
  `berat_berkala` float NOT NULL,
  `suhu_berkala` float NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tanggal_masuk` datetime NOT NULL,
  `id_induk` int(11) DEFAULT NULL,
  `id_pejantan` int(11) DEFAULT NULL,
  `status_sehat` enum('Sehat','Sakit','Sembuh') NOT NULL DEFAULT 'Sehat',
  `id_penyakit` int(11) DEFAULT NULL,
  `id_pakan` int(11) DEFAULT NULL,
  `fase_pemeliharaan` int(11) DEFAULT NULL,
  `id_kandang` int(11) DEFAULT NULL,
  `tanggal_keluar` datetime DEFAULT NULL,
  `status_keluar` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `s_ternak`
--

INSERT INTO `s_ternak` (`id_ternak`, `rf_id`, `id_users`, `foto`, `jenis_kelamin`, `id_varietas`, `berat_berkala`, `suhu_berkala`, `tanggal_lahir`, `tanggal_masuk`, `id_induk`, `id_pejantan`, `status_sehat`, `id_penyakit`, `id_pakan`, `fase_pemeliharaan`, `id_kandang`, `tanggal_keluar`, `status_keluar`, `createdAt`, `updatedAt`) VALUES
(301, 'test', 41, 'test', 'Betina', 45, 10, 10, '2022-09-27', '2022-09-27 04:21:55', NULL, NULL, 'Sehat', NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-27 02:23:14', '2022-09-27 02:23:14'),
(302, 'test2', 41, 'test', 'Jantan', 45, 10, 10, '2022-09-27', '2022-09-27 04:21:55', NULL, NULL, 'Sehat', NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-27 02:23:14', '2022-09-27 02:23:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_users`
--
ALTER TABLE `auth_users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `no_hp` (`no_hp`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_2` (`email`,`no_hp`,`username`) USING BTREE;

--
-- Indexes for table `d_blok_kandang`
--
ALTER TABLE `d_blok_kandang`
  ADD PRIMARY KEY (`id_blok`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_detail_penjualan`
--
ALTER TABLE `d_detail_penjualan`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `id_penjualan` (`id_penjualan`);

--
-- Indexes for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  ADD PRIMARY KEY (`id_fp`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD PRIMARY KEY (`id_kandang`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_blog_kandang` (`id_blok`),
  ADD KEY `id_blog` (`id_blok`),
  ADD KEY `id_blok` (`id_blok`);

--
-- Indexes for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD PRIMARY KEY (`id_kawin`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_pemancek` (`id_pemancek`);

--
-- Indexes for table `d_keranjang`
--
ALTER TABLE `d_keranjang`
  ADD PRIMARY KEY (`id_keranjang`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_ternak_for_sale` (`id_ternak_for_sale`);

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
  ADD PRIMARY KEY (`id_pakan`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  ADD PRIMARY KEY (`id_penyakit`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_status_keluar`
--
ALTER TABLE `d_status_keluar`
  ADD PRIMARY KEY (`id_status_keluar`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_ternak_for_sale`
--
ALTER TABLE `d_ternak_for_sale`
  ADD PRIMARY KEY (`id_ternak_for_sale`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  ADD PRIMARY KEY (`id_timbangan`),
  ADD KEY `id_ternak` (`id_ternak`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_transaksi`
--
ALTER TABLE `d_transaksi`
  ADD PRIMARY KEY (`id_penjualan`),
  ADD KEY `id_users` (`id_penjual`),
  ADD KEY `id_pembeli` (`id_pembeli`);

--
-- Indexes for table `d_varietas`
--
ALTER TABLE `d_varietas`
  ADD PRIMARY KEY (`id_varietas`),
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
  ADD KEY `fase_pemeliharaan` (`fase_pemeliharaan`),
  ADD KEY `id_penyakit` (`id_penyakit`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_users`
--
ALTER TABLE `auth_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `d_blok_kandang`
--
ALTER TABLE `d_blok_kandang`
  MODIFY `id_blok` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `d_detail_penjualan`
--
ALTER TABLE `d_detail_penjualan`
  MODIFY `id_detail` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  MODIFY `id_fp` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `d_kandang`
--
ALTER TABLE `d_kandang`
  MODIFY `id_kandang` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `d_kawin`
--
ALTER TABLE `d_kawin`
  MODIFY `id_kawin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  MODIFY `id_kesehatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `d_pakan`
--
ALTER TABLE `d_pakan`
  MODIFY `id_pakan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  MODIFY `id_penyakit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `d_status_keluar`
--
ALTER TABLE `d_status_keluar`
  MODIFY `id_status_keluar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_ternak_for_sale`
--
ALTER TABLE `d_ternak_for_sale`
  MODIFY `id_ternak_for_sale` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  MODIFY `id_timbangan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `d_transaksi`
--
ALTER TABLE `d_transaksi`
  MODIFY `id_penjualan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `d_varietas`
--
ALTER TABLE `d_varietas`
  MODIFY `id_varietas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `s_ternak`
--
ALTER TABLE `s_ternak`
  MODIFY `id_ternak` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `d_blok_kandang`
--
ALTER TABLE `d_blok_kandang`
  ADD CONSTRAINT `d_blok_kandang_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_detail_penjualan`
--
ALTER TABLE `d_detail_penjualan`
  ADD CONSTRAINT `d_detail_penjualan_ibfk_1` FOREIGN KEY (`id_penjualan`) REFERENCES `d_transaksi` (`id_penjualan`);

--
-- Constraints for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  ADD CONSTRAINT `d_fase_pemeliharaan_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD CONSTRAINT `d_kandang_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kandang_ibfk_2` FOREIGN KEY (`id_blok`) REFERENCES `d_blok_kandang` (`id_blok`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD CONSTRAINT `d_kawin_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kawin_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kawin_ibfk_3` FOREIGN KEY (`id_pemancek`) REFERENCES `s_ternak` (`id_ternak`) ON UPDATE CASCADE;

--
-- Constraints for table `d_keranjang`
--
ALTER TABLE `d_keranjang`
  ADD CONSTRAINT `d_keranjang_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_keranjang_ibfk_2` FOREIGN KEY (`id_ternak_for_sale`) REFERENCES `d_ternak_for_sale` (`id_ternak_for_sale`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  ADD CONSTRAINT `d_kesehatan_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_kesehatan_ibfk_2` FOREIGN KEY (`penyakit`) REFERENCES `d_penyakit` (`id_penyakit`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_pakan`
--
ALTER TABLE `d_pakan`
  ADD CONSTRAINT `d_pakan_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  ADD CONSTRAINT `d_penyakit_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_status_keluar`
--
ALTER TABLE `d_status_keluar`
  ADD CONSTRAINT `d_status_keluar_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_ternak_for_sale`
--
ALTER TABLE `d_ternak_for_sale`
  ADD CONSTRAINT `d_ternak_for_sale_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_ternak_for_sale_ibfk_2` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  ADD CONSTRAINT `d_timbangan_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_timbangan_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_transaksi`
--
ALTER TABLE `d_transaksi`
  ADD CONSTRAINT `d_transaksi_ibfk_1` FOREIGN KEY (`id_penjual`) REFERENCES `auth_users` (`id_users`),
  ADD CONSTRAINT `d_transaksi_ibfk_3` FOREIGN KEY (`id_pembeli`) REFERENCES `auth_users` (`id_users`);

--
-- Constraints for table `d_varietas`
--
ALTER TABLE `d_varietas`
  ADD CONSTRAINT `d_varietas_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `s_ternak`
--
ALTER TABLE `s_ternak`
  ADD CONSTRAINT `s_ternak_ibfk_10` FOREIGN KEY (`fase_pemeliharaan`) REFERENCES `d_fase_pemeliharaan` (`id_fp`) ON DELETE SET NULL ON UPDATE CASCADE,
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
