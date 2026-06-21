# KaMar Mockup Studio (Mockup Generator Undangan Pernikahan Premium) 📸💍

Aplikasi berbasis web berskala enterprise yang dirancang khusus untuk mempermudah pembuat website undangan (*invitation web creator*) maupun calon pengantin dalam menyusun konten visual promosi serta konten *social media sharing* (seperti Instagram Feed 1:1 & Portrait Story 9:16) secara estetis dan instan.

Aplikasi ini dilengkapi dengan filter interaktif, penyesuaian posisi screenshot, efek lampu pendar aura (*Aura Glow*), status bar ganda (gelap/terang), kombinasi tipe *device* Android dan iOS, serta proteksi keamanan kode sumber (*Anti-Inspect*).

---

## ✨ Fitur & Penjelasan Fungsi Layanan

1. **Dual Fungsi Konten (Iframe Live & Gambar Unggahan)**:
   - **Iframe Website Langsung**: Memuat landing page undangan asli langsung di mockup HP.
   - **Opsi Unggah Screenshot**: Jika situs menggunakan proteksi keamanan `X-Frame-Options` sehingga kosong di iframe, pengguna dapat mengunggah gambar penuh (*screenshot* penuh).
   - **Presisi Posisi & Skala**: Slider interaktif untuk memperbesar/memperkecil (*zoom*) serta menggeser objek secara vertikal (*vertical adjust*) agar pas di bingkai layar.

2. **Smart Dynamic Frames & Device Model Selector**:
   - Memilih 3 model smartphone premium: **iPhone 15**, **Samsung Galaxy S24**, atau **Google Pixel**.
   - **Kombinasi Dual & Trio Layout**: Membuat tata letak bersilangan estetik (Single, Dual berpasangan bersinggungan, dan Trio megah).
   - **Kombinasi Multi-Device**: Opsi acak otomatis (*mix matches*) yang menggabungkan merek Android dan Apple dalam satu frame promosi.
   - **Model Status Bar**: Jam yang sinkron dengan waktu nyata (*Clock Synchronicity*) dan status bar yang bisa diatur bernuansa putih (light) ataupun hitam (dark) agar teks tetap kontras terbaca.

3. **Background Canvas Suite**:
   - Menyediakan 8 preset gradasi warna bertema pernikahan terpopuler (Boho Terracotta, Classic Lavender, Gold Luxury, Emerald Gold, dll).
   - Penyesuaian gradasi kustom (*custom dynamic linear-gradient*) dengan pilihan sudut rotasi warna (0° - 360°).
   - Penggulung Gambar Latar Belakang (*Custom Background Image*) opsional.
   - **Efek Aura Glow (Lampu Pendar)**: Memberikan nuansa latar belakang premium modern yang menyala lembut di belakang smartphone.

4. **Ekspor Resolusi Tinggi (UHD Export)**:
   - Tombol **"Download Mockup Image"** otomatis merender seluruh kanvas dengan kerapatan piksel super tajam (multiplier skala 2.5x) menghasilkan file `.PNG` yang jernih, bebas pecah untuk dicetak maupun diposting langsung ke Story/Feeds.

5. **Sistem Proteksi Keamanan Terintegrasi**:
   - Dilengkapi sistem pelapis anti rekayasa terbalik (*Anti-Reverse Engineering*). Mengamankan halaman agar **tidak dapat diklik kanan (*Disable Context Menu*)**, menonaktifkan tombol Inspeksi Elemen (`F12`, `Ctrl+Shift+I` / Mac `Cmd+Opt+I`, `Ctrl+Shift+C`, `Ctrl+Shift+J`), serta mematikan shortcut melihat kode sumber mentah (`Ctrl+U` / Mac `Cmd+Option+U`).

---

## 🛠️ Persyaratan Sistem (*Requirements*)

Sebelum memulai proses pemasangan, pastikan perangkat komputer Anda telah terpasang:
- **Node.js** (Rekomendasi versi v18 atau v20+)
- **NPM** (Bawaan Node.js) atau **Yarn**

---

## 🚀 Panduan Lengkap Pemasangan Aplikasi (*Installation Guide*)

Ikuti langkah-langkah mudah di bawah ini untuk memulai dari nol di komputer lokal Anda:

### 1. Ekstrak & Masuk ke Direktori Proyek
Buka terminal/command prompt lalu navigasikan ke folder proyek Anda:
```bash
cd nama-folder-proyek
```

### 2. Pasang Dependensi Node.js
Unduh dan pasang semua paket dependensi yang dibutuhkan secara lengkap sesuai dengan spesifikasi `package.json`:
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Development Mode)
Jalankan server aplikasi lokal untuk mulai memodifikasi atau meninjau secara instan:
```bash
npm run dev
```
Buka peramban browser Anda di alamat: `http://localhost:3000`

### 4. Lakukan Build untuk Produksi (Production Build)
Untuk mengompilasi aplikasi menjadi file statis super cepat dan ringan yang siap diunggah ke hosting (seperti Vercel, Netlify, Cloud Run, atau Shared Hosting Anda):
```bash
npm run build
```
Hasil kompilasi optimal akan disimpan di dalam folder baru bernama `/dist`.

### 5. Jalankan Hasil Produksi Berkinerja Tinggi
Untuk menguji hasil build produksi secara lokal agar dapat disajikan secepat kilat:
```bash
npm run preview
```

---

## 💡 Kiat Produktivitas: Rekomendasi Ekstensi 'GoFullPage'

Bagi pengguna yang menemukan bahwa beberapa tautan undangan website tidak muncul di Mockup (karena kebijakan keamanan server hosting asal yang melarang pemuatan di dalam iframe luar melalui header `X-Frame-Options`):

1. **Pasang Ekstensi Browser**: Pasang ekstensi **[GoFullPage](https://gofullpage.com/)** di Google Chrome / Microsoft Edge.
2. **Lakukan Screenshot**: Buka halaman undangan Anda di tab penuh, klik ikon kamera GoFullPage untuk mengambil gambar dari atas hingga bawah (*scroll screenshot*) secara otomatis dalam 3 detik.
3. **Unduh Gambar**: Simpan hasil gambar dalam format JPEG/PNG berkualitas tinggi dari ekstensi tersebut.
4. **Unggah ke KaMar Mockup Studio**: Kembali ke aplikasi kita, ketuk tab **Unggah Gambar**, tarik gambar screenshot Anda ke sana, sesuaikan posisi & zoom - dan Mockup premium Anda siap diunduh!

---
*Dibuat khusus untuk pengembang kreatif undangan guna memproduksi konten promosi kelas atas dengan kenyamanan dan keamanan mutlak.* 💍✨
