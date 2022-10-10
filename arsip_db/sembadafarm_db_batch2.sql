-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2022 at 07:35 AM
-- Server version: 10.4.24-MariaDB-log
-- PHP Version: 8.0.22

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
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_users`
--

INSERT INTO `auth_users` (`id_users`, `foto`, `nama_mitra`, `username`, `password`, `email`, `no_hp`, `alamat`, `level`, `userLastAccess`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Sembada', 'sembada02', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'sembada@gmail.com', '1', '', 'Super Admin', '2022-09-28 12:05:08', '2022-04-04 15:30:52', '2022-04-04 15:30:52'),
(10, '1654699590130_0a0b4362f6a04668581f7f1b41f0ad15', 'Sembada Farm', '02', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'dian@gmail.com', '082132501111', 'Banyuwangi', 'Mitra', '2022-10-06 07:23:52', NULL, NULL),
(30, NULL, 'wisnu putra wardana', 'whisky', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'wisnupw7@gmail.com', '081249122477', 'Banyuwangi, Jawa Timur', 'Non Mitra', '2022-09-27 09:39:11', NULL, NULL),
(31, NULL, 'Wiyanto ', 'wiyanto', 'd2e5161ea242999893736b0bab59f787cd2fcdd2acd69c51f0862b8dad9a0371', 'wiyanto419@gmail.com', '08386033827', 'Boyolali', 'Non Mitra', '2022-06-08 05:31:52', NULL, NULL),
(32, NULL, 'sembadafarm', 'sembadafarm', 'dbdcb9c2a9cd6e99baab68629b1524faa82b4563ac7936c798f88c0c18b914ba', 'sgembalamuda@gmail.com', '081234575820', 'Selomartani Kalasan Sleman', 'Non Mitra', NULL, NULL, NULL),
(33, NULL, 'Muhammad Fauzi Hanif', 'muhammadhanif010', '80c1826ac4d9c21137d6fa4cc826c99e05e2df7e762ee64df18d076b21da0713', 'muhammad.hanif010@binus.ac.id', '+971588236074', 'Yogyakarta', 'Non Mitra', '2022-09-20 04:57:49', NULL, NULL),
(36, NULL, 'Dian', 'dian', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'dian1@gmail.com', '0813838874738', 'probolinggo', 'Non Mitra', '2022-09-20 02:02:09', NULL, NULL),
(37, NULL, 'dian', 'dian1', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'diansyang@gmail.com', '01828237997', 'probolinggo', 'Non Mitra', '2022-09-30 04:25:30', NULL, NULL),
(38, NULL, 'Buat Akun', 'buatakun', '83b9a6c39c7e61704942e5cc118b29e3435096fae1e44a95c125175a724e8f50', 'buatakun', 'buatakun', 'buatakun', 'Non Mitra', '2022-09-20 07:49:20', NULL, NULL),
(39, NULL, 'test', 'test4', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'test@gmail.com', '089824873', 'test', 'Non Mitra', NULL, NULL, NULL),
(40, NULL, 'test2', 'test2', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'test2@gmail.com', 'test', 'test', 'Non Mitra', '2022-09-23 03:58:49', NULL, NULL),
(43, NULL, 'Liaaa', 'WisnuAbc', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'wisnu@gmail.com', '0812345678', 'Banyuwangi aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'Mitra', NULL, NULL, NULL),
(49, NULL, 'Dian', 'dian111', '9f35d680a485420f674852a2279aed9a7b0e130b0ad56a525f595b43b14e8b70', 'dian132@gmail.com', '088888888', 'probolinggo', 'Mitra', NULL, NULL, NULL);

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
  `fase` varchar(30) NOT NULL,
  `jumlah` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_fase_pemeliharaan`
--

INSERT INTO `d_fase_pemeliharaan` (`id_fp`, `fase`, `jumlah`) VALUES
(1, 'Cempe', 0),
(2, 'Fattening', 0),
(3, 'Pejantan Lepas Sapih', 0),
(4, 'Pejantan', 0),
(5, 'Betina Lepas Sapih', 0),
(6, 'Induk', 0),
(7, 'Bunting 1', 0),
(8, 'Laktasi 1', 0),
(9, 'Afkir', 0),
(34, 'Bunting 2', 0),
(35, 'Bunting 3', 0),
(36, 'Laktasi 2', 0),
(37, 'Laktasi 3', 0),
(38, 'Belum Bunting 1', 0),
(39, 'Belum Bunting 2', 0),
(40, 'Belum Bunting 3', 0),
(41, 'Abortus 1', 0),
(42, 'Abortus 2', 0),
(43, 'Abortus 3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `d_harga`
--

CREATE TABLE `d_harga` (
  `id_harga` int(6) NOT NULL,
  `bobot_awal` float NOT NULL,
  `bobot_akhir` float NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_harga`
--

INSERT INTO `d_harga` (`id_harga`, `bobot_awal`, `bobot_akhir`, `harga`) VALUES
(1, 19, 22, 52000),
(2, 23, 28, 55000),
(3, 27, 30, 70000),
(4, 31, 34, 75000);

-- --------------------------------------------------------

--
-- Table structure for table `d_kandang`
--

CREATE TABLE `d_kandang` (
  `id_kandang` int(6) NOT NULL,
  `id_users` int(6) NOT NULL,
  `nama_kandang` varchar(50) NOT NULL,
  `blok_kandang` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_kandang`
--

INSERT INTO `d_kandang` (`id_kandang`, `id_users`, `nama_kandang`, `blok_kandang`) VALUES
(1, 10, 'Kawin', 'T1'),
(2, 10, 'Bunting', 'T1'),
(3, 10, 'Cempe', 'T1'),
(4, 10, 'Pejantan', 'T2'),
(16, 33, 'Kandang Mandang', 'S2'),
(25, 10, 'Test', 'T7'),
(26, 30, 'test', 'ya'),
(27, 10, 'bunting', 'T2');

-- --------------------------------------------------------

--
-- Table structure for table `d_kawin`
--

CREATE TABLE `d_kawin` (
  `id_kawin` int(6) NOT NULL,
  `id_ternak` int(6) NOT NULL,
  `tanggal_kawin` date NOT NULL,
  `id_pemancek` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_kawin`
--

INSERT INTO `d_kawin` (`id_kawin`, `id_ternak`, `tanggal_kawin`, `id_pemancek`) VALUES
(15, 214, '2022-06-21', '2'),
(16, 215, '2022-06-07', '3'),
(17, 170, '2022-09-20', '5'),
(18, 180, '2022-09-21', '5'),
(19, 170, '2022-09-22', '7'),
(20, 170, '2022-10-03', '2');

-- --------------------------------------------------------

--
-- Table structure for table `d_kesehatan`
--

CREATE TABLE `d_kesehatan` (
  `id_kesehatan` int(6) NOT NULL,
  `id_ternak` int(11) NOT NULL,
  `penyakit` int(6) DEFAULT NULL,
  `tgl_sakit` timestamp NULL DEFAULT NULL,
  `tgl_sembuh` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_kesehatan`
--

INSERT INTO `d_kesehatan` (`id_kesehatan`, `id_ternak`, `penyakit`, `tgl_sakit`, `tgl_sembuh`) VALUES
(32, 279, 4, '2022-03-22 17:58:07', NULL),
(33, 286, 4, '2022-03-30 18:02:37', '2022-04-26'),
(34, 288, 4, '2022-03-30 18:04:13', NULL),
(35, 173, 4, '2022-03-22 18:05:08', NULL),
(36, 220, 2, '2022-05-10 18:13:03', NULL),
(37, 239, 4, '2022-03-30 18:13:51', NULL),
(38, 234, 4, '2022-03-30 18:14:58', NULL),
(39, 261, 3, '2022-04-10 18:15:53', NULL),
(40, 264, 3, '2022-04-10 18:16:51', NULL),
(41, 275, 4, '2022-05-08 18:17:23', NULL),
(42, 189, 1, '2022-05-09 18:18:42', NULL),
(43, 224, 1, '2022-05-09 18:20:33', NULL),
(44, 246, 4, '2022-05-06 18:21:40', NULL),
(45, 246, 2, '2022-04-27 18:25:16', NULL),
(46, 182, 1, '2022-05-08 19:21:51', NULL),
(74, 286, 31, NULL, '2022-06-08'),
(75, 285, 3, '2022-06-09 00:48:39', NULL),
(76, 285, 2, '2022-06-09 01:23:01', NULL),
(77, 285, 3, '2022-06-09 01:23:58', NULL),
(78, 285, 3, '2022-06-09 01:24:58', NULL),
(79, 285, 3, '2022-06-09 01:25:05', NULL),
(80, 285, 2, '2022-06-14 04:52:06', NULL);

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
  `jumlah` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_pakan`
--

INSERT INTO `d_pakan` (`id_pakan`, `id_users`, `nama_pakan`, `deskripsi`, `komposisi`, `jumlah`) VALUES
(1, 10, 'Rumput Pakchong', 'Hijauan', 'Pakchong', '5 Kg'),
(2, 10, 'Konsentrat', 'Sumber Energi, Sumber Protein', 'Jagung, Bungkil Kedelai, Pongkol, Onggok', '30 Kg'),
(3, 10, 'Complete Feed', 'Pakan Komplit', 'Hijauan Rumput Segar, Konsentrat', 'N/A'),
(4, 10, 'Silase', 'Hijauan Fermentasi', 'Pakchong', 'N/A'),
(7, 10, 'Susu', 'Susu Formula', 'Susu Bubuk', 'N/A'),
(12, 30, '12', '12', '12', '12');

-- --------------------------------------------------------

--
-- Table structure for table `d_penjualan`
--

CREATE TABLE `d_penjualan` (
  `id_penjualan` int(6) NOT NULL,
  `id_pembeli` int(6) NOT NULL,
  `id_penjual` int(6) NOT NULL,
  `id_ternak` int(6) NOT NULL,
  `tgl_penjualan` date NOT NULL,
  `total_berat` float NOT NULL,
  `total_harga` decimal(30,0) NOT NULL,
  `status` set('Diproses','Ditolak','Menunggu Pembayaran','Menunggu Konfirmasi','Selesai') NOT NULL,
  `bukti_transfer` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_penyakit`
--

CREATE TABLE `d_penyakit` (
  `id_penyakit` int(6) NOT NULL,
  `nama_penyakit` varchar(50) NOT NULL,
  `deskripsi` varchar(500) DEFAULT NULL,
  `ciri_penyakit` varchar(500) DEFAULT NULL,
  `pengobatan` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_penyakit`
--

INSERT INTO `d_penyakit` (`id_penyakit`, `nama_penyakit`, `deskripsi`, `ciri_penyakit`, `pengobatan`) VALUES
(1, 'Diare', 'masalah gangguan pencernaan pada domba yang ditandai dengan kotoran domba yang menggumpal seperti kotoran sapi', 'Feses domba diare biasanya juga disertai darah, lendir dan bau yang tidak sedap', 'pemberian obat diare, pemberian obat herbal'),
(2, 'Kembung', 'Kondisi dimana terjadinya penimbunan gas yang berlebih pada perut', 'Perut yang membesar dan menonjol keluar dan berisi gas', 'Trocar (coblos perut domba), pemberian obat'),
(3, 'ORF', 'Peradangan pada bagian mulut dan hidung yang diakibatkan oleh infeksi virus Parapox', 'Iritasi berwarna kemerahan pada bagian mulut dan hidung, domba tidak nafsu makan', 'Pemberian obat spray, pengobatan salep dan sanitasi bagian tubuh yang terinfeksi '),
(4, 'Pink Eye', 'Pink eye adalah penyakit mata menular pada ternak. Gejala klinis yang dapat dikenali berupa kemerahan  dan peradangan pada konjungtiva serta kekeruhan pada kornea. Iritasi pada mata ternak', 'mata merah berair hingga kornea mata dapat berubah warna menjadi putih', 'Pemberian obat salep dan rutin membersihkan area mata'),
(5, 'Scabies', 'Penyakit kulit pada ternak', 'terdapat eksim pada kulit ternak dan ternak merasa tidak nyaman', 'Obat semprot dan suntik'),
(6, 'Mastitis', 'Peradangan pada ambing dan puting susu', 'gejala pembengkakan, pengerasan ambing, rasa sakit, panas, serta kemerahan bahkan sampai terjadi penurunan fungsi ambing', 'Obat suntik mastitis'),
(7, 'Asidosis', 'Penyakit pencernaan dimana kondisi perut terlalu asam', 'Lesu, tidak mampu berdiri, suhu tubuh kurang normal, menurunnya nafsu makan, feses berair, denyut jantung terasa lemah dan lebih cepat.', 'Pemberian cairan ber pH 8+'),
(8, 'Cacingan', 'Penyakit pencernaan akibat infeksi cacing pada saluran pencernaan domba', 'kurus seperti berat badan tidak sesuai umur, bulu agak berdiri dan kusam, sembelit atau kotoran lembek sampai mencret sehingga kandang cepat kotor, terlihat lesu dan pucat serta nafsu makan berkurang,', 'Pemberian obat cacing'),
(10, 'Ngorok', 'penyakti menular terutama pada ruminansia  yang disebabkan oleh pasteurella multocida.', 'Gangguan pernapasan, sesak napas, suara ngorok dengan gigi gemeretak', 'Suntik antibiotik'),
(11, 'Radang Pusar', 'Pembengkakan pada pusar domba saat baru lahir', 'Pembengkakan disekitar pusar', 'Penggunaan antibiotik'),
(12, 'Prolapsus', 'Keluarnya sebagian organ uterus yang terjadi waktu kelahiran', 'Keluarnya sebagian organ uterus yang terjadi waktu kelahiran', 'Pengembalian organ ke posisi semula'),
(13, 'Distokia', 'Gangguan dalam proses kelahiran atau partus berupa kesulitan dan ketidakmampuan pada fase pertama dan fase kedua untuk mengeluarkan fetus atau terjadi perpanjangan periode kelahiran (diatas 8 jam), sehingga induk membutuhkan pertolongan tenaga ahli untuk mengeluarkan fetus.', 'ambing (penghasil susu) membengkak meneteskan kolostrum, kelamin betina bengkak mengeluarkan lendir, merejan dan posisi badan membungkuk, sulit mengeluarkan anak.', 'Pengobatan distokia harus dikonsultasikan dan ditangani oleh dokter hewan atau tenaga medis veteriner. Mengembalikan posisi anak pada posisi normal dengan cara didorong, diputar dan ditarik.'),
(14, 'Artritis', 'gangguan atau peradangan pada persendian dan kartilago', 'pembengkakan pada persendian, pincang yang menyebabkan tidak bisa berdiri', 'pemberian obat anti inflamasi nonsteroid'),
(15, 'Miasis', 'Penyakit masuknya larva serangga kedalam tubuh', 'Terdapat luka yang mengeluarkan lendir dan nanah, suhu tubuh meningkat', 'Membersihkan luka hingga bersih dari larva serangga, pemberian antibiotik'),
(16, 'Busuk Kuku', 'Penyakit yang disebabkan oleh kandang yang basah dan kotor sehingga domba menginjak genangan air dan kuku menjadi lunak dan terjadi pembusukan', 'Kuku bengkak dan busuk', 'Pemotongan kuku kemudian diberi antiseptik ex: formaldehid 10-20%. Kemudian diberi salep sulfatizol dan perban bagian kuku yang busuk'),
(17, 'Radang paha', 'Penyakit yang sering terjadi pada domba usia 6 bulan.', 'kematian mendadak, kaki pincang, lesu, demam singkat, nafsu makan menurun, ngorok beberapa jam sebelum mati.', 'Pemberian antibiotik'),
(18, 'Tuberkulosis', 'adanya pembentukan granuloma (tuberkel) di beberapa organ terutama paru-paru, hati dan ginjal', 'pembentukan granuloma (tuberkel) di beberapa organ terutama paru-paru, hati dan ginjal', ''),
(19, 'Leptospirosis', 'Gangguan pada saluran reproduksi', 'ternak lesu, demam, anemia, kencing darah, penyakit kuning, ternak betina akan keguguran, penurunan produksi susu, susu berwarna kekuningan, terjadi meningitis.', 'pemberian antibiotik streptomisin atau oksitetrasiklin'),
(20, 'Tetanus', 'Penyakiti ini memiliki tingkat kematian yang tinggi (80%)', 'malas, kaku, sukar berjalan dan menelan, kepala sering digerakkan ke belakang dan ke samping, kejang-kejang', 'pemberian antibiotik penisilin dan othrisin dengan cara injeksi'),
(21, 'Piroplasmosis', 'Penyakit yang diakibatkan oleh protozoa yang mengiinfeksi sel darah merah', 'demam tinggi, nafsu makan berkurang, selaput lendir mulut dan mata pucat kekuningan, pernapasan cepat, kencing darah, diare, kurus', 'acaprin, acriflavin, trypaflavin, imidocarb'),
(22, 'Anaplasmosis', 'Penyakit yang disebabkan oleh Anaplasma centrale dan Anaplasma marginale.', 'gejala timbul 30-40 hari setelah terinfeksi; demam, selaput lendir mulut dan mata pucat, produksi susu menurun, dehidrasi, konstipasi, kematian dalam waktu 2-3 hari', 'aricyl, paludrine, sodiym cacodilate, mercurochrome, penyuntikan antibiotik terramisin atau chlortetrasiklin'),
(23, 'Coccidiosis', 'Penyakit yang disebabkan oleh kelompok protozoa dari genus Eimeria dan Isospora', 'diare, dengan mucus atau darah, dehidrasi, lemah, dehidrasi dan mati', 'Pemberian antibiotik'),
(24, 'Aktinomikosis/rahang bengkak', 'Penyakit yang disebabkan oleh bakteri spesies Actinomyces seperti Actinomyces israelii atau gerencseriae A', 'Ternak lesu, demam, sukar makan', 'Pemberian natrium iodida untuk hewan terinfeksi secara oral.'),
(25, 'Cacing Hati', 'Hidup di dalam hati dan saluran empedu', 'nafsu makan turun, ternak malas, kurus', 'per oral albendazole, dosis pemberian 10-20 mg/kg berat badan namun obat ini dilarang digunakna pada 1/3 pertama kebuntingan karena menyebabkan abortus.'),
(26, 'Ascariasis', 'Infeksi tubuh oleh cacing ascaris', 'diare, kurus, lemah, perut buncit, pertumbuhan terhambat, kulit kering', 'pemberian piperazine'),
(27, 'Kutil', 'Penyakit kulit pada ternak', 'Bovine papilomavirus type BPV-1, BPV-2, BPV-5, kontaminasi kandang, penggunaan peralatan kandang seperti suntik yang berulang', 'Permukaan kulit muncul tumor kasar seperti bunga kol'),
(28, 'Brucellosis', 'keguguran dan kemandulan akibat bakteri', 'keguguran pada usia 4 bulan', ''),
(29, 'Vibriosis', 'penyakit kelamin yang menular melalui proses kopulasi (kawin alami) maupun inseminasi buatan jika semen yang digunakan berasal dari ternak yang sakit', 'kegagalan perkawinan, betina estrus setelah 3-5 bulan dan hanya 30% yang berhasil bunting, keguguran pada usia kebuntingan 5 bulan', 'Antibiotik streptomisin, penisilin, dan demitridasol'),
(30, 'Akabane', 'Akabane adalah penyakit menular non contagious yang disebabkan oleh virus dan ditandai dengan adanya Arthrogryposis (AG) disertai atau tanpa Hydraencephaly (HE). Hewan yang peka adalah sapi, domba dan kambing. Kerugian yang diakibatkan oleh penyakit Akabane ialah keguguran, mumifi kasi fetus dan kelahiran cacat.', 'keguguran, mumifikasi fetus, kelahiran cacat', ''),
(31, 'Sembuh', 'Alhamdulillah udah sembuh :)', '', ''),
(32, 'Tidak Ada', 'Alhamdulillah Sehat :))', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `d_timbangan`
--

CREATE TABLE `d_timbangan` (
  `id_timbangan` int(6) NOT NULL,
  `id_ternak` int(6) NOT NULL,
  `rf_id` varchar(60) NOT NULL,
  `berat_berkala` float NOT NULL,
  `suhu_berkala` float NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_timbangan`
--

INSERT INTO `d_timbangan` (`id_timbangan`, `id_ternak`, `rf_id`, `berat_berkala`, `suhu_berkala`, `tanggal`) VALUES
(110, 170, '', 36, 35, '2022-06-07 16:29:00'),
(121, 170, '12345678', 39, 35, '2022-06-07 15:32:46'),
(122, 286, '00e2001a8319132185066ee079ff', 45.09, 35.82, '2022-06-08 03:40:49'),
(123, 286, '00e2001a8319132185066ee079ff', 100.63, 35.47, '2022-06-08 03:42:28'),
(124, 286, '00e2001a8319132185066ee079ff', 72.93, 35.81, '2022-06-08 03:44:00'),
(125, 286, '00e2001a8319132185066ee079ff', 0.14, 35.03, '2022-06-08 03:44:50'),
(126, 286, '00e2001a8319132185066ee079ff', 0.81, 35.59, '2022-06-08 05:54:47'),
(127, 286, '00e2001a8319132185066ee079ff', 91.52, 35.8, '2022-06-08 08:49:30'),
(128, 285, '00e2001a8319132187066ea05dff', 32.8, 35, '2022-06-08 23:59:32'),
(129, 285, '00e2001a8319132187066ea05dff', 33, 35, '2022-06-08 23:59:55'),
(131, 285, '00e2001a8319132187066ea05dff', 36, 35, '2022-06-09 00:00:40'),
(132, 300, '00e2001a8319132187066ea05dff', 35, 35, '2022-06-08 13:56:49'),
(133, 285, '00e2001a8319132187066ea05dff', 37, 35, '2022-06-09 00:01:04'),
(134, 286, '00e2001a8319132185066ee079ff', 0.94, 35.08, '2022-06-08 23:45:19'),
(135, 286, '00e2001a8319132185066ee079ff', 0.94, 35, '2022-06-08 23:47:02'),
(136, 286, '', 30.94, 35, '2022-06-08 23:50:52'),
(137, 285, '00e2001a8319132186066e6071ff', 91.72, 35.21, '2022-06-09 00:47:23'),
(138, 285, '00e2001a8319132186066e6071ff', 99.21, 35.44, '2022-06-09 01:42:48'),
(139, 285, '00e2001a8319132186066e6071ff', 99.21, 35.44, '2022-06-09 01:42:54'),
(140, 285, '00e2001a8319132186066e6071ff', 103.08, 35.44, '2022-06-09 01:43:03'),
(141, 285, '00e2001a8319132186066e6071ff', 64.42, 35.53, '2022-06-09 01:44:25'),
(142, 285, '00e2001a8319132186066e6071ff', 60.83, 35.61, '2022-06-14 04:47:52'),
(143, 285, '00e2001a8319132186066e6071ff', 90.03, 35.58, '2022-06-29 02:30:44'),
(145, 285, '00e2001a8319132186066e6071ff', 10.39, 35.94, '2022-06-29 04:25:44'),
(146, 285, '00e2001a8319132186066e6071ff', 56.13, 35.85, '2022-06-29 04:26:37'),
(147, 285, '00e2001a8319132186066e6071ff', 52.6, 35.4, '2022-06-29 04:30:20'),
(148, 285, '00e2001a8319132186066e6071ff', 52.6, 35.4, '2022-06-29 04:30:23'),
(149, 285, '0', 52.6, 35.4, '2022-09-30 03:16:27'),
(150, 285, '0', 52.6, 35.4, '2022-09-30 03:16:28'),
(151, 285, '0', 52.6, 35.4, '2022-09-30 03:16:30'),
(152, 285, '0', 52.6, 35.4, '2022-09-30 03:16:31'),
(153, 285, '0', 52.6, 35.4, '2022-09-30 03:16:33'),
(154, 285, '0', 52.6, 35.4, '2022-09-30 03:16:34'),
(155, 285, '0', 52.6, 35.4, '2022-09-30 03:16:36'),
(156, 285, '0', 52.6, 35.4, '2022-09-30 03:16:37'),
(157, 285, '0', 52.6, 35.4, '2022-09-30 03:16:39'),
(158, 285, '0', 52.6, 35.4, '2022-09-30 03:16:41'),
(159, 285, '0', 52.6, 35.4, '2022-09-30 03:16:42'),
(160, 285, '0', 52.6, 35.4, '2022-09-30 03:16:44'),
(161, 285, '0', 52.6, 35.4, '2022-09-30 03:16:45'),
(162, 285, '0', 52.6, 35.4, '2022-09-30 03:16:47'),
(163, 285, '0', 52.6, 35.4, '2022-09-30 03:16:48'),
(164, 285, '0', 52.6, 35.4, '2022-09-30 03:16:50'),
(165, 285, '0', 52.6, 35.4, '2022-09-30 03:16:52'),
(166, 285, '0', 52.6, 35.4, '2022-09-30 03:16:53'),
(167, 285, '0', 52.6, 35.4, '2022-09-30 03:16:55'),
(168, 285, '0', 52.6, 35.4, '2022-09-30 03:16:56'),
(169, 285, '0', 52.6, 35.4, '2022-09-30 03:16:58'),
(170, 285, '0', 52.6, 35.4, '2022-09-30 03:16:59'),
(171, 285, '0', 52.6, 35.4, '2022-09-30 03:17:01'),
(172, 285, '0', 52.6, 35.4, '2022-09-30 03:17:03'),
(173, 285, '0', 52.6, 35.4, '2022-09-30 03:17:04'),
(174, 285, '0', 52.6, 35.4, '2022-09-30 03:17:06'),
(175, 285, '0', 52.6, 35.4, '2022-09-30 03:17:07'),
(176, 285, '0', 52.6, 35.4, '2022-09-30 03:17:09'),
(177, 285, '0', 52.6, 35.4, '2022-09-30 03:17:10'),
(178, 285, '0', 52.6, 35.4, '2022-09-30 03:17:15'),
(179, 285, '0', 52.6, 35.4, '2022-09-30 03:17:17'),
(180, 285, '0', 52.6, 35.4, '2022-09-30 03:17:18'),
(181, 285, '0', 52.6, 35.4, '2022-09-30 03:17:20'),
(182, 285, '0', 52.6, 35.4, '2022-09-30 03:17:22'),
(183, 285, '0', 52.6, 35.4, '2022-09-30 03:17:23'),
(184, 285, '0', 52.6, 35.4, '2022-09-30 03:17:25'),
(185, 285, '0', 52.6, 35.4, '2022-09-30 03:17:27'),
(186, 285, '0', 52.6, 35.4, '2022-09-30 03:17:29'),
(187, 285, '0', 52.6, 35.4, '2022-09-30 03:17:30'),
(188, 285, '0', 52.6, 35.4, '2022-09-30 03:17:32'),
(189, 285, '0', 52.6, 35.4, '2022-09-30 03:17:34'),
(190, 285, '0', 52.6, 35.4, '2022-09-30 03:17:35'),
(191, 285, '0', 52.6, 35.4, '2022-09-30 03:17:37'),
(192, 285, '0', 52.6, 35.4, '2022-09-30 03:17:39'),
(193, 285, '0', 52.6, 35.4, '2022-09-30 03:17:40'),
(194, 285, '0', 52.6, 35.4, '2022-09-30 03:17:42'),
(195, 285, '0', 52.6, 35.4, '2022-09-30 03:17:44'),
(196, 285, '0', 52.6, 35.4, '2022-09-30 03:17:46'),
(197, 285, '0', 52.6, 35.4, '2022-09-30 03:17:47'),
(198, 285, '0', 52.6, 35.4, '2022-09-30 03:17:49'),
(199, 285, '0', 52.6, 35.4, '2022-09-30 03:17:51'),
(200, 285, '0', 52.6, 35.4, '2022-09-30 03:17:53'),
(201, 285, '0', 52.6, 35.4, '2022-09-30 03:17:55'),
(202, 285, '0', 52.6, 35.4, '2022-09-30 03:17:56'),
(203, 285, '0', 52.6, 35.4, '2022-09-30 03:17:58'),
(204, 285, '0', 52.6, 35.4, '2022-09-30 03:17:59'),
(205, 285, '0', 52.6, 35.4, '2022-09-30 03:18:01'),
(206, 285, '0', 52.6, 35.4, '2022-09-30 03:18:03'),
(207, 285, '0', 52.6, 35.4, '2022-09-30 03:18:04'),
(208, 285, '0', 52.6, 35.4, '2022-09-30 03:18:06'),
(209, 285, '0', 52.6, 35.4, '2022-09-30 03:18:07'),
(210, 285, '0', 52.6, 35.4, '2022-09-30 03:18:10'),
(211, 285, '0', 52.6, 35.4, '2022-09-30 03:18:11'),
(212, 285, '0', 52.6, 35.4, '2022-09-30 03:18:13'),
(213, 285, '0', 52.6, 35.4, '2022-09-30 03:18:15'),
(214, 285, '0', 52.6, 35.4, '2022-09-30 03:18:16'),
(215, 285, '0', 52.6, 35.4, '2022-09-30 03:18:18'),
(216, 285, '0', 52.6, 35.4, '2022-09-30 03:18:20'),
(217, 285, '0', 52.6, 35.4, '2022-09-30 03:18:21'),
(218, 285, '0', 52.6, 35.4, '2022-09-30 03:18:23'),
(219, 285, '0', 52.6, 35.4, '2022-09-30 03:18:25'),
(220, 285, '0', 52.6, 35.4, '2022-09-30 03:18:26'),
(221, 285, '0', 52.6, 35.4, '2022-09-30 03:18:28'),
(222, 285, '0', 52.6, 35.4, '2022-09-30 03:18:29'),
(223, 285, '0', 52.6, 35.4, '2022-09-30 03:18:31'),
(224, 285, '0', 52.6, 35.4, '2022-09-30 03:18:32'),
(225, 285, '0', 52.6, 35.4, '2022-09-30 03:18:34'),
(226, 285, '0', 52.6, 35.4, '2022-09-30 03:18:36'),
(227, 285, '0', 52.6, 35.4, '2022-09-30 03:18:37'),
(228, 285, '0', 52.6, 35.4, '2022-09-30 03:18:39'),
(229, 285, '0', 52.6, 35.4, '2022-09-30 03:18:40'),
(230, 285, '0', 52.6, 35.4, '2022-09-30 03:18:42'),
(231, 285, '0', 52.6, 35.4, '2022-09-30 03:18:44'),
(232, 285, '0', 52.6, 35.4, '2022-09-30 03:18:45'),
(233, 285, '0', 52.6, 35.4, '2022-09-30 03:18:47'),
(234, 285, '0', 52.6, 35.4, '2022-09-30 03:18:49'),
(235, 285, '0', 52.6, 35.4, '2022-09-30 03:18:50'),
(236, 285, '0', 52.6, 35.4, '2022-09-30 03:18:52'),
(237, 285, '0', 52.6, 35.4, '2022-09-30 03:18:53'),
(238, 285, '0', 52.6, 35.4, '2022-09-30 03:18:55'),
(239, 285, '0', 52.6, 35.4, '2022-09-30 03:18:56'),
(240, 285, '0', 52.6, 35.4, '2022-09-30 03:18:58'),
(241, 285, '0', 52.6, 35.4, '2022-09-30 03:19:00'),
(242, 285, '0', 52.6, 35.4, '2022-09-30 03:19:02'),
(243, 285, '0', 52.6, 35.4, '2022-09-30 03:19:03'),
(244, 285, '0', 52.6, 35.4, '2022-09-30 03:19:05'),
(245, 285, '0', 52.6, 35.4, '2022-09-30 03:19:07'),
(246, 285, '0', 52.6, 35.4, '2022-09-30 03:19:08'),
(247, 285, '0', 52.6, 35.4, '2022-09-30 03:19:10'),
(248, 285, '0', 52.6, 35.4, '2022-09-30 03:19:12'),
(249, 285, '0', 52.6, 35.4, '2022-09-30 03:19:13'),
(250, 285, '0', 52.6, 35.4, '2022-09-30 03:19:15'),
(251, 285, '0', 52.6, 35.4, '2022-09-30 03:19:17'),
(252, 285, '0', 52.6, 35.4, '2022-09-30 03:19:18'),
(253, 285, '0', 52.6, 35.4, '2022-09-30 03:19:20'),
(254, 285, '0', 52.6, 35.4, '2022-09-30 03:19:21'),
(255, 285, '0', 52.6, 35.4, '2022-09-30 03:19:23'),
(256, 285, '0', 52.6, 35.4, '2022-09-30 03:19:25'),
(257, 285, '0', 52.6, 35.4, '2022-09-30 03:19:26'),
(258, 285, '0', 52.6, 35.4, '2022-09-30 03:19:28'),
(259, 285, '0', 52.6, 35.4, '2022-09-30 03:19:30'),
(260, 285, '0', 52.6, 35.4, '2022-09-30 03:19:32'),
(261, 285, '0', 52.6, 35.4, '2022-09-30 03:19:33'),
(262, 285, '0', 52.6, 35.4, '2022-09-30 03:19:35'),
(263, 285, '0', 52.6, 35.4, '2022-09-30 03:19:37'),
(264, 285, '0', 52.6, 35.4, '2022-09-30 03:19:38'),
(265, 285, '0', 52.6, 35.4, '2022-09-30 03:19:40'),
(266, 285, '0', 52.6, 35.4, '2022-09-30 03:19:42'),
(267, 285, '0', 52.6, 35.4, '2022-09-30 03:19:43'),
(268, 285, '0', 52.6, 35.4, '2022-09-30 03:19:45'),
(269, 285, '0', 52.6, 35.4, '2022-09-30 03:19:47'),
(270, 285, '0', 52.6, 35.4, '2022-09-30 03:19:49'),
(271, 285, '0', 52.6, 35.4, '2022-09-30 03:19:50'),
(272, 285, '0', 52.6, 35.4, '2022-09-30 03:19:52'),
(273, 285, '0', 52.6, 35.4, '2022-09-30 03:19:54'),
(274, 285, '0', 52.6, 35.4, '2022-09-30 03:19:55'),
(275, 285, '0', 52.6, 35.4, '2022-09-30 03:19:57'),
(276, 285, '0', 52.6, 35.4, '2022-09-30 03:19:59'),
(277, 285, '0', 52.6, 35.4, '2022-09-30 03:20:00'),
(278, 285, '0', 52.6, 35.4, '2022-09-30 03:20:02'),
(279, 285, '0', 52.6, 35.4, '2022-09-30 03:20:04'),
(280, 285, '0', 52.6, 35.4, '2022-09-30 03:20:06'),
(281, 285, '0', 52.6, 35.4, '2022-09-30 03:20:07'),
(282, 285, '0', 52.6, 35.4, '2022-09-30 03:20:09'),
(283, 285, '0', 52.6, 35.4, '2022-09-30 03:20:11'),
(284, 285, '0', 52.6, 35.4, '2022-09-30 03:20:12'),
(285, 285, '0', 52.6, 35.4, '2022-09-30 03:20:14'),
(286, 285, '0', 52.6, 35.4, '2022-09-30 03:20:15'),
(287, 285, '0', 52.6, 35.4, '2022-09-30 03:20:17'),
(288, 285, '0', 52.6, 35.4, '2022-09-30 03:20:19'),
(289, 285, '0', 52.6, 35.4, '2022-09-30 03:20:21'),
(290, 285, '0', 52.6, 35.4, '2022-09-30 03:20:22'),
(291, 285, '0', 52.6, 35.4, '2022-09-30 03:20:24'),
(292, 285, '0', 52.6, 35.4, '2022-09-30 03:20:26'),
(293, 285, '0', 52.6, 35.4, '2022-09-30 03:20:27'),
(294, 285, '0', 52.6, 35.4, '2022-09-30 03:20:29'),
(295, 285, '0', 52.6, 35.4, '2022-09-30 03:20:31'),
(296, 285, '0', 52.6, 35.4, '2022-09-30 03:20:32'),
(297, 285, '0', 52.6, 35.4, '2022-09-30 03:20:34'),
(298, 285, '0', 52.6, 35.4, '2022-09-30 03:20:36'),
(299, 285, '0', 52.6, 35.4, '2022-09-30 03:20:37'),
(300, 285, '0', 52.6, 35.4, '2022-09-30 03:20:39'),
(301, 285, '0', 52.6, 35.4, '2022-09-30 03:20:40'),
(302, 285, '0', 52.6, 35.4, '2022-09-30 03:20:42'),
(303, 285, '0', 52.6, 35.4, '2022-09-30 03:20:43'),
(304, 285, '0', 52.6, 35.4, '2022-09-30 03:20:45'),
(305, 285, '0', 52.6, 35.4, '2022-09-30 03:20:47'),
(306, 285, '0', 52.6, 35.4, '2022-09-30 03:20:48'),
(307, 285, '0', 52.6, 35.4, '2022-09-30 03:20:50'),
(308, 285, '0', 52.6, 35.4, '2022-09-30 03:20:52'),
(309, 285, '0', 52.6, 35.4, '2022-09-30 03:20:53'),
(310, 285, '0', 52.6, 35.4, '2022-09-30 03:20:55'),
(311, 285, '0', 52.6, 35.4, '2022-09-30 03:20:56'),
(312, 285, '0', 52.6, 35.4, '2022-09-30 03:20:58'),
(313, 285, '0', 52.6, 35.4, '2022-09-30 03:20:59'),
(314, 285, '0', 52.6, 35.4, '2022-09-30 03:21:01'),
(315, 285, '0', 52.6, 35.4, '2022-09-30 03:21:03'),
(316, 285, '0', 52.6, 35.4, '2022-09-30 03:21:04'),
(317, 285, '0', 52.6, 35.4, '2022-09-30 03:21:06'),
(318, 285, '0', 52.6, 35.4, '2022-09-30 03:21:08'),
(319, 285, '0', 52.6, 35.4, '2022-09-30 03:21:09'),
(320, 285, '0', 52.6, 35.4, '2022-09-30 03:21:11'),
(321, 285, '0', 52.6, 35.4, '2022-09-30 03:21:13'),
(322, 285, '0', 52.6, 35.4, '2022-09-30 03:21:15'),
(323, 285, '0', 52.6, 35.4, '2022-09-30 03:21:16'),
(324, 285, '0', 52.6, 35.4, '2022-09-30 03:21:18'),
(325, 285, '0', 52.6, 35.4, '2022-09-30 03:21:20'),
(326, 285, '0', 52.6, 35.4, '2022-09-30 03:21:21'),
(327, 285, '0', 52.6, 35.4, '2022-09-30 03:21:23'),
(328, 285, '0', 52.6, 35.4, '2022-09-30 03:21:24'),
(329, 285, '0', 52.6, 35.4, '2022-09-30 03:21:26'),
(330, 285, '0', 52.6, 35.4, '2022-09-30 03:21:28'),
(331, 285, '0', 52.6, 35.4, '2022-09-30 03:21:29'),
(332, 285, '0', 52.6, 35.4, '2022-09-30 03:21:31'),
(333, 285, '0', 52.6, 35.4, '2022-09-30 03:21:32'),
(334, 285, '0', 52.6, 35.4, '2022-09-30 03:21:34'),
(335, 285, '0', 52.6, 35.4, '2022-09-30 03:21:35'),
(336, 285, '0', 52.6, 35.4, '2022-09-30 03:21:37'),
(337, 285, '0', 52.6, 35.4, '2022-09-30 03:21:38'),
(338, 285, '0', 52.6, 35.4, '2022-09-30 03:21:40'),
(339, 285, '0', 52.6, 35.4, '2022-09-30 03:21:42'),
(340, 285, '0', 52.6, 35.4, '2022-09-30 03:21:43'),
(341, 285, '0', 52.6, 35.4, '2022-09-30 03:21:45'),
(342, 285, '0', 52.6, 35.4, '2022-09-30 03:21:46'),
(343, 285, '0', 52.6, 35.4, '2022-09-30 03:21:48'),
(344, 285, '0', 52.6, 35.4, '2022-09-30 03:21:50'),
(345, 285, '0', 52.6, 35.4, '2022-09-30 03:21:51'),
(346, 285, '0', 52.6, 35.4, '2022-09-30 03:21:53'),
(347, 285, '0', 52.6, 35.4, '2022-09-30 03:21:54'),
(348, 285, '0', 52.6, 35.4, '2022-09-30 03:21:56'),
(349, 285, '0', 52.6, 35.4, '2022-09-30 03:21:58'),
(350, 285, '0', 52.6, 35.4, '2022-09-30 03:21:59'),
(351, 285, '0', 52.6, 35.4, '2022-09-30 03:22:01'),
(352, 285, '0', 52.6, 35.4, '2022-09-30 03:22:02'),
(353, 285, '0', 52.6, 35.4, '2022-09-30 03:22:04'),
(354, 285, '0', 52.6, 35.4, '2022-09-30 03:22:06'),
(355, 285, '0', 52.6, 35.4, '2022-09-30 03:22:07'),
(356, 285, '0', 52.6, 35.4, '2022-09-30 03:22:09'),
(357, 285, '0', 52.6, 35.4, '2022-09-30 03:22:10'),
(358, 285, '0', 52.6, 35.4, '2022-09-30 03:22:12'),
(359, 285, '0', 52.6, 35.4, '2022-09-30 03:22:14'),
(360, 285, '0', 52.6, 35.4, '2022-09-30 03:22:15'),
(361, 285, '0', 52.6, 35.4, '2022-09-30 03:22:17'),
(362, 285, '0', 52.6, 35.4, '2022-09-30 03:22:18'),
(363, 285, '0', 52.6, 35.4, '2022-09-30 03:22:20'),
(364, 285, '0', 52.6, 35.4, '2022-09-30 03:22:22'),
(365, 285, '0', 52.6, 35.4, '2022-09-30 03:22:24'),
(366, 285, '0', 52.6, 35.4, '2022-09-30 03:22:25'),
(367, 285, '0', 52.6, 35.4, '2022-09-30 03:22:27'),
(368, 285, '0', 52.6, 35.4, '2022-09-30 03:22:29'),
(369, 285, '0', 52.6, 35.4, '2022-09-30 03:22:31'),
(370, 285, '0', 52.6, 35.4, '2022-09-30 03:22:32'),
(371, 285, '0', 52.6, 35.4, '2022-09-30 03:22:34'),
(372, 285, '0', 52.6, 35.4, '2022-09-30 03:22:35'),
(373, 285, '0', 52.6, 35.4, '2022-09-30 03:22:37'),
(374, 285, '0', 52.6, 35.4, '2022-09-30 03:22:39'),
(375, 285, '0', 52.6, 35.4, '2022-09-30 03:22:40'),
(376, 285, '0', 52.6, 35.4, '2022-09-30 03:22:42'),
(377, 285, '0', 52.6, 35.4, '2022-09-30 03:22:43'),
(378, 285, '0', 52.6, 35.4, '2022-09-30 03:22:45'),
(379, 285, '0', 52.6, 35.4, '2022-09-30 03:22:46'),
(380, 285, '0', 52.6, 35.4, '2022-09-30 03:22:48'),
(381, 285, '0', 52.6, 35.4, '2022-09-30 03:22:49'),
(382, 285, '0', 52.6, 35.4, '2022-09-30 03:22:51'),
(383, 285, '0', 52.6, 35.4, '2022-09-30 03:22:53'),
(384, 285, '0', 52.6, 35.4, '2022-09-30 03:22:55'),
(385, 285, '0', 52.6, 35.4, '2022-09-30 03:22:56'),
(386, 285, '0', 52.6, 35.4, '2022-09-30 03:22:58'),
(387, 285, '0', 52.6, 35.4, '2022-09-30 03:22:59'),
(388, 285, '0', 52.6, 35.4, '2022-09-30 03:23:01'),
(389, 285, '0', 52.6, 35.4, '2022-09-30 03:23:03'),
(390, 285, '0', 52.6, 35.4, '2022-09-30 03:23:05'),
(391, 285, '0', 52.6, 35.4, '2022-09-30 03:23:06'),
(392, 285, '0', 52.6, 35.4, '2022-09-30 03:23:08'),
(393, 285, '0', 52.6, 35.4, '2022-09-30 03:23:09'),
(394, 285, '0', 52.6, 35.4, '2022-09-30 03:23:11'),
(395, 285, '0', 52.6, 35.4, '2022-09-30 03:23:12'),
(396, 285, '0', 52.6, 35.4, '2022-09-30 03:23:14'),
(397, 285, '0', 52.6, 35.4, '2022-09-30 03:23:15'),
(398, 285, '0', 52.6, 35.4, '2022-09-30 03:23:17'),
(399, 285, '0', 52.6, 35.4, '2022-09-30 03:23:18'),
(400, 285, '0', 52.6, 35.4, '2022-09-30 03:23:20'),
(401, 285, '0', 52.6, 35.4, '2022-09-30 03:23:22'),
(402, 285, '0', 52.6, 35.4, '2022-09-30 03:23:23'),
(403, 285, '0', 52.6, 35.4, '2022-09-30 03:23:25'),
(404, 285, '0', 52.6, 35.4, '2022-09-30 03:23:27'),
(405, 285, '0', 52.6, 35.4, '2022-09-30 03:23:28'),
(406, 285, '0', 52.6, 35.4, '2022-09-30 03:23:30'),
(407, 285, '0', 52.6, 35.4, '2022-09-30 03:23:32'),
(408, 285, '0', 52.6, 35.4, '2022-09-30 03:23:33'),
(409, 285, '0', 52.6, 35.4, '2022-09-30 03:23:35'),
(410, 285, '0', 52.6, 35.4, '2022-09-30 03:23:36'),
(411, 285, '0', 52.6, 35.4, '2022-09-30 03:23:38'),
(412, 285, '0', 52.6, 35.4, '2022-09-30 03:23:39'),
(413, 285, '0', 52.6, 35.4, '2022-09-30 03:23:41'),
(414, 285, '0', 52.6, 35.4, '2022-09-30 03:23:42'),
(415, 285, '0', 52.6, 35.4, '2022-09-30 03:23:44'),
(416, 285, '0', 52.6, 35.4, '2022-09-30 03:23:45'),
(417, 285, '0', 52.6, 35.4, '2022-09-30 03:23:47'),
(418, 285, '0', 52.6, 35.4, '2022-09-30 03:23:48'),
(419, 285, '0', 52.6, 35.4, '2022-09-30 03:23:50'),
(420, 285, '0', 52.6, 35.4, '2022-09-30 03:23:51'),
(421, 285, '0', 52.6, 35.4, '2022-09-30 03:23:53'),
(422, 285, '0', 52.6, 35.4, '2022-09-30 03:23:54'),
(423, 285, '0', 52.6, 35.4, '2022-09-30 03:23:56'),
(424, 285, '0', 52.6, 35.4, '2022-09-30 03:23:58'),
(425, 285, '0', 52.6, 35.4, '2022-09-30 03:23:59'),
(426, 285, '0', 52.6, 35.4, '2022-09-30 03:24:01'),
(427, 285, '0', 52.6, 35.4, '2022-09-30 03:24:03'),
(428, 285, '0', 52.6, 35.4, '2022-09-30 03:24:04'),
(429, 285, '0', 52.6, 35.4, '2022-09-30 03:24:06'),
(430, 285, '0', 52.6, 35.4, '2022-09-30 03:24:07'),
(431, 285, '0', 52.6, 35.4, '2022-09-30 03:24:09'),
(432, 285, '0', 52.6, 35.4, '2022-09-30 03:24:11'),
(433, 285, '0', 52.6, 35.4, '2022-09-30 03:24:12'),
(434, 285, '0', 52.6, 35.4, '2022-09-30 03:24:14'),
(435, 285, '0', 52.6, 35.4, '2022-09-30 03:24:15'),
(436, 285, '0', 52.6, 35.4, '2022-09-30 03:24:17'),
(437, 285, '0', 52.6, 35.4, '2022-09-30 03:24:19'),
(438, 285, '0', 52.6, 35.4, '2022-09-30 03:24:20'),
(439, 285, '0', 52.6, 35.4, '2022-09-30 03:24:22'),
(440, 285, '0', 52.6, 35.4, '2022-09-30 03:24:24'),
(441, 285, '0', 52.6, 35.4, '2022-09-30 03:24:25'),
(442, 285, '0', 52.6, 35.4, '2022-09-30 03:24:27'),
(443, 285, '0', 52.6, 35.4, '2022-09-30 03:24:29'),
(444, 285, '0', 52.6, 35.4, '2022-09-30 03:24:30'),
(445, 285, '0', 52.6, 35.4, '2022-09-30 03:24:31'),
(446, 285, '0', 52.6, 35.4, '2022-09-30 03:24:33'),
(447, 285, '0', 52.6, 35.4, '2022-09-30 03:24:35'),
(448, 285, '0', 52.6, 35.4, '2022-09-30 03:24:37'),
(449, 285, '0', 52.6, 35.4, '2022-09-30 03:24:38'),
(450, 285, '0', 52.6, 35.4, '2022-09-30 03:24:39'),
(451, 285, '0', 52.6, 35.4, '2022-09-30 03:24:41'),
(452, 285, '0', 52.6, 35.4, '2022-09-30 03:24:43'),
(453, 285, '0', 52.6, 35.4, '2022-09-30 03:24:45'),
(454, 285, '0', 52.6, 35.4, '2022-09-30 03:24:46'),
(455, 285, '0', 52.6, 35.4, '2022-09-30 03:24:48'),
(456, 285, '0', 52.6, 35.4, '2022-09-30 03:24:49'),
(457, 285, '0', 52.6, 35.4, '2022-09-30 03:24:51'),
(458, 285, '0', 52.6, 35.4, '2022-09-30 03:24:52'),
(459, 285, '0', 52.6, 35.4, '2022-09-30 03:24:54'),
(460, 285, '0', 52.6, 35.4, '2022-09-30 03:24:56'),
(461, 285, '0', 52.6, 35.4, '2022-09-30 03:24:57'),
(462, 285, '0', 52.6, 35.4, '2022-09-30 03:24:59'),
(463, 285, '0', 52.6, 35.4, '2022-09-30 03:25:00'),
(464, 285, '0', 52.6, 35.4, '2022-09-30 03:25:02'),
(465, 285, '0', 52.6, 35.4, '2022-09-30 03:25:03'),
(466, 285, '0', 52.6, 35.4, '2022-09-30 03:25:05'),
(467, 285, '0', 52.6, 35.4, '2022-09-30 03:25:07'),
(468, 285, '0', 52.6, 35.4, '2022-09-30 03:25:08'),
(469, 285, '0', 52.6, 35.4, '2022-09-30 03:25:10'),
(470, 285, '0', 52.6, 35.4, '2022-09-30 03:25:11'),
(471, 285, '0', 52.6, 35.4, '2022-09-30 03:25:13'),
(472, 285, '0', 52.6, 35.4, '2022-09-30 03:25:15'),
(473, 285, '0', 52.6, 35.4, '2022-09-30 03:25:16'),
(474, 285, '0', 52.6, 35.4, '2022-09-30 03:25:18'),
(475, 285, '0', 52.6, 35.4, '2022-09-30 03:25:19'),
(476, 285, '0', 52.6, 35.4, '2022-09-30 03:25:21'),
(477, 285, '0', 52.6, 35.4, '2022-09-30 03:25:22'),
(478, 285, '0', 52.6, 35.4, '2022-09-30 03:25:23'),
(479, 285, '0', 52.6, 35.4, '2022-09-30 03:25:25'),
(480, 285, '0', 52.6, 35.4, '2022-09-30 03:25:27'),
(481, 285, '0', 52.6, 35.4, '2022-09-30 03:25:28'),
(482, 285, '0', 52.6, 35.4, '2022-09-30 03:25:30'),
(483, 285, '0', 52.6, 35.4, '2022-09-30 03:25:31'),
(484, 285, '0', 52.6, 35.4, '2022-09-30 03:25:33'),
(485, 285, '0', 52.6, 35.4, '2022-09-30 03:25:35'),
(486, 285, '0', 52.6, 35.4, '2022-09-30 03:25:37'),
(487, 285, '0', 52.6, 35.4, '2022-09-30 03:25:38'),
(488, 285, '0', 52.6, 35.4, '2022-09-30 03:25:40'),
(489, 285, '0', 52.6, 35.4, '2022-09-30 03:25:42'),
(490, 285, '0', 52.6, 35.4, '2022-09-30 03:25:44'),
(491, 285, '0', 52.6, 35.4, '2022-09-30 03:25:45'),
(492, 285, '0', 52.6, 35.4, '2022-09-30 03:25:47'),
(493, 285, '0', 52.6, 35.4, '2022-09-30 03:25:48'),
(494, 285, '0', 52.6, 35.4, '2022-09-30 03:25:50'),
(495, 285, '0', 52.6, 35.4, '2022-09-30 03:25:52'),
(496, 285, '0', 52.6, 35.4, '2022-09-30 03:25:53'),
(497, 285, '0', 52.6, 35.4, '2022-09-30 03:25:55'),
(498, 285, '0', 52.6, 35.4, '2022-09-30 03:25:57'),
(499, 285, '0', 52.6, 35.4, '2022-09-30 03:25:58'),
(500, 285, '0', 52.6, 35.4, '2022-09-30 03:26:00'),
(501, 285, '0', 52.6, 35.4, '2022-09-30 03:26:01'),
(502, 285, '0', 52.6, 35.4, '2022-09-30 03:26:03'),
(503, 285, '0', 52.6, 35.4, '2022-09-30 03:26:04'),
(504, 285, '0', 52.6, 35.4, '2022-09-30 03:26:06'),
(505, 285, '0', 52.6, 35.4, '2022-09-30 03:26:07'),
(506, 285, '0', 52.6, 35.4, '2022-09-30 03:26:09'),
(507, 285, '0', 52.6, 35.4, '2022-09-30 03:26:11'),
(508, 285, '0', 52.6, 35.4, '2022-09-30 03:26:12'),
(509, 285, '0', 52.6, 35.4, '2022-09-30 03:26:14'),
(510, 285, '0', 52.6, 35.4, '2022-09-30 03:26:16'),
(511, 285, '0', 52.6, 35.4, '2022-09-30 03:26:18'),
(512, 285, '0', 52.6, 35.4, '2022-09-30 03:26:19'),
(513, 285, '0', 52.6, 35.4, '2022-09-30 03:26:21'),
(514, 285, '0', 52.6, 35.4, '2022-09-30 03:26:22'),
(515, 285, '0', 52.6, 35.4, '2022-09-30 03:26:24'),
(516, 285, '0', 52.6, 35.4, '2022-09-30 03:26:25'),
(517, 285, '0', 52.6, 35.4, '2022-09-30 03:26:27'),
(518, 285, '0', 52.6, 35.4, '2022-09-30 03:26:28'),
(519, 285, '0', 52.6, 35.4, '2022-09-30 03:26:30'),
(520, 285, '0', 52.6, 35.4, '2022-09-30 03:26:31'),
(521, 285, '0', 52.6, 35.4, '2022-09-30 03:26:33'),
(522, 285, '0', 52.6, 35.4, '2022-09-30 03:26:35'),
(523, 285, '0', 52.6, 35.4, '2022-09-30 03:26:36'),
(524, 285, '0', 52.6, 35.4, '2022-09-30 03:26:38'),
(525, 285, '0', 52.6, 35.4, '2022-09-30 03:26:40'),
(526, 285, '0', 52.6, 35.4, '2022-09-30 03:26:41'),
(527, 285, '0', 52.6, 35.4, '2022-09-30 03:26:43'),
(528, 285, '0', 52.6, 35.4, '2022-09-30 03:26:44'),
(529, 285, '0', 52.6, 35.4, '2022-09-30 03:26:45'),
(530, 285, '0', 52.6, 35.4, '2022-09-30 03:26:47'),
(531, 285, '0', 52.6, 35.4, '2022-09-30 03:26:48'),
(532, 285, '0', 52.6, 35.4, '2022-09-30 03:26:50'),
(533, 285, '0', 52.6, 35.4, '2022-09-30 03:26:52'),
(534, 285, '0', 52.6, 35.4, '2022-09-30 03:26:54'),
(535, 285, '0', 52.6, 35.4, '2022-09-30 03:26:55'),
(536, 285, '0', 52.6, 35.4, '2022-09-30 03:26:57'),
(537, 285, '0', 52.6, 35.4, '2022-09-30 03:26:58'),
(538, 285, '0', 52.6, 35.4, '2022-09-30 03:26:59'),
(539, 285, '0', 52.6, 35.4, '2022-09-30 03:27:01'),
(540, 285, '0', 52.6, 35.4, '2022-09-30 03:27:02'),
(541, 285, '0', 52.6, 35.4, '2022-09-30 03:27:04'),
(542, 285, '0', 52.6, 35.4, '2022-09-30 03:27:05'),
(543, 285, '0', 52.6, 35.4, '2022-09-30 03:27:07'),
(544, 285, '0', 52.6, 35.4, '2022-09-30 03:27:09'),
(545, 285, '0', 52.6, 35.4, '2022-09-30 03:27:12'),
(546, 285, '0', 52.6, 35.4, '2022-09-30 03:27:14'),
(547, 285, '0', 52.6, 35.4, '2022-09-30 03:27:15'),
(548, 285, '0', 52.6, 35.4, '2022-09-30 03:27:17'),
(549, 285, '0', 52.6, 35.4, '2022-09-30 03:27:19'),
(550, 285, '0', 52.6, 35.4, '2022-09-30 03:27:20'),
(551, 285, '0', 52.6, 35.4, '2022-09-30 03:27:22'),
(552, 285, '0', 52.6, 35.4, '2022-09-30 03:27:23'),
(553, 285, '0', 52.6, 35.4, '2022-09-30 03:27:25'),
(554, 285, '0', 52.6, 35.4, '2022-09-30 03:27:26'),
(555, 285, '0', 52.6, 35.4, '2022-09-30 03:27:28'),
(556, 285, '0', 52.6, 35.4, '2022-09-30 03:27:30'),
(557, 285, '0', 52.6, 35.4, '2022-09-30 03:27:32'),
(558, 285, '0', 52.6, 35.4, '2022-09-30 03:27:33'),
(559, 285, '0', 52.6, 35.4, '2022-09-30 03:27:35'),
(560, 285, '0', 52.6, 35.4, '2022-09-30 03:27:37'),
(561, 285, '0', 52.6, 35.4, '2022-09-30 03:27:38'),
(562, 285, '0', 52.6, 35.4, '2022-09-30 03:27:40'),
(563, 285, '0', 52.6, 35.4, '2022-09-30 03:27:41'),
(564, 285, '0', 52.6, 35.4, '2022-09-30 03:27:43'),
(565, 285, '0', 52.6, 35.4, '2022-09-30 03:27:44'),
(566, 285, '0', 52.6, 35.4, '2022-09-30 03:27:46'),
(567, 285, '0', 52.6, 35.4, '2022-09-30 03:27:48'),
(568, 285, '0', 52.6, 35.4, '2022-09-30 03:27:49'),
(569, 285, '0', 52.6, 35.4, '2022-09-30 03:27:51'),
(570, 285, '0', 52.6, 35.4, '2022-09-30 03:27:53'),
(571, 285, '0', 52.6, 35.4, '2022-09-30 03:27:55'),
(572, 285, '0', 52.6, 35.4, '2022-09-30 03:27:56'),
(573, 285, '0', 52.6, 35.4, '2022-09-30 03:27:58'),
(574, 285, '0', 52.6, 35.4, '2022-09-30 03:28:00'),
(575, 285, '0', 52.6, 35.4, '2022-09-30 03:28:01'),
(576, 285, '0', 52.6, 35.4, '2022-09-30 03:28:03'),
(577, 285, '0', 52.6, 35.4, '2022-09-30 03:28:04'),
(578, 285, '0', 52.6, 35.4, '2022-09-30 03:28:06'),
(579, 285, '0', 52.6, 35.4, '2022-09-30 03:28:08'),
(580, 285, '0', 52.6, 35.4, '2022-09-30 03:28:09'),
(581, 285, '0', 52.6, 35.4, '2022-09-30 03:28:11'),
(582, 285, '0', 52.6, 35.4, '2022-09-30 03:28:13'),
(583, 285, '0', 52.6, 35.4, '2022-09-30 03:28:14'),
(584, 285, '0', 52.6, 35.4, '2022-09-30 03:28:16'),
(585, 285, '0', 52.6, 35.4, '2022-09-30 03:28:18'),
(586, 285, '0', 52.6, 35.4, '2022-09-30 03:28:19'),
(587, 285, '0', 52.6, 35.4, '2022-09-30 03:28:21'),
(588, 285, '0', 52.6, 35.4, '2022-09-30 03:28:23'),
(589, 285, '0', 52.6, 35.4, '2022-09-30 03:28:25'),
(590, 285, '0', 52.6, 35.4, '2022-09-30 03:28:26'),
(591, 285, '0', 52.6, 35.4, '2022-09-30 03:28:28'),
(592, 285, '0', 52.6, 35.4, '2022-09-30 03:28:29'),
(593, 285, '0', 52.6, 35.4, '2022-09-30 03:28:31'),
(594, 285, '0', 52.6, 35.4, '2022-09-30 03:28:33'),
(595, 285, '0', 52.6, 35.4, '2022-09-30 03:28:34'),
(596, 285, '0', 52.6, 35.4, '2022-09-30 03:28:36'),
(597, 285, '0', 52.6, 35.4, '2022-09-30 03:28:37'),
(598, 285, '0', 52.6, 35.4, '2022-09-30 03:28:39'),
(599, 285, '0', 52.6, 35.4, '2022-09-30 03:28:40'),
(600, 285, '0', 52.6, 35.4, '2022-09-30 03:28:42'),
(601, 285, '0', 52.6, 35.4, '2022-09-30 03:28:44'),
(602, 285, '0', 52.6, 35.4, '2022-09-30 03:28:45'),
(603, 285, '0', 52.6, 35.4, '2022-09-30 03:28:47'),
(604, 285, '0', 52.6, 35.4, '2022-09-30 03:28:49'),
(605, 285, '0', 52.6, 35.4, '2022-09-30 03:28:50'),
(606, 285, '0', 52.6, 35.4, '2022-09-30 03:28:52'),
(607, 285, '0', 52.6, 35.4, '2022-09-30 03:28:54'),
(608, 285, '0', 52.6, 35.4, '2022-09-30 03:28:55'),
(609, 285, '0', 52.6, 35.4, '2022-09-30 03:28:57'),
(610, 285, '0', 52.6, 35.4, '2022-09-30 03:28:59'),
(611, 285, '0', 52.6, 35.4, '2022-09-30 03:29:01'),
(612, 285, '0', 52.6, 35.4, '2022-09-30 03:29:02'),
(613, 285, '0', 52.6, 35.4, '2022-09-30 03:29:04'),
(614, 285, '0', 52.6, 35.4, '2022-09-30 03:29:06'),
(615, 285, '0', 52.6, 35.4, '2022-09-30 03:29:07'),
(616, 285, '0', 52.6, 35.4, '2022-09-30 03:29:09'),
(617, 285, '0', 52.6, 35.4, '2022-09-30 03:29:10'),
(618, 285, '0', 52.6, 35.4, '2022-09-30 03:29:12'),
(619, 285, '0', 52.6, 35.4, '2022-09-30 03:29:13'),
(620, 285, '0', 52.6, 35.4, '2022-09-30 03:29:15'),
(621, 285, '0', 52.6, 35.4, '2022-09-30 03:29:16'),
(622, 285, '0', 52.6, 35.4, '2022-09-30 03:29:18'),
(623, 285, '0', 52.6, 35.4, '2022-09-30 03:29:19'),
(624, 285, '0', 52.6, 35.4, '2022-09-30 03:29:21'),
(625, 285, '0', 52.6, 35.4, '2022-09-30 03:29:22'),
(626, 285, '0', 52.6, 35.4, '2022-09-30 03:29:24'),
(627, 285, '0', 52.6, 35.4, '2022-09-30 03:29:25'),
(628, 285, '0', 52.6, 35.4, '2022-09-30 03:29:27'),
(629, 285, '0', 52.6, 35.4, '2022-09-30 03:29:28'),
(630, 285, '0', 52.6, 35.4, '2022-09-30 03:29:30'),
(631, 285, '0', 52.6, 35.4, '2022-09-30 03:29:31'),
(632, 285, '0', 52.6, 35.4, '2022-09-30 03:29:33'),
(633, 285, '0', 52.6, 35.4, '2022-09-30 03:29:34'),
(634, 285, '0', 52.6, 35.4, '2022-09-30 03:29:35'),
(635, 285, '0', 52.6, 35.4, '2022-09-30 03:29:37'),
(636, 285, '0', 52.6, 35.4, '2022-09-30 03:29:39'),
(637, 285, '0', 52.6, 35.4, '2022-09-30 03:29:41'),
(638, 285, '0', 52.6, 35.4, '2022-09-30 03:29:42'),
(639, 285, '0', 52.6, 35.4, '2022-09-30 03:29:44'),
(640, 285, '0', 52.6, 35.4, '2022-09-30 03:29:45'),
(641, 285, '0', 52.6, 35.4, '2022-09-30 03:29:47'),
(642, 285, '0', 52.6, 35.4, '2022-09-30 03:29:48'),
(643, 285, '0', 52.6, 35.4, '2022-09-30 03:29:50'),
(644, 285, '0', 52.6, 35.4, '2022-09-30 03:29:52'),
(645, 285, '0', 52.6, 35.4, '2022-09-30 03:29:53'),
(646, 285, '0', 52.6, 35.4, '2022-09-30 03:29:55'),
(647, 285, '0', 52.6, 35.4, '2022-09-30 03:29:56'),
(648, 285, '0', 52.6, 35.4, '2022-09-30 03:29:58'),
(649, 285, '0', 52.6, 35.4, '2022-09-30 03:29:59'),
(650, 285, '0', 52.6, 35.4, '2022-09-30 03:30:01'),
(651, 285, '0', 52.6, 35.4, '2022-09-30 03:30:02'),
(652, 285, '0', 52.6, 35.4, '2022-09-30 03:30:04'),
(653, 285, '0', 52.6, 35.4, '2022-09-30 03:30:05'),
(654, 285, '0', 52.6, 35.4, '2022-09-30 03:30:07'),
(655, 285, '0', 52.6, 35.4, '2022-09-30 03:30:09'),
(656, 285, '0', 52.6, 35.4, '2022-09-30 03:30:11'),
(657, 285, '0', 52.6, 35.4, '2022-09-30 03:30:12'),
(658, 285, '0', 52.6, 35.4, '2022-09-30 03:30:14'),
(659, 285, '0', 52.6, 35.4, '2022-09-30 03:30:15'),
(660, 285, '0', 52.6, 35.4, '2022-09-30 03:30:17'),
(661, 285, '0', 52.6, 35.4, '2022-09-30 03:30:19'),
(662, 285, '0', 52.6, 35.4, '2022-09-30 03:30:21'),
(663, 285, '0', 52.6, 35.4, '2022-09-30 03:30:22'),
(664, 285, '0', 52.6, 35.4, '2022-09-30 03:30:24'),
(665, 285, '0', 52.6, 35.4, '2022-09-30 03:30:25'),
(666, 285, '0', 52.6, 35.4, '2022-09-30 03:30:27'),
(667, 285, '0', 52.6, 35.4, '2022-09-30 03:30:29'),
(668, 285, '0', 52.6, 35.4, '2022-09-30 03:30:30'),
(669, 285, '0', 52.6, 35.4, '2022-09-30 03:30:31'),
(670, 285, '0', 52.6, 35.4, '2022-09-30 03:30:33'),
(671, 285, '0', 52.6, 35.4, '2022-09-30 03:30:35'),
(672, 285, '0', 52.6, 35.4, '2022-09-30 03:30:36'),
(673, 285, '0', 52.6, 35.4, '2022-09-30 03:30:38'),
(674, 285, '0', 52.6, 35.4, '2022-09-30 03:30:39'),
(675, 285, '0', 52.6, 35.4, '2022-09-30 03:30:41'),
(676, 285, '0', 52.6, 35.4, '2022-09-30 03:30:42'),
(677, 285, '0', 52.6, 35.4, '2022-09-30 03:30:44'),
(678, 285, '0', 52.6, 35.4, '2022-09-30 03:30:45'),
(679, 285, '0', 52.6, 35.4, '2022-09-30 03:30:47'),
(680, 285, '0', 52.6, 35.4, '2022-09-30 03:30:49'),
(681, 285, '0', 52.6, 35.4, '2022-09-30 03:30:50'),
(682, 285, '0', 52.6, 35.4, '2022-09-30 03:30:52'),
(683, 285, '0', 52.6, 35.4, '2022-09-30 03:30:54'),
(684, 285, '0', 52.6, 35.4, '2022-09-30 03:30:55'),
(685, 285, '0', 52.6, 35.4, '2022-09-30 03:30:57'),
(686, 285, '0', 52.6, 35.4, '2022-09-30 03:30:58'),
(687, 285, '0', 52.6, 35.4, '2022-09-30 03:31:00'),
(688, 285, '0', 52.6, 35.4, '2022-09-30 03:31:01'),
(689, 285, '0', 52.6, 35.4, '2022-09-30 03:31:03'),
(690, 285, '0', 52.6, 35.4, '2022-09-30 03:31:04'),
(691, 285, '0', 52.6, 35.4, '2022-09-30 03:31:06'),
(692, 285, '0', 52.6, 35.4, '2022-09-30 03:31:07'),
(693, 285, '0', 52.6, 35.4, '2022-09-30 03:31:09'),
(694, 285, '0', 52.6, 35.4, '2022-09-30 03:31:10'),
(695, 285, '0', 52.6, 35.4, '2022-09-30 03:31:12'),
(696, 285, '0', 52.6, 35.4, '2022-09-30 03:31:13'),
(697, 285, '0', 52.6, 35.4, '2022-09-30 03:31:15'),
(698, 285, '0', 52.6, 35.4, '2022-09-30 03:31:17'),
(699, 285, '0', 52.6, 35.4, '2022-09-30 03:31:18'),
(700, 285, '0', 52.6, 35.4, '2022-09-30 03:31:20'),
(701, 285, '0', 52.6, 35.4, '2022-09-30 03:31:22'),
(702, 285, '0', 52.6, 35.4, '2022-09-30 03:31:23'),
(703, 285, '0', 52.6, 35.4, '2022-09-30 03:31:25'),
(704, 285, '0', 52.6, 35.4, '2022-09-30 03:31:26'),
(705, 285, '0', 52.6, 35.4, '2022-09-30 03:31:28'),
(706, 285, '0', 52.6, 35.4, '2022-09-30 03:31:30'),
(707, 285, '0', 52.6, 35.4, '2022-09-30 03:31:31'),
(708, 285, '0', 52.6, 35.4, '2022-09-30 03:31:33'),
(709, 285, '0', 52.6, 35.4, '2022-09-30 03:31:35'),
(710, 285, '0', 52.6, 35.4, '2022-09-30 03:31:36'),
(711, 285, '0', 52.6, 35.4, '2022-09-30 03:31:38'),
(712, 285, '0', 52.6, 35.4, '2022-09-30 03:31:40'),
(713, 285, '0', 52.6, 35.4, '2022-09-30 03:31:41'),
(714, 285, '0', 52.6, 35.4, '2022-09-30 03:31:43'),
(715, 285, '0', 52.6, 35.4, '2022-09-30 03:31:44'),
(716, 285, '0', 52.6, 35.4, '2022-09-30 03:31:46'),
(717, 285, '0', 52.6, 35.4, '2022-09-30 03:31:48'),
(718, 285, '0', 52.6, 35.4, '2022-09-30 03:31:49'),
(719, 285, '0', 52.6, 35.4, '2022-09-30 03:31:51'),
(720, 285, '0', 52.6, 35.4, '2022-09-30 03:31:52'),
(721, 285, '0', 52.6, 35.4, '2022-09-30 03:31:54'),
(722, 285, '0', 52.6, 35.4, '2022-09-30 03:31:56'),
(723, 285, '0', 52.6, 35.4, '2022-09-30 03:31:58'),
(724, 285, '0', 52.6, 35.4, '2022-09-30 03:32:00'),
(725, 285, '0', 52.6, 35.4, '2022-09-30 03:32:01'),
(726, 285, '0', 52.6, 35.4, '2022-09-30 03:32:02'),
(727, 285, '0', 52.6, 35.4, '2022-09-30 03:32:04'),
(728, 285, '0', 52.6, 35.4, '2022-09-30 03:32:05'),
(729, 285, '0', 52.6, 35.4, '2022-09-30 03:32:07'),
(730, 285, '0', 52.6, 35.4, '2022-09-30 03:32:09'),
(731, 285, '0', 52.6, 35.4, '2022-09-30 03:32:10'),
(732, 285, '0', 52.6, 35.4, '2022-09-30 03:32:12'),
(733, 285, '0', 52.6, 35.4, '2022-09-30 03:32:13'),
(734, 285, '0', 52.6, 35.4, '2022-09-30 03:32:15'),
(735, 285, '0', 52.6, 35.4, '2022-09-30 03:32:16'),
(736, 285, '0', 52.6, 35.4, '2022-09-30 03:32:18'),
(737, 285, '0', 52.6, 35.4, '2022-09-30 03:32:19'),
(738, 285, '0', 52.6, 35.4, '2022-09-30 03:32:21'),
(739, 285, '0', 52.6, 35.4, '2022-09-30 03:32:23'),
(740, 285, '0', 52.6, 35.4, '2022-09-30 03:32:25'),
(741, 285, '0', 52.6, 35.4, '2022-09-30 03:32:26'),
(742, 285, '0', 52.6, 35.4, '2022-09-30 03:32:28'),
(743, 285, '0', 52.6, 35.4, '2022-09-30 03:32:30'),
(744, 285, '0', 52.6, 35.4, '2022-09-30 03:32:31'),
(745, 285, '0', 52.6, 35.4, '2022-09-30 03:32:33'),
(746, 285, '0', 52.6, 35.4, '2022-09-30 03:32:35'),
(747, 285, '0', 52.6, 35.4, '2022-09-30 03:32:37'),
(748, 285, '0', 52.6, 35.4, '2022-09-30 03:32:38'),
(749, 285, '0', 52.6, 35.4, '2022-09-30 03:32:40'),
(750, 285, '0', 52.6, 35.4, '2022-09-30 03:32:41'),
(751, 285, '0', 52.6, 35.4, '2022-09-30 03:32:43'),
(752, 285, '0', 52.6, 35.4, '2022-09-30 03:32:45'),
(753, 285, '0', 52.6, 35.4, '2022-09-30 03:32:46'),
(754, 285, '0', 52.6, 35.4, '2022-09-30 03:32:47'),
(755, 285, '0', 52.6, 35.4, '2022-09-30 03:32:49'),
(756, 285, '0', 52.6, 35.4, '2022-09-30 03:32:50'),
(757, 285, '0', 52.6, 35.4, '2022-09-30 03:32:52'),
(758, 285, '0', 52.6, 35.4, '2022-09-30 03:32:54'),
(759, 285, '0', 52.6, 35.4, '2022-09-30 03:32:56'),
(760, 285, '0', 52.6, 35.4, '2022-09-30 03:32:57'),
(761, 285, '0', 52.6, 35.4, '2022-09-30 03:32:59'),
(762, 285, '0', 52.6, 35.4, '2022-09-30 03:33:01'),
(763, 285, '0', 52.6, 35.4, '2022-09-30 03:33:02'),
(764, 285, '0', 52.6, 35.4, '2022-09-30 03:33:04'),
(765, 285, '0', 52.6, 35.4, '2022-09-30 03:33:05'),
(766, 285, '0', 52.6, 35.4, '2022-09-30 03:33:07'),
(767, 285, '0', 52.6, 35.4, '2022-09-30 03:33:09'),
(768, 285, '0', 52.6, 35.4, '2022-09-30 03:33:10'),
(769, 285, '0', 52.6, 35.4, '2022-09-30 03:33:12'),
(770, 285, '0', 52.6, 35.4, '2022-09-30 03:33:13'),
(771, 285, '0', 52.6, 35.4, '2022-09-30 03:33:15'),
(772, 285, '0', 52.6, 35.4, '2022-09-30 03:33:16'),
(773, 285, '0', 52.6, 35.4, '2022-09-30 03:33:18'),
(774, 285, '0', 52.6, 35.4, '2022-09-30 03:33:20'),
(775, 285, '0', 52.6, 35.4, '2022-09-30 03:33:21'),
(776, 285, '0', 52.6, 35.4, '2022-09-30 03:33:23'),
(777, 285, '0', 52.6, 35.4, '2022-09-30 03:33:24'),
(778, 285, '0', 52.6, 35.4, '2022-09-30 03:33:26'),
(779, 285, '0', 52.6, 35.4, '2022-09-30 03:33:28'),
(780, 285, '0', 52.6, 35.4, '2022-09-30 03:33:29'),
(781, 285, '0', 52.6, 35.4, '2022-09-30 03:33:31'),
(782, 285, '0', 52.6, 35.4, '2022-09-30 03:33:33'),
(783, 285, '0', 52.6, 35.4, '2022-09-30 03:33:34'),
(784, 285, '0', 52.6, 35.4, '2022-09-30 03:33:36'),
(785, 285, '0', 52.6, 35.4, '2022-09-30 03:33:38'),
(786, 285, '0', 52.6, 35.4, '2022-09-30 03:33:39'),
(787, 285, '0', 52.6, 35.4, '2022-09-30 03:33:41'),
(788, 285, '0', 52.6, 35.4, '2022-09-30 03:33:42'),
(789, 285, '0', 52.6, 35.4, '2022-09-30 03:33:44'),
(790, 285, '0', 52.6, 35.4, '2022-09-30 03:33:45'),
(791, 285, '0', 52.6, 35.4, '2022-09-30 03:33:47'),
(792, 285, '0', 52.6, 35.4, '2022-09-30 03:33:49'),
(793, 285, '0', 52.6, 35.4, '2022-09-30 03:33:51'),
(794, 285, '0', 52.6, 35.4, '2022-09-30 03:33:52'),
(795, 285, '0', 52.6, 35.4, '2022-09-30 03:33:54'),
(796, 285, '0', 52.6, 35.4, '2022-09-30 03:33:55'),
(797, 285, '0', 52.6, 35.4, '2022-09-30 03:33:57'),
(798, 285, '0', 52.6, 35.4, '2022-09-30 03:33:58'),
(799, 285, '0', 52.6, 35.4, '2022-09-30 03:34:00'),
(800, 285, '0', 52.6, 35.4, '2022-09-30 03:34:02'),
(801, 285, '0', 52.6, 35.4, '2022-09-30 03:34:03'),
(802, 285, '0', 52.6, 35.4, '2022-09-30 03:34:05'),
(803, 285, '0', 52.6, 35.4, '2022-09-30 03:34:06'),
(804, 285, '0', 52.6, 35.4, '2022-09-30 03:34:08'),
(805, 285, '0', 52.6, 35.4, '2022-09-30 03:34:09'),
(806, 285, '0', 52.6, 35.4, '2022-09-30 03:34:11'),
(807, 285, '0', 52.6, 35.4, '2022-09-30 03:34:13'),
(808, 285, '0', 52.6, 35.4, '2022-09-30 03:34:14'),
(809, 285, '0', 52.6, 35.4, '2022-09-30 03:34:16'),
(810, 285, '0', 52.6, 35.4, '2022-09-30 03:34:18'),
(811, 285, '0', 52.6, 35.4, '2022-09-30 03:34:19'),
(812, 285, '0', 52.6, 35.4, '2022-09-30 03:34:21'),
(813, 285, '0', 52.6, 35.4, '2022-09-30 03:34:22'),
(814, 285, '0', 52.6, 35.4, '2022-09-30 03:34:24'),
(815, 285, '0', 52.6, 35.4, '2022-09-30 03:34:26'),
(816, 285, '0', 52.6, 35.4, '2022-09-30 03:34:27'),
(817, 285, '0', 52.6, 35.4, '2022-09-30 03:34:29'),
(818, 285, '0', 52.6, 35.4, '2022-09-30 03:34:30'),
(819, 285, '0', 52.6, 35.4, '2022-09-30 03:34:32'),
(820, 285, '0', 52.6, 35.4, '2022-09-30 03:34:34'),
(821, 285, '0', 52.6, 35.4, '2022-09-30 03:34:36'),
(822, 285, '0', 52.6, 35.4, '2022-09-30 03:34:37'),
(823, 285, '0', 52.6, 35.4, '2022-09-30 03:34:39'),
(824, 285, '0', 52.6, 35.4, '2022-09-30 03:34:41'),
(825, 285, '0', 52.6, 35.4, '2022-09-30 03:34:43'),
(826, 285, '0', 52.6, 35.4, '2022-09-30 03:34:44'),
(827, 285, '0', 52.6, 35.4, '2022-09-30 03:34:46'),
(828, 285, '0', 52.6, 35.4, '2022-09-30 03:34:47'),
(829, 285, '0', 52.6, 35.4, '2022-09-30 03:34:49'),
(830, 285, '0', 52.6, 35.4, '2022-09-30 03:34:50'),
(831, 285, '0', 52.6, 35.4, '2022-09-30 03:34:52'),
(832, 285, '0', 52.6, 35.4, '2022-09-30 03:34:53'),
(833, 285, '0', 52.6, 35.4, '2022-09-30 03:34:55'),
(834, 285, '0', 52.6, 35.4, '2022-09-30 03:34:57'),
(835, 285, '0', 52.6, 35.4, '2022-09-30 03:34:58'),
(836, 285, '0', 52.6, 35.4, '2022-09-30 03:35:00'),
(837, 285, '0', 52.6, 35.4, '2022-09-30 03:35:01'),
(838, 285, '0', 52.6, 35.4, '2022-09-30 03:35:03'),
(839, 285, '0', 52.6, 35.4, '2022-09-30 03:35:05'),
(840, 285, '0', 52.6, 35.4, '2022-09-30 03:35:06'),
(841, 285, '0', 52.6, 35.4, '2022-09-30 03:35:08'),
(842, 285, '0', 52.6, 35.4, '2022-09-30 03:35:09'),
(843, 285, '0', 52.6, 35.4, '2022-09-30 03:35:11'),
(844, 285, '0', 52.6, 35.4, '2022-09-30 03:35:13'),
(845, 285, '0', 52.6, 35.4, '2022-09-30 03:35:14'),
(846, 285, '0', 52.6, 35.4, '2022-09-30 03:35:16'),
(847, 285, '0', 52.6, 35.4, '2022-09-30 03:35:18'),
(848, 285, '0', 52.6, 35.4, '2022-09-30 03:35:19'),
(849, 285, '0', 52.6, 35.4, '2022-09-30 03:35:21'),
(850, 285, '0', 52.6, 35.4, '2022-09-30 03:35:22'),
(851, 285, '0', 52.6, 35.4, '2022-09-30 03:35:24'),
(852, 285, '0', 52.6, 35.4, '2022-09-30 03:35:25'),
(853, 285, '0', 52.6, 35.4, '2022-09-30 03:35:27'),
(854, 285, '0', 52.6, 35.4, '2022-09-30 03:35:29'),
(855, 285, '0', 52.6, 35.4, '2022-09-30 03:35:30'),
(856, 285, '0', 52.6, 35.4, '2022-09-30 03:35:32'),
(857, 285, '0', 52.6, 35.4, '2022-09-30 03:35:33'),
(858, 285, '0', 52.6, 35.4, '2022-09-30 03:35:35'),
(859, 285, '0', 52.6, 35.4, '2022-09-30 03:35:36'),
(860, 285, '0', 52.6, 35.4, '2022-09-30 03:35:38'),
(861, 285, '0', 52.6, 35.4, '2022-09-30 03:35:39'),
(862, 285, '0', 52.6, 35.4, '2022-09-30 03:35:41'),
(863, 285, '0', 52.6, 35.4, '2022-09-30 03:35:43'),
(864, 285, '0', 52.6, 35.4, '2022-09-30 03:35:44'),
(865, 285, '0', 52.6, 35.4, '2022-09-30 03:35:46'),
(866, 285, '0', 52.6, 35.4, '2022-09-30 03:35:48'),
(867, 285, '0', 52.6, 35.4, '2022-09-30 03:35:50'),
(868, 285, '0', 52.6, 35.4, '2022-09-30 03:35:52'),
(869, 285, '0', 52.6, 35.4, '2022-09-30 03:35:54'),
(870, 285, '0', 52.6, 35.4, '2022-09-30 03:35:55'),
(871, 285, '0', 52.6, 35.4, '2022-09-30 03:35:57'),
(872, 285, '0', 52.6, 35.4, '2022-09-30 03:35:59'),
(873, 285, '0', 52.6, 35.4, '2022-09-30 03:36:00'),
(874, 285, '0', 52.6, 35.4, '2022-09-30 03:36:02'),
(875, 285, '0', 52.6, 35.4, '2022-09-30 03:36:04'),
(876, 285, '0', 52.6, 35.4, '2022-09-30 03:36:05'),
(877, 285, '0', 52.6, 35.4, '2022-09-30 03:36:07'),
(878, 285, '0', 52.6, 35.4, '2022-09-30 03:36:09'),
(879, 285, '0', 52.6, 35.4, '2022-09-30 03:36:10'),
(880, 285, '0', 52.6, 35.4, '2022-09-30 03:36:12'),
(881, 285, '0', 52.6, 35.4, '2022-09-30 03:36:13'),
(882, 285, '0', 52.6, 35.4, '2022-09-30 03:36:15'),
(883, 285, '0', 52.6, 35.4, '2022-09-30 03:36:17'),
(884, 285, '0', 52.6, 35.4, '2022-09-30 03:36:18'),
(885, 285, '0', 52.6, 35.4, '2022-09-30 03:36:20'),
(886, 285, '0', 52.6, 35.4, '2022-09-30 03:36:22'),
(887, 285, '0', 52.6, 35.4, '2022-09-30 03:36:24'),
(888, 285, '0', 52.6, 35.4, '2022-09-30 03:36:25'),
(889, 285, '0', 52.6, 35.4, '2022-09-30 03:36:27'),
(890, 285, '0', 52.6, 35.4, '2022-09-30 03:36:28'),
(891, 285, '0', 52.6, 35.4, '2022-09-30 03:36:30'),
(892, 285, '0', 52.6, 35.4, '2022-09-30 03:36:32'),
(893, 285, '0', 52.6, 35.4, '2022-09-30 03:36:34'),
(894, 285, '0', 52.6, 35.4, '2022-09-30 03:36:35'),
(895, 285, '0', 52.6, 35.4, '2022-09-30 03:36:37'),
(896, 285, '0', 52.6, 35.4, '2022-09-30 03:36:38'),
(897, 285, '0', 52.6, 35.4, '2022-09-30 03:36:40'),
(898, 285, '0', 52.6, 35.4, '2022-09-30 03:36:41'),
(899, 285, '0', 52.6, 35.4, '2022-09-30 03:36:43'),
(900, 285, '0', 52.6, 35.4, '2022-09-30 03:36:44'),
(901, 285, '0', 52.6, 35.4, '2022-09-30 03:36:46'),
(902, 285, '0', 52.6, 35.4, '2022-09-30 03:36:48'),
(903, 285, '0', 52.6, 35.4, '2022-09-30 03:36:50'),
(904, 285, '0', 52.6, 35.4, '2022-09-30 03:36:51'),
(905, 285, '0', 52.6, 35.4, '2022-09-30 03:36:53'),
(906, 285, '0', 52.6, 35.4, '2022-09-30 03:36:54'),
(907, 285, '0', 52.6, 35.4, '2022-09-30 03:36:56'),
(908, 285, '0', 52.6, 35.4, '2022-09-30 03:36:58'),
(909, 285, '0', 52.6, 35.4, '2022-09-30 03:36:59'),
(910, 285, '0', 52.6, 35.4, '2022-09-30 03:37:01'),
(911, 285, '0', 52.6, 35.4, '2022-09-30 03:37:03'),
(912, 285, '0', 52.6, 35.4, '2022-09-30 03:37:04'),
(913, 285, '0', 52.6, 35.4, '2022-09-30 03:37:06'),
(914, 285, '0', 52.6, 35.4, '2022-09-30 03:37:07'),
(915, 285, '0', 52.6, 35.4, '2022-09-30 03:37:09'),
(916, 285, '0', 52.6, 35.4, '2022-09-30 03:37:11'),
(917, 285, '0', 52.6, 35.4, '2022-09-30 03:37:12'),
(918, 285, '0', 52.6, 35.4, '2022-09-30 03:37:14'),
(919, 285, '0', 52.6, 35.4, '2022-09-30 03:37:16'),
(920, 285, '0', 52.6, 35.4, '2022-09-30 03:37:17'),
(921, 285, '0', 52.6, 35.4, '2022-09-30 03:37:19'),
(922, 285, '0', 52.6, 35.4, '2022-09-30 03:37:20'),
(923, 285, '0', 52.6, 35.4, '2022-09-30 03:37:22'),
(924, 285, '0', 52.6, 35.4, '2022-09-30 03:37:23'),
(925, 285, '0', 52.6, 35.4, '2022-09-30 03:37:25'),
(926, 285, '0', 52.6, 35.4, '2022-09-30 03:37:27'),
(927, 285, '0', 52.6, 35.4, '2022-09-30 03:37:28'),
(928, 285, '0', 52.6, 35.4, '2022-09-30 03:37:30'),
(929, 285, '0', 52.6, 35.4, '2022-09-30 03:37:32'),
(930, 285, '0', 52.6, 35.4, '2022-09-30 03:37:33'),
(931, 285, '0', 52.6, 35.4, '2022-09-30 03:37:35'),
(932, 285, '0', 52.6, 35.4, '2022-09-30 03:37:36'),
(933, 285, '0', 52.6, 35.4, '2022-09-30 03:37:38'),
(934, 285, '0', 52.6, 35.4, '2022-09-30 03:37:39'),
(935, 285, '0', 52.6, 35.4, '2022-09-30 03:37:41'),
(936, 285, '0', 52.6, 35.4, '2022-09-30 03:37:43'),
(937, 285, '0', 52.6, 35.4, '2022-09-30 03:37:44'),
(938, 285, '0', 52.6, 35.4, '2022-09-30 03:37:46'),
(939, 285, '0', 52.6, 35.4, '2022-09-30 03:37:48'),
(940, 285, '0', 52.6, 35.4, '2022-09-30 03:37:50'),
(941, 285, '0', 52.6, 35.4, '2022-09-30 03:37:51'),
(942, 285, '0', 52.6, 35.4, '2022-09-30 03:37:53'),
(943, 285, '0', 52.6, 35.4, '2022-09-30 03:37:55'),
(944, 285, '0', 52.6, 35.4, '2022-09-30 03:37:56'),
(945, 285, '0', 52.6, 35.4, '2022-09-30 03:37:58'),
(946, 285, '0', 52.6, 35.4, '2022-09-30 03:37:59'),
(947, 285, '0', 52.6, 35.4, '2022-09-30 03:38:01'),
(948, 285, '0', 52.6, 35.4, '2022-09-30 03:38:03'),
(949, 285, '0', 52.6, 35.4, '2022-09-30 03:38:04'),
(950, 285, '0', 52.6, 35.4, '2022-09-30 03:38:06'),
(951, 285, '0', 52.6, 35.4, '2022-09-30 03:38:08'),
(952, 285, '0', 52.6, 35.4, '2022-09-30 03:38:09'),
(953, 285, '0', 52.6, 35.4, '2022-09-30 03:38:11'),
(954, 285, '0', 52.6, 35.4, '2022-09-30 03:38:12'),
(955, 285, '0', 52.6, 35.4, '2022-09-30 03:38:14'),
(956, 285, '0', 52.6, 35.4, '2022-09-30 03:38:16'),
(957, 285, '0', 52.6, 35.4, '2022-09-30 03:38:18'),
(958, 285, '0', 52.6, 35.4, '2022-09-30 03:38:19'),
(959, 285, '0', 52.6, 35.4, '2022-09-30 03:38:21'),
(960, 285, '0', 52.6, 35.4, '2022-09-30 03:38:23'),
(961, 285, '0', 52.6, 35.4, '2022-09-30 03:38:24'),
(962, 285, '0', 52.6, 35.4, '2022-09-30 03:38:26'),
(963, 285, '0', 52.6, 35.4, '2022-09-30 03:38:28'),
(964, 285, '0', 52.6, 35.4, '2022-09-30 03:38:30'),
(965, 285, '0', 52.6, 35.4, '2022-09-30 03:38:31'),
(966, 285, '0', 52.6, 35.4, '2022-09-30 03:38:33'),
(967, 285, '0', 52.6, 35.4, '2022-09-30 03:38:35'),
(968, 285, '0', 52.6, 35.4, '2022-09-30 03:38:37'),
(969, 285, '0', 52.6, 35.4, '2022-09-30 03:38:39'),
(970, 285, '0', 52.6, 35.4, '2022-09-30 03:38:41'),
(971, 285, '0', 52.6, 35.4, '2022-09-30 03:38:42'),
(972, 285, '0', 52.6, 35.4, '2022-09-30 03:38:44'),
(973, 285, '0', 52.6, 35.4, '2022-09-30 03:38:46'),
(974, 285, '0', 52.6, 35.4, '2022-09-30 03:38:48'),
(975, 285, '0', 52.6, 35.4, '2022-09-30 03:38:50'),
(976, 285, '0', 52.6, 35.4, '2022-09-30 03:38:51'),
(977, 285, '0', 52.6, 35.4, '2022-09-30 03:38:53'),
(978, 285, '0', 52.6, 35.4, '2022-09-30 03:38:55'),
(979, 285, '0', 52.6, 35.4, '2022-09-30 03:38:57'),
(980, 285, '0', 52.6, 35.4, '2022-09-30 03:38:58'),
(981, 285, '0', 52.6, 35.4, '2022-09-30 03:39:00'),
(982, 285, '0', 52.6, 35.4, '2022-09-30 03:39:01'),
(983, 285, '0', 52.6, 35.4, '2022-09-30 03:39:03'),
(984, 285, '0', 52.6, 35.4, '2022-09-30 03:39:05'),
(985, 285, '0', 52.6, 35.4, '2022-09-30 03:39:07'),
(986, 285, '0', 52.6, 35.4, '2022-09-30 03:39:09'),
(987, 285, '0', 52.6, 35.4, '2022-09-30 03:39:10'),
(988, 285, '0', 52.6, 35.4, '2022-09-30 03:39:12'),
(989, 285, '0', 52.6, 35.4, '2022-09-30 03:39:14'),
(990, 285, '0', 52.6, 35.4, '2022-09-30 03:39:17'),
(991, 285, '0', 52.6, 35.4, '2022-09-30 03:39:18'),
(992, 285, '0', 52.6, 35.4, '2022-09-30 03:39:20'),
(993, 285, '0', 52.6, 35.4, '2022-09-30 03:39:21'),
(994, 285, '0', 52.6, 35.4, '2022-09-30 03:39:23'),
(995, 285, '0', 52.6, 35.4, '2022-09-30 03:39:25'),
(996, 285, '0', 52.6, 35.4, '2022-09-30 03:39:26'),
(997, 285, '0', 52.6, 35.4, '2022-09-30 03:39:28'),
(998, 285, '0', 52.6, 35.4, '2022-09-30 03:39:30'),
(999, 285, '0', 52.6, 35.4, '2022-09-30 03:39:31'),
(1000, 285, '0', 52.6, 35.4, '2022-09-30 03:39:33'),
(1001, 285, '0', 52.6, 35.4, '2022-09-30 03:39:34'),
(1002, 285, '0', 52.6, 35.4, '2022-09-30 03:39:36'),
(1003, 285, '0', 52.6, 35.4, '2022-09-30 03:39:38'),
(1004, 285, '0', 52.6, 35.4, '2022-09-30 03:39:39'),
(1005, 285, '0', 52.6, 35.4, '2022-09-30 03:39:41'),
(1006, 285, '0', 52.6, 35.4, '2022-09-30 03:39:43'),
(1007, 285, '0', 52.6, 35.4, '2022-09-30 03:39:44'),
(1008, 285, '0', 52.6, 35.4, '2022-09-30 03:39:46'),
(1009, 285, '0', 52.6, 35.4, '2022-09-30 03:39:48'),
(1010, 285, '0', 52.6, 35.4, '2022-09-30 03:39:49'),
(1011, 285, '0', 52.6, 35.4, '2022-09-30 03:39:51'),
(1012, 285, '0', 52.6, 35.4, '2022-09-30 03:39:52'),
(1013, 285, '0', 52.6, 35.4, '2022-09-30 03:39:54'),
(1014, 285, '0', 52.6, 35.4, '2022-09-30 03:39:56'),
(1015, 285, '0', 52.6, 35.4, '2022-09-30 03:39:57'),
(1016, 285, '0', 52.6, 35.4, '2022-09-30 03:39:59'),
(1017, 285, '0', 52.6, 35.4, '2022-09-30 03:40:01'),
(1018, 285, '0', 52.6, 35.4, '2022-09-30 03:40:02'),
(1019, 285, '0', 52.6, 35.4, '2022-09-30 03:40:04'),
(1020, 285, '0', 52.6, 35.4, '2022-09-30 03:40:06'),
(1021, 285, '0', 52.6, 35.4, '2022-09-30 03:40:07'),
(1022, 285, '0', 52.6, 35.4, '2022-09-30 03:40:09'),
(1023, 285, '0', 52.6, 35.4, '2022-09-30 03:40:11'),
(1024, 285, '0', 52.6, 35.4, '2022-09-30 03:40:12'),
(1025, 285, '0', 52.6, 35.4, '2022-09-30 03:40:14'),
(1026, 285, '0', 52.6, 35.4, '2022-09-30 03:40:16'),
(1027, 285, '0', 52.6, 35.4, '2022-09-30 03:40:17'),
(1028, 285, '0', 52.6, 35.4, '2022-09-30 03:40:19'),
(1029, 285, '0', 52.6, 35.4, '2022-09-30 03:40:21'),
(1030, 285, '0', 52.6, 35.4, '2022-09-30 03:40:22'),
(1031, 285, '0', 52.6, 35.4, '2022-09-30 03:40:24'),
(1032, 285, '0', 52.6, 35.4, '2022-09-30 03:40:26'),
(1033, 285, '0', 52.6, 35.4, '2022-09-30 03:40:28'),
(1034, 285, '0', 52.6, 35.4, '2022-09-30 03:40:29'),
(1035, 285, '0', 52.6, 35.4, '2022-09-30 03:40:31'),
(1036, 285, '0', 52.6, 35.4, '2022-09-30 03:40:32'),
(1037, 285, '0', 52.6, 35.4, '2022-09-30 03:40:34'),
(1038, 285, '0', 52.6, 35.4, '2022-09-30 03:40:36'),
(1039, 285, '0', 52.6, 35.4, '2022-09-30 03:40:38'),
(1040, 285, '0', 52.6, 35.4, '2022-09-30 03:40:39'),
(1041, 285, '0', 52.6, 35.4, '2022-09-30 03:40:41'),
(1042, 285, '0', 52.6, 35.4, '2022-09-30 03:40:43'),
(1043, 285, '0', 52.6, 35.4, '2022-09-30 03:40:44'),
(1044, 285, '0', 52.6, 35.4, '2022-09-30 03:40:46'),
(1045, 285, '0', 52.6, 35.4, '2022-09-30 03:40:49'),
(1046, 285, '0', 52.6, 35.4, '2022-09-30 03:40:50'),
(1047, 285, '0', 52.6, 35.4, '2022-09-30 03:40:52'),
(1048, 285, '0', 52.6, 35.4, '2022-09-30 03:40:54'),
(1049, 285, '0', 52.6, 35.4, '2022-09-30 03:40:56'),
(1050, 285, '0', 52.6, 35.4, '2022-09-30 03:40:57'),
(1051, 285, '0', 52.6, 35.4, '2022-09-30 03:40:59'),
(1052, 285, '0', 52.6, 35.4, '2022-09-30 04:35:37'),
(1053, 285, '0', 52.6, 35.4, '2022-09-30 04:35:38'),
(1054, 285, '0', 52.6, 35.4, '2022-09-30 04:35:40'),
(1055, 285, '0', 52.6, 35.4, '2022-09-30 04:35:41'),
(1056, 285, '0', 52.6, 35.4, '2022-09-30 04:35:43'),
(1057, 285, '0', 52.6, 35.4, '2022-09-30 04:35:44'),
(1058, 285, '0', 52.6, 35.4, '2022-09-30 04:35:46'),
(1059, 285, '0', 52.6, 35.4, '2022-09-30 04:35:48'),
(1060, 285, '0', 52.6, 35.4, '2022-09-30 04:35:49'),
(1061, 285, '0', 52.6, 35.4, '2022-09-30 04:35:51'),
(1062, 285, '0', 52.6, 35.4, '2022-09-30 04:35:53'),
(1063, 285, '0', 52.6, 35.4, '2022-09-30 04:35:54'),
(1064, 285, '0', 52.6, 35.4, '2022-09-30 04:35:56'),
(1065, 285, '0', 52.6, 35.4, '2022-09-30 04:35:58'),
(1066, 285, '0', 52.6, 35.4, '2022-09-30 04:36:00'),
(1067, 285, '0', 52.6, 35.4, '2022-09-30 04:36:01'),
(1068, 285, '0', 52.6, 35.4, '2022-09-30 04:36:03'),
(1069, 285, '0', 52.6, 35.4, '2022-09-30 04:36:05'),
(1070, 285, '0', 52.6, 35.4, '2022-09-30 04:36:06'),
(1071, 285, '0', 52.6, 35.4, '2022-09-30 04:36:08'),
(1072, 285, '0', 52.6, 35.4, '2022-09-30 04:36:10'),
(1073, 285, '0', 52.6, 35.4, '2022-09-30 04:36:12'),
(1074, 285, '0', 52.6, 35.4, '2022-09-30 04:36:13'),
(1075, 285, '0', 52.6, 35.4, '2022-09-30 04:36:15'),
(1076, 285, '0', 52.6, 35.4, '2022-09-30 04:36:17'),
(1077, 285, '0', 52.6, 35.4, '2022-09-30 04:36:18'),
(1078, 285, '0', 52.6, 35.4, '2022-09-30 04:36:20'),
(1079, 285, '0', 52.6, 35.4, '2022-09-30 04:36:22'),
(1080, 285, '0', 52.6, 35.4, '2022-09-30 04:36:24'),
(1081, 285, '0', 52.6, 35.4, '2022-09-30 04:36:26'),
(1082, 285, '0', 52.6, 35.4, '2022-09-30 04:36:27'),
(1083, 285, '0', 52.6, 35.4, '2022-09-30 04:36:29'),
(1084, 285, '0', 52.6, 35.4, '2022-09-30 04:36:31'),
(1085, 285, '0', 52.6, 35.4, '2022-09-30 04:36:32'),
(1086, 285, '0', 52.6, 35.4, '2022-09-30 04:36:34'),
(1087, 285, '0', 52.6, 35.4, '2022-09-30 04:36:36'),
(1088, 285, '0', 52.6, 35.4, '2022-09-30 04:36:37'),
(1089, 285, '0', 52.6, 35.4, '2022-09-30 04:36:39'),
(1090, 285, '0', 52.6, 35.4, '2022-09-30 04:36:40'),
(1091, 285, '0', 52.6, 35.4, '2022-09-30 04:36:42'),
(1092, 285, '0', 52.6, 35.4, '2022-09-30 04:36:43'),
(1093, 285, '0', 52.6, 35.4, '2022-09-30 04:36:45'),
(1094, 285, '0', 52.6, 35.4, '2022-09-30 04:36:47'),
(1095, 285, '0', 52.6, 35.4, '2022-09-30 04:36:48'),
(1096, 285, '0', 52.6, 35.4, '2022-09-30 04:36:50'),
(1097, 285, '0', 52.6, 35.4, '2022-09-30 04:36:51'),
(1098, 285, '0', 52.6, 35.4, '2022-09-30 04:36:55'),
(1099, 285, '0', 52.6, 35.4, '2022-09-30 04:36:57'),
(1100, 285, '0', 52.6, 35.4, '2022-09-30 04:36:59'),
(1101, 285, '0', 52.6, 35.4, '2022-09-30 04:37:00'),
(1102, 285, '0', 52.6, 35.4, '2022-09-30 04:37:02'),
(1103, 285, '0', 52.6, 35.4, '2022-09-30 04:37:03');
INSERT INTO `d_timbangan` (`id_timbangan`, `id_ternak`, `rf_id`, `berat_berkala`, `suhu_berkala`, `tanggal`) VALUES
(1104, 285, '0', 52.6, 35.4, '2022-09-30 04:37:05'),
(1105, 285, '0', 52.6, 35.4, '2022-09-30 04:37:06'),
(1106, 285, '0', 52.6, 35.4, '2022-09-30 04:37:08'),
(1107, 285, '0', 52.6, 35.4, '2022-09-30 04:37:10'),
(1108, 285, '0', 52.6, 35.4, '2022-09-30 04:37:11'),
(1109, 285, '0', 52.6, 35.4, '2022-09-30 04:37:13'),
(1110, 285, '0', 52.6, 35.4, '2022-09-30 04:37:14'),
(1111, 285, '0', 52.6, 35.4, '2022-09-30 04:37:16'),
(1112, 285, '0', 52.6, 35.4, '2022-09-30 04:37:17'),
(1113, 285, '0', 52.6, 35.4, '2022-09-30 04:37:19'),
(1114, 285, '0', 52.6, 35.4, '2022-09-30 04:37:21'),
(1115, 285, '0', 52.6, 35.4, '2022-09-30 04:37:22'),
(1116, 285, '0', 52.6, 35.4, '2022-09-30 04:37:24'),
(1117, 285, '0', 52.6, 35.4, '2022-09-30 04:37:26'),
(1118, 285, '0', 52.6, 35.4, '2022-09-30 04:37:27'),
(1119, 285, '0', 52.6, 35.4, '2022-09-30 06:03:34'),
(1120, 285, '0', 52.6, 35.4, '2022-09-30 06:04:52'),
(1121, 285, '0', 52.6, 35.4, '2022-09-30 06:08:32');

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
  `id_varietas` int(6) NOT NULL,
  `nama_varietas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `d_varietas`
--

INSERT INTO `d_varietas` (`id_varietas`, `nama_varietas`) VALUES
(1, 'Dorper'),
(2, 'Texel'),
(3, 'Merino'),
(4, 'Dombos'),
(5, 'Garut'),
(6, 'Ekor tipis'),
(7, 'Ekor gemuk'),
(8, 'Batur'),
(9, 'St. Croix'),
(10, 'Suffolk'),
(11, 'Barbados Blackbelly'),
(12, 'Kisar'),
(13, 'Donggala'),
(14, 'Indramayu '),
(15, 'Jonggol'),
(16, 'Rote'),
(17, 'Dorset'),
(18, 'Sumbawa'),
(19, 'Waringin'),
(20, 'Peranakan texel'),
(21, 'Peranakan merino'),
(23, 'Peranakan dorper'),
(24, 'Peranakan dombos'),
(25, 'Peranakan garut'),
(26, 'Peranakan ekor tipis'),
(27, 'Peranakan ekor gemuk'),
(28, 'Peranakan batur'),
(29, 'Peranakan St. Croix'),
(30, 'Peranakan Suffolk'),
(31, 'Peranakan Barbados Blackbelly'),
(32, 'Peranakan Kisar'),
(33, 'Peranakan Donggala'),
(34, 'Peranakan Indramayu'),
(35, 'Peranakan Jonggol'),
(36, 'Peranakan Rote'),
(37, 'Peranakan Dorset'),
(38, 'Peranakan Sumbawa'),
(39, 'Peranakan Waringin'),
(40, 'Tanduk 4');

-- --------------------------------------------------------

--
-- Table structure for table `list_jenis_kelamin`
--

CREATE TABLE `list_jenis_kelamin` (
  `id_jenis` int(6) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_jenis_kelamin`
--

INSERT INTO `list_jenis_kelamin` (`id_jenis`, `nama`) VALUES
(1, 'Jantan'),
(2, 'Betina');

-- --------------------------------------------------------

--
-- Table structure for table `list_status_keluar`
--

CREATE TABLE `list_status_keluar` (
  `id_keluar` int(6) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_status_keluar`
--

INSERT INTO `list_status_keluar` (`id_keluar`, `nama`) VALUES
(1, 'Jual'),
(2, 'Sembelih'),
(3, 'Mati');

-- --------------------------------------------------------

--
-- Table structure for table `list_status_kesehatan`
--

CREATE TABLE `list_status_kesehatan` (
  `id_status` int(6) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_status_kesehatan`
--

INSERT INTO `list_status_kesehatan` (`id_status`, `nama`) VALUES
(1, 'Sehat'),
(2, 'Sakit'),
(3, 'Sembuh');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220330045606-create-users-table.js');

-- --------------------------------------------------------

--
-- Table structure for table `s_ternak`
--

CREATE TABLE `s_ternak` (
  `id_ternak` int(6) NOT NULL,
  `nomor` int(6) NOT NULL,
  `rf_id` varchar(60) DEFAULT NULL,
  `id_users` int(11) DEFAULT NULL,
  `foto` varchar(64) DEFAULT NULL,
  `jenis_kelamin` set('Betina','Jantan') DEFAULT NULL,
  `id_varietas` int(6) DEFAULT NULL,
  `berat_berkala` float NOT NULL,
  `suhu_berkala` float NOT NULL,
  `tanggal_lahir` datetime NOT NULL,
  `usia` int(11) DEFAULT NULL,
  `tanggal_masuk` datetime NOT NULL,
  `id_induk` int(6) DEFAULT NULL,
  `id_pejantan` int(6) DEFAULT NULL,
  `status_sehat` set('Sehat','Sakit','Sembuh') NOT NULL,
  `id_penyakit` int(6) NOT NULL DEFAULT 32,
  `id_pakan` int(6) NOT NULL,
  `fase_pemeliharaan` int(11) NOT NULL,
  `id_kandang` int(6) NOT NULL,
  `tanggal_kawin` date DEFAULT NULL,
  `tanggal_keluar` datetime DEFAULT NULL,
  `status_keluar` set('Jual','Sembelih','Mati') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `s_ternak`
--

INSERT INTO `s_ternak` (`id_ternak`, `nomor`, `rf_id`, `id_users`, `foto`, `jenis_kelamin`, `id_varietas`, `berat_berkala`, `suhu_berkala`, `tanggal_lahir`, `usia`, `tanggal_masuk`, `id_induk`, `id_pejantan`, `status_sehat`, `id_penyakit`, `id_pakan`, `fase_pemeliharaan`, `id_kandang`, `tanggal_kawin`, `tanggal_keluar`, `status_keluar`) VALUES
(170, 1, NULL, 10, NULL, 'Betina', 5, 80, 35, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(172, 2, NULL, 10, NULL, 'Betina', 5, 22.15, 39, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(173, 3, NULL, 10, NULL, 'Betina', 5, 34.7, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 6, 1, NULL, NULL, NULL),
(174, 4, NULL, 10, NULL, 'Betina', 5, 20.6, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(176, 5, NULL, 10, NULL, 'Jantan', 2, 80, 38, '2022-01-01 00:00:00', NULL, '2022-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 4, NULL, NULL, NULL),
(180, 6, NULL, 10, NULL, 'Betina', 5, 19.85, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(181, 7, NULL, 10, NULL, 'Betina', 5, 28.3, 38, '2020-06-02 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(182, 8, NULL, 10, NULL, 'Betina', 5, 28.45, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 1, 1, 6, 1, NULL, NULL, NULL),
(183, 9, NULL, 10, NULL, 'Betina', 5, 30.35, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(185, 11, NULL, 10, NULL, 'Betina', 5, 19.8, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(186, 12, NULL, 10, NULL, 'Betina', 5, 24.85, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(187, 13, NULL, 10, NULL, 'Jantan', 40, 52, 38, '2020-01-01 00:00:00', NULL, '2021-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 4, NULL, NULL, NULL),
(188, 14, NULL, 10, NULL, 'Betina', 5, 28.45, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(189, 15, NULL, 10, NULL, 'Betina', 5, 26.15, 39, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 1, 1, 6, 1, NULL, NULL, NULL),
(190, 16, NULL, 10, NULL, 'Betina', 5, 23.5, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(191, 17, NULL, 10, NULL, 'Betina', 5, 24.35, 38, '2019-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(192, 18, NULL, 10, NULL, 'Betina', 5, 29.05, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(193, 19, NULL, 10, NULL, 'Betina', 5, 33.55, 39, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(194, 20, NULL, 10, NULL, 'Betina', 5, 25.25, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(195, 21, NULL, 10, NULL, 'Jantan', 5, 50, 38, '2022-01-01 00:00:00', NULL, '2021-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 4, NULL, NULL, NULL),
(196, 22, NULL, 10, NULL, 'Betina', 5, 25.9, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(197, 23, NULL, 10, NULL, 'Betina', 5, 22.2, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(198, 24, NULL, 10, NULL, 'Jantan', 7, 60, 38, '2021-01-01 00:00:00', NULL, '2022-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 4, NULL, NULL, NULL),
(199, 25, NULL, 10, NULL, 'Betina', 5, 29.95, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(200, 26, NULL, 10, NULL, 'Betina', 5, 31.3, 39, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(201, 27, NULL, 10, NULL, 'Jantan', 2, 130, 38, '2019-01-01 00:00:00', NULL, '2022-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 1, NULL, NULL, NULL),
(202, 28, NULL, 10, NULL, 'Betina', 5, 25.1, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(203, 29, NULL, 10, NULL, 'Betina', 5, 33.75, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(204, 30, NULL, 10, NULL, 'Betina', 5, 24.2, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(205, 31, NULL, 10, NULL, 'Jantan', 2, 90, 38, '2021-01-01 00:00:00', NULL, '2022-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 1, NULL, NULL, NULL),
(206, 32, NULL, 10, NULL, 'Betina', 5, 23.3, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(207, 33, NULL, 10, NULL, 'Betina', 5, 27.1, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(208, 34, NULL, 10, NULL, 'Betina', 5, 25.2, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(209, 35, NULL, 10, NULL, 'Betina', 5, 20.25, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(210, 36, NULL, 10, NULL, 'Jantan', 1, 75, 38, '2020-01-01 00:00:00', NULL, '2022-01-01 00:00:00', 0, 0, 'Sehat', 32, 1, 4, 1, NULL, NULL, NULL),
(211, 37, NULL, 10, NULL, 'Betina', 5, 24.55, 39, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(212, 38, NULL, 10, NULL, 'Betina', 5, 25.8, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(213, 39, NULL, 10, NULL, 'Betina', 5, 21.05, 39, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(214, 40, NULL, 10, NULL, 'Betina', 5, 21.15, 39, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(215, 41, NULL, 10, NULL, 'Betina', 5, 22.8, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(216, 42, NULL, 10, NULL, 'Betina', 5, 26.95, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(217, 43, NULL, 10, NULL, 'Betina', 5, 31, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(218, 44, NULL, 10, NULL, 'Betina', 5, 22.2, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(219, 45, NULL, 10, NULL, 'Betina', 5, 23.85, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(220, 46, NULL, 10, NULL, 'Betina', 5, 24, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 2, 1, 6, 1, NULL, NULL, NULL),
(221, 47, NULL, 10, NULL, 'Betina', 5, 23.95, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(222, 48, NULL, 10, NULL, 'Betina', 5, 30, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(223, 49, NULL, 10, NULL, 'Betina', 5, 18.6, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(224, 50, NULL, 10, NULL, 'Betina', 5, 27.5, 38.5, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 1, 1, 6, 1, NULL, NULL, NULL),
(225, 51, NULL, 10, NULL, 'Betina', 5, 29, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(226, 52, NULL, 10, NULL, 'Betina', 5, 22.65, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(227, 53, NULL, 10, NULL, 'Betina', 5, 24.65, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(228, 54, NULL, 10, NULL, 'Betina', 5, 28.05, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(229, 55, NULL, 10, NULL, 'Betina', 5, 26.4, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(230, 56, NULL, 10, NULL, 'Betina', 5, 25.5, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(231, 57, NULL, 10, NULL, 'Betina', 5, 28.45, 39, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(232, 58, NULL, 10, NULL, 'Betina', 5, 25.1, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(233, 59, NULL, 10, NULL, 'Betina', 5, 26, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(234, 60, NULL, 10, NULL, 'Betina', 5, 26.35, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 6, 1, NULL, NULL, NULL),
(235, 61, NULL, 10, NULL, 'Betina', 5, 27.75, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(236, 62, NULL, 10, NULL, 'Betina', 5, 24.5, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(237, 63, NULL, 10, NULL, 'Betina', 5, 24.65, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(238, 64, NULL, 10, NULL, 'Betina', 5, 20.85, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(239, 65, NULL, 10, NULL, 'Betina', 5, 26.35, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 6, 1, NULL, NULL, NULL),
(240, 66, NULL, 10, NULL, 'Betina', 5, 23.25, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(241, 67, NULL, 10, NULL, 'Betina', 5, 20.7, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(242, 68, NULL, 10, NULL, 'Betina', 5, 24.3, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(243, 69, NULL, 10, NULL, 'Betina', 5, 28.05, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(244, 70, NULL, 10, NULL, 'Betina', 5, 29.5, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(245, 71, '', 10, NULL, 'Betina', 5, 32.8, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(246, 72, NULL, 10, NULL, 'Betina', 5, 24.15, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 2, 1, 6, 2, NULL, NULL, NULL),
(247, 73, NULL, 10, NULL, 'Betina', 5, 23.75, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(248, 74, NULL, 10, NULL, 'Betina', 5, 28.2, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(249, 75, NULL, 10, NULL, 'Betina', 5, 23.25, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 2, NULL, NULL, NULL),
(250, 76, '', 10, NULL, 'Betina', 5, 28.9, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 8, 1, NULL, NULL, NULL),
(251, 77, '', 10, NULL, 'Betina', 5, 32.2, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(252, 78, '', 10, NULL, 'Betina', 5, 28, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(253, 79, '', 10, NULL, 'Betina', 5, 35.4, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(254, 80, '', 10, NULL, 'Betina', 5, 29.95, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(255, 81, '', 10, NULL, 'Betina', 5, 27.7, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(256, 82, NULL, 10, NULL, 'Betina', 5, 26.2, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(257, 83, NULL, 10, NULL, 'Betina', 5, 23.55, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(258, 84, '', 10, NULL, 'Betina', 5, 25.85, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(259, 85, '', 10, NULL, 'Betina', 5, 32.15, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(260, 86, '', 10, NULL, 'Betina', 5, 32.15, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(261, 87, NULL, 10, NULL, 'Betina', 5, 6.2, 38, '2022-01-16 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 3, 1, 1, 3, NULL, NULL, NULL),
(262, 88, NULL, 10, NULL, 'Betina', 6, 9, 38, '2021-12-23 00:00:00', NULL, '2022-01-28 00:00:00', 40, 0, 'Sehat', 32, 1, 1, 3, NULL, NULL, NULL),
(263, 89, NULL, 10, NULL, 'Betina', 6, 6, 38, '2022-02-10 00:00:00', NULL, '2022-01-28 00:00:00', 41, 0, 'Sehat', 32, 1, 1, 3, NULL, NULL, NULL),
(264, 90, NULL, 10, NULL, 'Betina', 5, 5, 38, '2022-01-16 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 3, 1, 1, 3, NULL, NULL, NULL),
(265, 91, NULL, 10, NULL, 'Betina', 5, 27.4, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(266, 92, NULL, 10, NULL, 'Betina', 5, 23.4, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(267, 93, NULL, 10, NULL, 'Betina', 5, 26.2, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(268, 94, NULL, 10, NULL, 'Betina', 5, 27.6, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(269, 95, NULL, 10, NULL, 'Betina', 5, 27.3, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(270, 96, NULL, 10, NULL, 'Betina', 5, 23, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(271, 97, NULL, 10, NULL, 'Betina', 5, 21.8, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(272, 98, NULL, 10, NULL, 'Betina', 5, 21.7, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(273, 99, NULL, 10, NULL, 'Betina', 5, 27.4, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(274, 100, NULL, 10, NULL, 'Betina', 5, 26.5, 38, '2020-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(275, 101, NULL, 10, NULL, 'Betina', 5, 23.85, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 6, 3, NULL, NULL, NULL),
(276, 102, NULL, 10, NULL, 'Betina', 5, 24.5, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(277, 103, NULL, 10, NULL, 'Betina', 5, 23.6, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 3, NULL, NULL, NULL),
(279, 104, '', 10, NULL, 'Betina', 5, 29.25, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 6, 1, NULL, NULL, NULL),
(280, 105, '', 10, NULL, 'Betina', 5, 22.8, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(282, 107, '00e2001a83191322050669e0c1ff', 10, NULL, 'Betina', 5, 30.05, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(283, 108, '00e2001a8319132204066a20cdff', 10, NULL, 'Betina', 5, 26.05, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(284, 109, '00e2001a831913217206722075ff', 10, NULL, 'Betina', 5, 24.45, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 6, 1, NULL, NULL, NULL),
(285, 110, '00e2001a8319132186066e6071ff', 10, NULL, 'Betina', 5, 52.6, 35.4, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 2, 1, 8, 1, NULL, NULL, NULL),
(286, 111, '00e2001a8319132185066ee079ff', 10, NULL, 'Betina', 5, 30.94, 35, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sembuh', 31, 1, 6, 1, NULL, NULL, NULL),
(287, 112, '00e2001a83191321710672a07dff', 10, NULL, 'Betina', 5, 29.25, 38, '2021-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sehat', 32, 1, 34, 1, NULL, NULL, NULL),
(288, 113, '00e2001a8319132187066ea05dff', 10, NULL, 'Betina', 5, 25.15, 38, '2022-01-01 00:00:00', NULL, '2022-01-28 00:00:00', 0, 0, 'Sakit', 4, 1, 5, 1, NULL, NULL, NULL),
(300, 114, 'Vshsjh2y28929', 10, NULL, 'Jantan', 1, 40, 40, '2022-06-01 00:00:00', NULL, '2022-06-02 00:00:00', 0, 0, 'Sehat', 32, 4, 2, 4, NULL, NULL, NULL),
(302, 116, 'test2', 10, NULL, 'Jantan', 1, 30, 21, '2022-09-27 00:00:00', NULL, '2022-09-27 00:00:00', 1, 5, 'Sehat', 32, 3, 1, 25, NULL, NULL, NULL),
(303, 1, '1', 30, NULL, 'Betina', 2, 12, 12, '2022-09-27 00:00:00', NULL, '2022-09-27 00:00:00', 12, 12, 'Sehat', 32, 12, 6, 26, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `update_profil`
--

CREATE TABLE `update_profil` (
  `id` int(6) NOT NULL,
  `id_users` int(6) NOT NULL,
  `nama_mitra` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(300) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `update_profil`
--

INSERT INTO `update_profil` (`id`, `id_users`, `nama_mitra`, `username`, `email`, `no_hp`, `alamat`) VALUES
(1, 10, 'Dian Permata Aprilia', '023', 'Dian@gmail.com', '81232390', 'Banyuwangiii'),
(2, 10, 'Dian Permata', '02', 'dianpermata@gmail.com', '1234567', 'Banyuwangi'),
(3, 10, 'Dian Permata AD', '02', 'dianpermata@gmail.com', '1234567', 'Banyuwangi'),
(4, 10, 'Dian Permata ', '03', 'dian@gmail.com', '1281923', 'Banyuwangi'),
(5, 10, 'Dian Permata ', '02', 'dian@gmail.com', '81234999', 'Banyuwangi'),
(6, 10, 'Dian Permata ', '03', 'dian@gmail.com', '22222222', 'Banyuwangi'),
(7, 10, 'Dian Permata ', '02', 'dian@gmail.com', '11111111', 'Banyuwangi'),
(8, 10, 'Dian Permata ', '03', 'dian@gmail.com', '22222222', 'Banyuwangi'),
(9, 10, 'Dian Permata ', '02', 'dian@gmail.com', '11111111', 'Banyuwangi'),
(10, 10, 'Dian Permata ', '02', 'dian@gmail.com', '333333333', 'Banyuwangi'),
(11, 10, 'Dian Permata ', '02', 'dian@gmail.com', '44444444', 'Banyuwangi'),
(12, 10, 'Dian Permata ', '02', 'dian@gmail.com', '44445555', 'Banyuwangi'),
(13, 10, 'Dian tok', '03', 'dian@gmail.com', '4444464', 'Banyuwangi'),
(14, 10, 'Dian tok', '03', 'dian@gmail.com', '444446456', 'Banyuwangi'),
(15, 10, 'Dian tok', '03', 'dian@gmail.com', '444444444444444', 'Banyuwangi'),
(16, 10, 'Dian tok', '03', 'dian@gmail.com', '4444464', 'Banyuwangi'),
(17, 10, 'Dian tok', '03', 'dian@gmail.com', '4444464', 'Banyuwangi'),
(18, 10, 'Dian tok', '02', 'dian@gmail.com', '4444464', 'Banyuwangi'),
(19, 30, 'wisnu putra wardana', 'whisky', 'wisnupw4@gmail.com', '8124912', 'Banyuwangi, Jawa Timur'),
(20, 30, 'wisnu putra wardana', 'whisky', 'wisnupw4@gmail.com', '081249122477', 'Banyuwangi, Jawa Timur'),
(21, 30, 'wisnu putra wardana', 'whisky', 'wisnupw6@gmail.com', '081249122477', 'Banyuwangi, Jawa Timur'),
(22, 30, 'wisnu putra wardana', 'whisky', 'wisnupw7@gmail.com', '081249122477', 'Banyuwangi, Jawa Timur'),
(23, 10, 'Dian Permata Apriliana Dewi', '02', 'dian@gmail.com', '081249122488', 'Banyuwangi');

--
-- Triggers `update_profil`
--
DELIMITER $$
CREATE TRIGGER `update_profil` AFTER INSERT ON `update_profil` FOR EACH ROW BEGIN
	UPDATE auth_users SET id_users = NEW.id_users, nama_mitra = NEW.nama_mitra, username = NEW.username, email = NEW.email, no_hp = NEW.no_hp, alamat = NEW.alamat
    WHERE id_users = NEW.id_users;
 END
$$
DELIMITER ;

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
  ADD PRIMARY KEY (`id_fp`);

--
-- Indexes for table `d_harga`
--
ALTER TABLE `d_harga`
  ADD PRIMARY KEY (`id_harga`);

--
-- Indexes for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD PRIMARY KEY (`id_kandang`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD PRIMARY KEY (`id_kawin`),
  ADD KEY `id_ternak` (`id_ternak`);

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
-- Indexes for table `d_penjualan`
--
ALTER TABLE `d_penjualan`
  ADD PRIMARY KEY (`id_penjualan`),
  ADD KEY `id_users` (`id_penjual`),
  ADD KEY `id_pembeli` (`id_pembeli`);

--
-- Indexes for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  ADD PRIMARY KEY (`id_penyakit`);

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
-- Indexes for table `list_jenis_kelamin`
--
ALTER TABLE `list_jenis_kelamin`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `list_status_keluar`
--
ALTER TABLE `list_status_keluar`
  ADD PRIMARY KEY (`id_keluar`);

--
-- Indexes for table `list_status_kesehatan`
--
ALTER TABLE `list_status_kesehatan`
  ADD PRIMARY KEY (`id_status`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

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
-- Indexes for table `update_profil`
--
ALTER TABLE `update_profil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_users`
--
ALTER TABLE `auth_users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `d_detail_penjualan`
--
ALTER TABLE `d_detail_penjualan`
  MODIFY `id_detail` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_fase_pemeliharaan`
--
ALTER TABLE `d_fase_pemeliharaan`
  MODIFY `id_fp` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `d_harga`
--
ALTER TABLE `d_harga`
  MODIFY `id_harga` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `d_kandang`
--
ALTER TABLE `d_kandang`
  MODIFY `id_kandang` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `d_kawin`
--
ALTER TABLE `d_kawin`
  MODIFY `id_kawin` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `d_kesehatan`
--
ALTER TABLE `d_kesehatan`
  MODIFY `id_kesehatan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `d_pakan`
--
ALTER TABLE `d_pakan`
  MODIFY `id_pakan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `d_penjualan`
--
ALTER TABLE `d_penjualan`
  MODIFY `id_penjualan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `d_penyakit`
--
ALTER TABLE `d_penyakit`
  MODIFY `id_penyakit` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  MODIFY `id_timbangan` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1124;

--
-- AUTO_INCREMENT for table `d_varietas`
--
ALTER TABLE `d_varietas`
  MODIFY `id_varietas` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `list_jenis_kelamin`
--
ALTER TABLE `list_jenis_kelamin`
  MODIFY `id_jenis` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `list_status_keluar`
--
ALTER TABLE `list_status_keluar`
  MODIFY `id_keluar` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `list_status_kesehatan`
--
ALTER TABLE `list_status_kesehatan`
  MODIFY `id_status` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `s_ternak`
--
ALTER TABLE `s_ternak`
  MODIFY `id_ternak` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;

--
-- AUTO_INCREMENT for table `update_profil`
--
ALTER TABLE `update_profil`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `d_detail_penjualan`
--
ALTER TABLE `d_detail_penjualan`
  ADD CONSTRAINT `d_detail_penjualan_ibfk_1` FOREIGN KEY (`id_penjualan`) REFERENCES `d_penjualan` (`id_penjualan`);

--
-- Constraints for table `d_kandang`
--
ALTER TABLE `d_kandang`
  ADD CONSTRAINT `d_kandang_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`);

--
-- Constraints for table `d_kawin`
--
ALTER TABLE `d_kawin`
  ADD CONSTRAINT `d_kawin_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`);

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
  ADD CONSTRAINT `d_pakan_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`);

--
-- Constraints for table `d_penjualan`
--
ALTER TABLE `d_penjualan`
  ADD CONSTRAINT `d_penjualan_ibfk_1` FOREIGN KEY (`id_penjual`) REFERENCES `auth_users` (`id_users`),
  ADD CONSTRAINT `d_penjualan_ibfk_3` FOREIGN KEY (`id_pembeli`) REFERENCES `auth_users` (`id_users`);

--
-- Constraints for table `d_timbangan`
--
ALTER TABLE `d_timbangan`
  ADD CONSTRAINT `d_timbangan_ibfk_1` FOREIGN KEY (`id_ternak`) REFERENCES `s_ternak` (`id_ternak`);

--
-- Constraints for table `s_ternak`
--
ALTER TABLE `s_ternak`
  ADD CONSTRAINT `s_ternak_ibfk_10` FOREIGN KEY (`fase_pemeliharaan`) REFERENCES `d_fase_pemeliharaan` (`id_fp`),
  ADD CONSTRAINT `s_ternak_ibfk_11` FOREIGN KEY (`id_penyakit`) REFERENCES `d_penyakit` (`id_penyakit`),
  ADD CONSTRAINT `s_ternak_ibfk_2` FOREIGN KEY (`id_varietas`) REFERENCES `d_varietas` (`id_varietas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `s_ternak_ibfk_6` FOREIGN KEY (`id_pakan`) REFERENCES `d_pakan` (`id_pakan`),
  ADD CONSTRAINT `s_ternak_ibfk_7` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`),
  ADD CONSTRAINT `s_ternak_ibfk_9` FOREIGN KEY (`id_kandang`) REFERENCES `d_kandang` (`id_kandang`);

--
-- Constraints for table `update_profil`
--
ALTER TABLE `update_profil`
  ADD CONSTRAINT `update_profil_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `auth_users` (`id_users`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
