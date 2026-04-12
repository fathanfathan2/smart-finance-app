Smart Finance - Konsultasi Keuangan Online

Deskripsi Singkat Proyek
Smart Finance adalah aplikasi berbasis web yang dirancang untuk membantu pengguna mengelola kesehatan finansial mereka. Fitur utama aplikasi ini mencakup cek kesehatan keuangan dan sistem booking konsultasi dengan tenaga ahli perencanaan keuangan secara online. Proyek ini dibangun menggunakan arsitektur Full-Stack dengan React.js di sisi Frontend dan Node.js/Express di sisi Backend, serta MySQL sebagai sistem manajemen database.

Petunjuk Setup Environment
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal Node.js (Versi 16 atau terbaru), XAMPP, dan Git.
1. Persiapan Database
Jalankan XAMPP Control Panel dan aktifkan modul Apache serta MySQL.
Buka browser dan akses http://localhost/phpmyadmin.
Buat database baru dengan nama smart_finance.
Buat tabel consultants, users, dan bookings sesuai dengan struktur yang telah ditentukan.

2. Konfigurasi Backend
Masuk ke folder backend: cd backend
Instal semua library yang dibutuhkan: npm install
Sesuaikan konfigurasi database pada file config/database.js (pastikan user dan nama database sudah benar).

3. Konfigurasi Frontend
Masuk ke folder frontend: cd frontend
Instal semua library yang dibutuhkan: npm install

Tautan Model ML
Proyek ini merupakan aplikasi manajemen data keuangan berbasis Full-Stack Web dan tidak menggunakan model Machine Learning.

Cara Menjalankan Aplikasi
Anda harus menjalankan dua terminal secara bersamaan untuk menjalankan aplikasi ini:
1. Menjalankan Server (Backend)
Buka terminal baru, masuk ke folder backend, lalu jalankan:
npm run dev
Server akan berjalan di: http://localhost:3000

2. Menjalankan Website (Frontend)
Buka terminal satu lagi, masuk ke folder frontend, lalu jalankan:
npm run dev
Aplikasi dapat diakses melalui browser di: http://localhost:5173
