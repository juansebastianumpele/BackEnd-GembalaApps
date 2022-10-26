'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_penyakit', [
      {
        nama_penyakit: "Diare",
        gejala: "Feses domba diare biasanya juga disertai darah, lendir dan bau yang tidak sedap",
        penanganan: "pemberian obat diare, pemberian obat herbal"
      },
      {
        nama_penyakit: "Kembung",
        gejala: "Perut yang membesar dan menonjol keluar dan berisi gas",
        penanganan: "Trocar (coblos perut domba), pemberian obat"
      },
      {
        nama_penyakit: "ORF",
        gejala: "Iritasi berwarna kemerahan pada bagian mulut dan hidung, domba tidak nafsu makan",
        penanganan: "Pemberian obat spray, pengobatan salep dan sanitasi bagian tubuh yang terinfeksi "
      },
      {
        nama_penyakit: "Pink Eye",
        gejala: "mata merah berair hingga kornea mata dapat berubah warna menjadi putih",
        penanganan: "Pemberian obat salep dan rutin membersihkan area mata"
      },
      {
        nama_penyakit: "Scabies",
        gejala: "terdapat eksim pada kulit ternak dan ternak merasa tidak nyaman",
        penanganan: "Obat semprot dan suntik"
      },
      {
        nama_penyakit: "Mastitis",
        gejala: "gejala pembengkakan, pengerasan ambing, rasa sakit, panas, serta kemerahan bahkan sampai terjadi penurunan fungsi ambing",
        penanganan: "Obat suntik mastitis"
      },
      {
        nama_penyakit: "Asidosis",
        gejala: "Lesu, tidak mampu berdiri, suhu tubuh kurang normal, menurunnya nafsu makan, feses berair, denyut jantung terasa lemah dan lebih cepat.",
        penanganan: "Pemberian cairan ber pH 8+"
      },
      {
        nama_penyakit: "Cacingan",
        gejala: "kurus seperti berat badan tidak sesuai umur, bulu agak berdiri dan kusam, sembelit atau kotoran lembek sampai mencret sehingga kandang cepat kotor, terlihat lesu dan pucat serta nafsu makan berkurang,",
        penanganan: "Pemberian obat cacing"
      },
      {
        nama_penyakit: "Antraks",
        gejala: "Suhu tubuh tinggi, keluar cairan dari lubang hidung dan dubur, tubuh gemetar dan nafsu makan hilang",
        penanganan: "Obat suntik antraks"
      },
      {
        nama_penyakit: "Ngorok",
        gejala: "Gangguan pernapasan, sesak napas, suara ngorok dengan gigi gemeretak",
        penanganan: "Suntik antibiotik"
      },
      {
        nama_penyakit: "Radang Pusar",
        gejala: "Pembengkakan disekitar pusar",
        penanganan: "Penggunaan antibiotik"
      },
      {
        nama_penyakit: "Prolapsus",
        gejala: "Keluarnya sebagian organ uterus yang terjadi waktu kelahiran",
        penanganan: "Pengembalian organ ke posisi semula"
      },
      {
        nama_penyakit: "Distokia",
        gejala: "ambing (penghasil susu) membengkak meneteskan kolostrum, kelamin betina bengkak mengeluarkan lendir, merejan dan posisi badan membungkuk, sulit mengeluarkan anak.",
        penanganan: "Pengobatan distokia harus dikonsultasikan dan ditangani oleh dokter hewan atau tenaga medis veteriner. Mengembalikan posisi anak pada posisi normal dengan cara didorong, diputar dan ditarik."
      },
      {
        nama_penyakit: "Artritis",
        gejala: "pembengkakan pada persendian, pincang yang menyebabkan tidak bisa berdiri",
        penanganan: "pemberian obat anti inflamasi nonsteroid"
      },
      {
        nama_penyakit: "Miasis",
        gejala: "Terdapat luka yang mengeluarkan lendir dan nanah, suhu tubuh meningkat",
        penanganan: "Membersihkan luka hingga bersih dari larva serangga, pemberian antibiotik"
      },
      {
        nama_penyakit: "Busuk Kuku",
        gejala: "Kuku bengkak dan busuk",
        penanganan: "Pemotongan kuku kemudian diberi antiseptik ex: formaldehid 10-20%. Kemudian diberi salep sulfatizol dan perban bagian kuku yang busuk"
      },
      {
        nama_penyakit: "Radang paha",
        gejala: "kematian mendadak, kaki pincang, lesu, demam singkat, nafsu makan menurun, ngorok beberapa jam sebelum mati.",
        penanganan: "Pemberian antibiotik"
      },
      {
        nama_penyakit: "Tuberkulosis",
        gejala: "pembentukan granuloma (tuberkel) di beberapa organ terutama paru-paru, hati dan ginjal",
        penanganan: ""
      },
      {
        nama_penyakit: "Leptospirosis",
        gejala: "ternak lesu, demam, anemia, kencing darah, penyakit kuning, ternak betina akan keguguran, penurunan produksi susu, susu berwarna kekuningan, terjadi meningitis.",
        penanganan: "pemberian antibiotik streptomisin atau oksitetrasiklin"
      },
      {
        nama_penyakit: "Tetanus",
        gejala: "malas, kaku, sukar berjalan dan menelan, kepala sering digerakkan ke belakang dan ke samping, kejang-kejang",
        penanganan: "pemberian antibiotik penisilin dan othrisin dengan cara injeksi"
      },
      {
        nama_penyakit: "Piroplasmosis",
        gejala: "demam tinggi, nafsu makan berkurang, selaput lendir mulut dan mata pucat kekuningan, pernapasan cepat, kencing darah, diare, kurus",
        penanganan: "acaprin, acriflavin, trypaflavin, imidocarb"
      },
      {
        nama_penyakit: "Anaplasmosis",
        gejala: "gejala timbul 30-40 hari setelah terinfeksi; demam, selaput lendir mulut dan mata pucat, produksi susu menurun, dehidrasi, konstipasi, kematian dalam waktu 2-3 hari",
        penanganan: "aricyl, paludrine, sodiym cacodilate, mercurochrome, penyuntikan antibiotik terramisin atau chlortetrasiklin"
      },
      {
        nama_penyakit: "Coccidiosis",
        gejala: "diare, dengan mucus atau darah, dehidrasi, lemah, dehidrasi dan mati",
        penanganan: "Pemberian antibiotik"
      },
      {
        nama_penyakit: "Aktinomikosis\/rahang bengkak",
        gejala: "Ternak lesu, demam, sukar makan",
        penanganan: "Pemberian natrium iodida untuk hewan terinfeksi secara oral."
      },
      {
        nama_penyakit: "Cacing Hati",
        gejala: "nafsu makan turun, ternak malas, kurus",
        penanganan: "per oral albendazole, dosis pemberian 10-20 mg\/kg berat badan namun obat ini dilarang digunakna pada 1\/3 pertama kebuntingan karena menyebabkan abortus."
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_penyakit', null, {});
  }
};
