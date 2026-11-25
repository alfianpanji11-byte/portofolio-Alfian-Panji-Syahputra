PORTOFOLIO ALFIAN PANJI SYAHPUTRA

Struktur:
- index.html       : kerangka halaman dan daftar bagian yang dimuat
- partials/        : konten halaman yang dipisah agar mudah diedit
  - header.html    : navigasi
  - hero.html      : bagian pembuka
  - education.html : riwayat pendidikan
  - skills.html    : keahlian
  - projects.html  : proyek
  - contact.html   : kontak
  - footer.html    : bagian bawah halaman
- css/style.css    : style tambahan dan animasi
- js/main.js       : layar pembuka, menu mobile, tahun footer, animasi reveal
- assets/profile-transparent.png: foto profil dengan latar transparan yang digunakan pada halaman
- assets/profile.jpg: foto asli sebelum latar dihapus
- assets/cms-dashboard.png, assets/system-gaji.png, assets/pawcation.png: gambar proyek

Cara menggunakan:
1. Extract folder project ini.
2. Buka folder alfian_portfolio_project di VS Code (File > Open Folder).
3. Jika ingin mengganti foto, letakkan file PNG transparan bernama profile-transparent.png di folder assets.
4. Jalankan index.html menggunakan Live Server. Klik "Lihat Portofolio" pada layar pembuka untuk melihat isi portofolio. Bagian halaman dimuat dari folder partials, jadi jangan membuka index.html langsung dari file explorer.

Catatan:
Tailwind CSS tetap dimuat melalui CDN pada index.html, sehingga perlu koneksi internet.
