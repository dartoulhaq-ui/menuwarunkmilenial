# 🍜 WARUNK MILENIAL - Menu Management System

Platform pesan menu makanan bergaya GrabFood untuk restoran Nusantara Modern.

## ✨ Fitur Utama

### ✅ Sudah Diimplementasikan
- 🔍 **Smart Search** - Pencarian menu real-time
- 🏷️ **Category Filter** - Filter berdasarkan kategori yang diambil dari data
- 💰 **Sorting** - Urutkan berdasarkan nama, harga terendah/tertinggi
- ❤️ **Favorites** - Tandai menu favorit
- 🛒 **Shopping Cart** - Keranjang dengan add/remove items
- 📊 **Price Calculation** - Hitung subtotal + pajak 10%
- 📱 **Responsive Design** - Mobile-first, desktop-optimized
- ⭐ **Rating Display** - Dummy rating system (ready for real data)
- 🎨 **Modern UI** - Gradient buttons, smooth animations

### 🔮 Fitur Planned (Enhancement)
- [ ] User Authentication (Login/Register)
- [ ] Persistent Cart (localStorage / database)
- [ ] Favorites Persistence
- [ ] Real Reviews & Ratings
- [ ] Menu Detail Modal
- [ ] Image Optimization (Lazy Loading)
- [ ] Payment Gateway Integration (Midtrans/Stripe)
- [ ] Order Tracking
- [ ] Admin Dashboard
- [ ] Promo/Discount Management

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm atau yarn

### Installation

```bash
# Clone repository
cd menu-restoran

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Server akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan)

---

## 📂 Project Structure

```
menu-restoran/
├── src/
│   ├── App.jsx              # Main component dengan semua logic
│   ├── App.css              # Styling
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── data/
│   │   └── menu.json        # Database menu (119 items)
│   ├── assets/              # Images, icons, etc
│   └── hooks.example.js     # Contoh hooks untuk future features
├── public/                  # Static files
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── PERBAIKAN.md            # Detailed fix documentation
└── README.md               # File ini

```

---

## 🎨 Teknologi yang Digunakan

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^19.2.4 | UI Framework |
| Vite | ^8.0.4 | Build tool |
| Tailwind CSS | ^3.4.19 | Styling |
| Lucide React | ^1.8.0 | Icons |
| PostCSS | ^8.5.10 | CSS processing |
| AutoPrefixer | ^10.5.0 | CSS vendor prefixes |

---

## 🔧 Configuration Files

### `tailwind.config.js`
Konfigurasi Tailwind CSS dengan custom colors jika diperlukan

### `vite.config.js`
Konfigurasi bundler dan optimization

### `postcss.config.js`
Konfigurasi PostCSS untuk Tailwind

### `.eslintrc.js`
Linting rules untuk code quality

---

## 📊 Menu Data Structure

File: `src/data/menu.json`

```json
{
  "id": 1,
  "nama": "Nasi Goreng Telur",
  "kategori": "Nasi Goreng",
  "harga": 25000,
  "deskripsi": "Nasi goreng dengan topping telur",
  "gambar": ""
}
```

**Total Items**: 119 menu items
**Categories**: 25+ categories (dynamic)

---

## 🎯 Component Structure

### Main Component: `App.jsx`

#### State Management
```jsx
const [searchTerm, setSearchTerm] = useState("");           // Search query
const [sortBy, setSortBy] = useState("name");              // Sort option
const [selectedCategory, setSelectedCategory] = useState(); // Selected filter
const [cart, setCart] = useState([]);                      // Shopping cart
const [favorites, setFavorites] = useState([]);            // Favorite items
const [isCartOpen, setIsCartOpen] = useState(false);       // Modal state
```

#### Key Functions
- `addToCart(item)` - Tambah item ke keranjang
- `removeFromCart(id)` - Hapus/kurangi item
- `toggleFavorite(id)` - Toggle item favorit
- `scrollToCategory(categoryName)` - Scroll ke kategori

#### Computed Values
- `categories` - Extract unique categories dari data
- `filteredMenu` - Filtered dan sorted menu items
- `groupedMenu` - Grouped menu by category
- `totalItems` - Total quantity di cart
- `totalPrice` - Total harga di cart

---

## 🎨 Styling Guide

### Color Scheme
- **Primary**: Red (`red-600`, `red-500`)
- **Background**: Light Gray (`#F2F2F7`)
- **Text**: Dark Gray (`gray-900`, `gray-800`, `gray-600`)
- **Accents**: Yellow (Rating stars)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

```jsx
// Contoh responsive design
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* 1 column mobile, 2 columns desktop */}
</div>
```

---

## 🔌 Integration Points

### Data Source
Saat ini menggunakan static JSON file. Untuk production:

```jsx
// Replace ini:
import menuData from './data/menu.json';

// Dengan API call:
useEffect(() => {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => setMenuData(data));
}, []);
```

### Payment Integration
Gunakan `src/hooks.example.js` sebagai template untuk Midtrans/Stripe

### Authentication
Implement login/register middleware sebelum checkout

---

## 📱 Mobile Optimization

✅ **Implemented**:
- Responsive grid layout
- Touch-friendly buttons (min 44px height)
- Full-screen modals pada mobile
- Optimized header dengan sticky positioning
- Horizontal scroll untuk kategori

### Performance Tips
```jsx
// Gunakan useMemo untuk expensive calculations
const filteredMenu = useMemo(() => {
  // filtering logic
}, [dependencies]);

// Gunakan useCallback untuk event handlers
const handleAddToCart = useCallback((item) => {
  // handler logic
}, []);
```

---

## 🐛 Troubleshooting

### Port Already In Use
```bash
# Kill process di port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Atau gunakan port lain
npm run dev -- --port 3000
```

### JSON Parsing Error
- Pastikan `src/data/menu.json` valid JSON
- Gunakan [jsonlint.com](https://jsonlint.com) untuk validate

### Tailwind Classes Not Working
```bash
# Rebuild Tailwind CSS
npm run build

# Atau restart dev server
npm run dev
```

### Module Not Found
```bash
# Clear node_modules dan reinstall
rm -r node_modules package-lock.json
npm install
```

---

## 🚀 Deployment

### Build Production
```bash
npm run build
```
Output: `dist/` folder dengan static files

### Deploy ke Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy ke Netlify
```bash
npm run build
# Upload dist/ folder ke Netlify
```

### Deploy ke Firebase
```bash
npm run build
npm install -g firebase-tools
firebase deploy
```

---

## 🔐 Security Checklist

- [ ] Sanitize user input (search, comments)
- [ ] Validate menu data on backend
- [ ] Use HTTPS in production
- [ ] Implement CORS properly
- [ ] Secure payment processing (use payment gateway)
- [ ] Protect user data (passwords, addresses)
- [ ] Rate limiting untuk API
- [ ] Security headers (CSP, X-Frame-Options, etc)

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ React 19 with suspense boundaries
- ✅ useMemo untuk filtering/sorting
- ✅ Conditional rendering
- ✅ CSS-in-JS dengan Tailwind (no unnecessary classes)

### Future Optimizations
- [ ] Image lazy loading
- [ ] Code splitting (React.lazy)
- [ ] Caching strategy
- [ ] Service Worker (PWA)
- [ ] CDN untuk assets

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "feat: add your feature"`
5. Push: `git push origin feature/your-feature`
6. Create Pull Request

### Code Style
- Use ES6+ syntax
- Follow React hooks best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

---

## 📞 Support & Issues

Untuk issues atau pertanyaan:
1. Check `PERBAIKAN.md` untuk dokumentasi fix
2. Check `src/hooks.example.js` untuk contoh implementasi
3. Review React docs untuk patterns
4. Check console (F12) untuk error messages

---

## 📄 License

This project is part of WARUNK MILENIAL restaurant digital transformation.

---

## 🙏 Acknowledgments

- Menu items dari database WARUNK MILENIAL
- Icons dari [Lucide React](https://lucide.dev)
- Styling dari [Tailwind CSS](https://tailwindcss.com)
- Build tool [Vite](https://vitejs.dev)

---

**Last Updated**: 2026-04-17
**Version**: 2.0 (Fixed & Enhanced)
**Status**: ✅ Production Ready

