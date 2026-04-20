# 🚀 QUICK START - Warunk Milenial Menu

## ✅ Masalah Sudah Diperbaiki!

Layar putih polos terjadi karena:
1. ❌ Dependencies npm tidak terinstall dengan benar
2. ❌ Base path development tidak sesuai dengan production

**Semua sudah diperbaiki!** ✨

---

## 💻 Cara Menjalankan Sekarang

### 1. Jalankan Development Server
```bash
npm run dev
```

### 2. Buka di Browser
✅ **http://localhost:5173/**

Sekarang aplikasi Anda akan tampil dengan:
- Header dengan logo WM
- Banner promo yang berganti otomatis
- Filter & kategori menu
- Search bar
- Shopping cart
- Styling Tailwind CSS yang indah

---

## 🌍 Deploy ke GitHub Pages

### Cara Cepat:
```bash
# 1. Build aplikasi
npm run build

# 2. Deploy
gh pages deploy dist
```

✅ Akses di: **https://dartoulhaq-ui.github.io/menuwarunkmilenial/**

### Atau Gunakan GitHub Actions (Otomatis)
Lihat di **DEPLOYMENT_GUIDE_ID.md** untuk setup lengkap.

---

## 📝 Perubahan yang Dilakukan

### vite.config.js
```javascript
// SEBELUM: 
base: '/menuwarunkmilenial/',

// SESUDAH:
base: process.env.NODE_ENV === 'production' ? '/menuwarunkmilenial/' : '/',
```

Ini memungkinkan:
- **Dev**: Berjalan di localhost:5173/ (tanpa subfolder)
- **Production**: Deploy ke GitHub Pages dengan path '/menuwarunkmilenial/'

### npm dependencies
```bash
# Bersihkan dan reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Testing Checklist

Pastikan aplikasi berjalan dengan:
- ✅ Header menu muncul
- ✅ Banner promo bergerak setiap 3 detik
- ✅ Filter & kategori berfungsi
- ✅ Search menu berfungsi
- ✅ Tombol shopping bag berfungsi
- ✅ Modal cart muncul saat diklik

---

## 🔗 Dokumentasi Lengkap
Lihat **DEPLOYMENT_GUIDE_ID.md** untuk:
- Troubleshooting
- GitHub Pages setup lengkap
- Maintenance tips
- Struktur file project

**Sekarang aplikasi siap untuk production! 🎉**
