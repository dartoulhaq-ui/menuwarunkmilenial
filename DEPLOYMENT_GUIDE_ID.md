# 📋 Panduan Deployment Warunk Milenial

## ✅ Masalah yang Sudah Diperbaiki

### 1. **Layar Putih Kosong (White Screen)**
**Penyebab:** 
- Dependencies tidak terinstall dengan benar (missing native binding untuk Rolldown)
- Konfigurasi base path di Vite tidak sesuai untuk development

**Solusi yang Diterapkan:**
```bash
# Bersihkan dependencies lama
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### 2. **Konfigurasi Vite untuk Development vs Production**
**Pembaruan di `vite.config.js`:**
```javascript
export default defineConfig({
  plugins: [react()],
  // Gunakan base path berbeda sesuai environment
  base: process.env.NODE_ENV === 'production' ? '/menuwarunkmilenial/' : '/',
  server: {
    host: true,
    port: 5173
  }
})
```

**Penjelasan:**
- **Development**: Menggunakan base path `/` sehingga app berjalan di `http://localhost:5173/`
- **Production**: Menggunakan base path `/menuwarunkmilenial/` untuk GitHub Pages

---

## 🚀 Cara Menjalankan Aplikasi

### Development (Lokal)
```bash
npm run dev
```
✅ Buka browser di: **http://localhost:5173/**

### Build untuk Production
```bash
npm run build
```
✅ File akan dihasilkan di folder `dist/`

### Preview Build Production
```bash
npm run preview
```
✅ Buka browser di: **http://localhost:4173/**

---

## 📦 Deployment ke GitHub Pages

### Step 1: Pastikan Konfigurasi Benar
Verifikasi `vite.config.js` sudah dikonfigurasi seperti di atas.

### Step 2: Build Aplikasi
```bash
npm run build
```

### Step 3: Deploy ke GitHub Pages
Anda memiliki 3 pilihan:

#### **Opsi A: Push dist folder ke gh-pages branch (Manual)**
```bash
# Build aplikasi
npm run build

# Navigate ke dist folder
cd dist

# Initialize git (jika belum)
git init
git remote add origin https://github.com/dartoulhaq-ui/menuwarunkmilenial.git

# Push ke gh-pages branch
git push origin main:gh-pages
```

#### **Opsi B: Gunakan GitHub Actions (Otomatis)**
Buat file `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: warunkmilenial.com  # (Opsional) jika punya domain custom
```

#### **Opsi C: Gunakan GitHub CLI**
```bash
npm run build
gh pages deploy dist
```

### Step 4: Setup GitHub Pages di Repository
1. Pergi ke **Settings** → **Pages**
2. Pilih **Deploy from a branch**
3. Pilih branch: **gh-pages**
4. Pilih folder: **/(root)**
5. Klik **Save**

### Step 5: Verifikasi Deploy
✅ Akses di: **https://dartoulhaq-ui.github.io/menuwarunkmilenial/**

---

## 🔧 Troubleshooting

### ❌ "npm ERR! Cannot find module '@rolldown/binding-linux-x64-gnu'"
**Solusi:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Blank White Screen saat Development
**Kemungkinan Penyebab:**
1. Browser cache - Clear cache (Ctrl+Shift+R)
2. Dev server tidak berjalan - Cek terminal
3. Port 5173 sudah digunakan - Gunakan port lain:
   ```bash
   npm run dev -- --port 5174
   ```

### ❌ Images tidak muncul di production
**Pastikan:**
- Semua gambar ada di folder `public/images/`
- Path di `menu.json` sesuai: `/images/NGTELUR.jpg`
- File dibuild dengan benar: `npm run build`

### ❌ Styling hilang setelah deploy ke GitHub Pages
**Solusi:** Sesuaikan base path di `vite.config.js` (sudah dilakukan)

---

## 📁 Struktur File Penting

```
menuwarunkmilenial/
├── public/
│   └── images/           # Tempat semua gambar menu
├── src/
│   ├── App.jsx          # Komponen utama
│   ├── index.css        # Style Tailwind
│   ├── main.jsx         # Entry point
│   └── data/
│       └── menu.json    # Data menu
├── vite.config.js       # ✅ Sudah diperbaiki
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
└── index.html           # HTML utama
```

---

## ✨ Tips Maintenance

1. **Update Gambar Menu:**
   - Letakkan di `public/images/`
   - Update referensi di `src/data/menu.json`

2. **Tambah Menu Baru:**
   - Edit `src/data/menu.json`
   - Struktur:
   ```json
   {
     "id": 1,
     "nama": "Nasi Goreng Telur",
     "kategori": "Nasi Goreng",
     "harga": 25000,
     "deskripsi": "Nasi goreng dengan topping telur",
     "gambar": "/images/NGTELUR.jpg"
   }
   ```

3. **Customize Warna:**
   - Edit `tailwind.config.js`
   - Edit `src/index.css`

---

## 📞 Support
Jika ada pertanyaan atau error, periksa:
1. Apakah `npm install` sudah dijalankan?
2. Apakah Node.js versi 16+ sudah terinstall?
3. Apakah port 5173 tersedia?

**Sekarang aplikasi Anda seharusnya berjalan dengan baik! 🎉**
