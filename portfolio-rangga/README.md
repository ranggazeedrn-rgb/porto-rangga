# Portofolio Siswa: Rangga Ramadiyanto Nurhakim (XII RPL 1)
### SMK Muhammadiyah Kota Tasikmalaya

Website portofolio modern minimalis dengan estetika **Liquid Glassmorphism** dan **tone warna netral** (Obsidian Charcoal, Titanium Slate, dan Platinum Frost). Dirancang khusus agar sepenuhnya responsif di semua perangkat (Desktop, Tablet, dan Mobile).

---

## 🌟 Fitur Utama

1. **Liquid Glass Design System**:
   - Multi-layer *frosted glass* dengan efek blur mendalam (`backdrop-filter: blur(20px)`).
   - *Specular border highlights* dan *dynamic 3D card tilt physics* yang merespons pergerakan kursor mouse.
   - *Ambient liquid mesh canvas* dan *mouse spotlight refraction glow*.

2. **Palet Warna Netral Modern**:
   - Menggunakan kombinasi warna gelap elegan (*Obsidian Slate*) dengan aksen *Titanium Frost*, memberikan kesan profesional dan modern tanpa elemen visual yang berlebihan (*distraction-free*).

3. **Struktur Konten Terintegrasi**:
   - **Hero Section**: Profil siswa XII RPL 1, badge ketersediaan magang/proyek, dan CTA instan.
   - **Quick Stats Bento Bar**: Rekap capaian proyek selesai, jam koding praktikum, dan sertifikasi.
   - **Tentang & Edukasi**: Profil kejuruan di SMK Muhammadiyah Kota Tasikmalaya.
   - **Tech Stack Bento Grid**: Frontend, Backend & Database, serta Tools & Workflow.
   - **Showcase Projek Interaktif**: Filter kategori (Semua, Web App, Backend/API, UI/UX) dan *Deep-dive Modal Dialog* berbalut kaca cair.
   - **Prestasi & PKL Timeline**: Riwayat pendidikan di SMK Mutu, pengalaman magang industri, dan sertifikasi BNSP/LSP.
   - **Glass Contact Hub**: Fitur *one-click copy* untuk email & WhatsApp, formulir pesan cepat, dan tautan sosial media.

4. **100% Responsif & Performa Cepat**:
   - Bebas dependensi build yang rumit (*zero-build step*).
   - Dapat langsung dibuka dengan melakukan klik ganda pada `index.html` atau dijalankan di local server.

---

## 📁 Struktur Direktori

```
portfolio-rangga/
├── index.html              # Halaman web utama dengan struktur HTML5 semantik & accessible
├── css/
│   └── style.css           # Styling Liquid Glass, keyframe mesh, font & tema netral
├── js/
│   ├── liquid-glass.js     # Engine fisika 3D tilt, spotlight kursor, & background mesh canvas
│   └── main.js             # Logika interaktivitas, filter projek, modal dialog, copy toast
├── assets/
│   └── data/
│       └── projects.json   # Data JSON terstruktur untuk profil, keahlian, & daftar proyek
└── README.md               # Dokumentasi dan panduan penggunaan
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Opsi 1: Langsung Buka di Browser
Cukup buka file `index.html` langsung menggunakan browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Opsi 2: Menggunakan Live Server / Local Web Server
Jika menggunakan VS Code:
1. Buka folder `portfolio-rangga` di VS Code.
2. Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.

Atau via command line (Node.js / Python):
```bash
# Menggunakan npx serve
npx serve .

# Atau menggunakan Python
python -m http.server 3000
```

---

## ⚙️ Panduan Kustomisasi Konten

Semua data proyek, pengalaman, dan kontak dapat diperbarui dengan sangat mudah melalui file `assets/data/projects.json`:

1. **Mengubah Kontak & Profil**:
   Edit objek `"profile"` di `assets/data/projects.json` (nama, nomor telepon, email, tautan GitHub/LinkedIn).

2. **Menambah / Mengubah Proyek**:
   Tambahkan objek baru ke dalam array `"projects"` dengan format:
   ```json
   {
     "id": "nama-projek-baru",
     "title": "Nama Aplikasi",
     "category": "web",
     "categoryLabel": "Web Application",
     "featured": true,
     "shortDesc": "Deskripsi singkat aplikasi...",
     "fullDesc": "Deskripsi lengkap dan tantangan pembuatan projek...",
     "image": "https://url-gambar-projek.jpg",
     "tags": ["Laravel", "Vue.js", "MySQL"],
     "demoUrl": "https://link-demo.com",
     "githubUrl": "https://github.com/username/repo",
     "metrics": ["Fitur Unggulan 1", "Capaian Proyek 2"]
   }
   ```

---

## 🌐 Panduan Deployment Online

Portofolio ini siap di-deploy secara gratis ke berbagai platform hosting modern:

### A. Vercel
1. Upload folder ke GitHub repository.
2. Buka [Vercel.com](https://vercel.com) dan impor repository tersebut.
3. Klik **Deploy** (Pengaturan default otomatis mendeteksi file HTML statis).

### B. Netlify
1. Buka [Netlify.com](https://netlify.com).
2. Drag and drop folder `portfolio-rangga` langsung ke dashboard Netlify.
3. Website akan langsung aktif dalam hitungan detik.

### C. GitHub Pages
1. Push repository ke GitHub.
2. Buka menu **Settings** > **Pages** di repository GitHub Anda.
3. Pilih source branch `main` / `root` dan klik **Save**.
