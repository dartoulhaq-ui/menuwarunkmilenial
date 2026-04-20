import React, { useState, useEffect, useMemo } from 'react';
import menuData from './data/menu.json'; 
import { Search, ShoppingBag, X, Plus, Minus, Heart, Star } from 'lucide-react';

const banners = [
  { id: 1, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80" },
  { id: 2, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
  { id: 3, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" }
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // State untuk keranjang
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Extract categories dynamically dari menu data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(menuData.map(item => item.kategori))];
    return uniqueCategories.sort();
  }, []);

  // Auto Slide Banner 3 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  // Fungsi menambah menu ke catatan
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Fungsi mengurangi/menghapus menu dari catatan
  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === id);
      if (existing.qty === 1) {
        return prev.filter(cartItem => cartItem.id !== id);
      }
      return prev.map(cartItem => 
        cartItem.id === id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
      );
    });
  };

  // Hitung total item & harga
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  // Fungsi klik banner untuk scroll
  const scrollToCategory = (categoryName) => {
    if (!categoryName) return;
    const element = document.getElementById(categoryName);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 130; 
      window.scrollTo({ top: y, behavior: 'smooth' });
      setSelectedCategory(categoryName);
    }
  };

  // Filter & Sort Menu
  const filteredMenu = useMemo(() => {
    let filtered = menuData.filter(item =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || item.kategori === selectedCategory)
    );

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.harga - b.harga);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.harga - a.harga);
    } else {
      filtered.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Group filtered menu by category
  const whatsappNumber = '6281234567890';
  const whatsappMessage = 'Halo Warunk Milenial, saya ingin reservasi meja.';

  const groupedMenu = useMemo(() => {
    const grouped = {};
    filteredMenu.forEach(item => {
      if (!grouped[item.kategori]) {
        grouped[item.kategori] = [];
      }
      grouped[item.kategori].push(item);
    });
    return grouped;
  }, [filteredMenu]);

  return (
    <div className="bg-[#F2F2F7] min-h-screen font-sans text-gray-900 pb-32">
      
      {/* HEADER STICKY */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-black font-bold text-lg">WM</span>
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-black animate-pulse-glow">WARUNK MILENIAL</h1>
                <p className="text-[10px] text-gray-600">Cafe&Restoran Nusantara Modern</p>
              </div>
            </div>
            
            {/* Tombol Catatan di Header */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-yellow-100 rounded-full hover:bg-yellow-200 transition"
            >
              <ShoppingBag size={20} className="text-yellow-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari menu..."
              className="w-full bg-gray-100 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-yellow-300/40 transition-all outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-4">
        
        {/* BANNER PROMO (Bisa Diklik) */}
        <div className="relative h-44 md:h-64 overflow-hidden rounded-3xl shadow-lg mb-6 cursor-pointer">
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={banner.img} className="w-full h-full object-cover" alt={`Promo`} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">Nikmati Promo Kami!</h2>
                <p className="text-sm text-gray-200">Pesan sekarang dan rasakan kelezatan yang luar biasa</p>
              </div>
            </div>
          ))}
          {/* Indikator Titik */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
            {banners.map((_, idx) => (
              <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentBanner ? 'w-6 bg-yellow-500' : 'w-2 bg-white/60'}`} />
            ))}
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm mb-6 border border-gray-100 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Filter & Urutkan</h3>
          </div>
          {/* Sort Options */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Urutkan Berdasarkan:</label>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setSortBy("name")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  sortBy === "name" 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Nama
              </button>
              <button 
                onClick={() => setSortBy("price-low")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  sortBy === "price-low" 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Edisi MurMer
              </button>
              <button 
                onClick={() => setSortBy("price-high")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  sortBy === "price-high" 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
               Harting
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Kategori:</label>
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === null 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button 
                  onClick={() => {
                    setSelectedCategory(cat);
                    scrollToCategory(cat);
                  }}
                  key={cat}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat 
                      ? "bg-yellow-500 text-black shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MENU LIST */}
        {Object.keys(groupedMenu).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Menu tidak ditemukan</h3>
            <p className="text-gray-500 max-w-sm">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          Object.entries(groupedMenu).map(([category, items]) => (
            <section key={category} id={category} className="mb-8 pt-2">
              <h2 className="text-xl font-bold mb-4 ml-1 text-gray-800 flex items-center gap-2">
                <div className="h-1 w-6 bg-yellow-500 rounded-full"></div>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => {
                  const cartItem = cart.find(c => c.id === item.id);
                  const qty = cartItem ? cartItem.qty : 0;
                  const isFavorite = favorites.includes(item.id);

                  return (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                      {/* Image Container */}
                      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
                        <img 
                          src={item.gambar || 'https://via.placeholder.com/200x150?text=' + encodeURIComponent(item.nama)} 
                          alt={item.nama} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          onError={(e) => e.target.src='https://via.placeholder.com/200x150?text=Menu'}
                        />
                        {/* Favorite Button */}
                        <button 
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                        >
                          <Heart size={18} className={isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"} />
                        </button>
                      </div>

                      {/* Content Container */}
                      <div className="p-3 flex flex-col flex-grow">
                        <h3 className="font-bold text-gray-800 leading-snug text-sm">{item.nama}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{item.deskripsi}</p>
                        
                        <div className="flex items-center gap-1 mt-2 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">(4.9)</span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-yellow-700 font-extrabold text-lg">
                            {(item.harga / 1000).toLocaleString('id-ID')}K
                          </span>
                          
                          {/* Tombol Tambah/Kurang */}
                          {qty > 0 ? (
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                              <button onClick={() => removeFromCart(item.id)} className="p-1 text-yellow-700 hover:bg-gray-200 rounded-full">
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              <span className="font-bold text-sm w-4 text-center">{qty}</span>
                              <button onClick={() => addToCart(item)} className="p-1 text-yellow-700 hover:bg-gray-200 rounded-full">
                                <Plus size={16} strokeWidth={3} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)}
                              className="bg-black border border-black text-white hover:bg-yellow-500 hover:text-black font-bold py-1 px-3 rounded-full transition-colors text-sm"
                            >
                              Tambah
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>

      {/* FLOATING ACTION BOTTOM (Ringkasan Catatan) */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-40 animate-[slideUp_0.3s_ease-out]">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-4 rounded-2xl shadow-[0_10px_40px_rgba(234,179,8,0.4)] flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/80 font-medium">Keranjang</p>
                <p className="font-bold">{totalItems} Item</p>
              </div>
            </div>
            <div className="font-extrabold text-lg flex items-center gap-2">
              {(totalPrice / 1000).toLocaleString('id-ID')}K
            </div>
          </button>
        </div>
      )}

      <div className="fixed bottom-24 right-4 z-40 md:right-8">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4 py-3 shadow-lg transition-all"
        >
          <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M16 2C8.3 2 2 8.3 2 16c0 2.8.8 5.5 2.3 7.7L2 30l6.5-2.1C10.5 28.3 13.2 29 16 29c7.7 0 14-6.3 14-14S23.7 2 16 2zm7.5 18.2c-.3.8-1 1.3-1.8 1.5-.5.1-1 .2-1.5.2-.4 0-.9 0-1.6-.1-1.7-.2-3.3-1-4.7-2.4-1.4-1.4-2.2-3-2.4-4.7-.1-.7-.1-1.2-.1-1.6 0-.5.1-1 .2-1.5.2-.8.7-1.5 1.5-1.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.1.4.1.8.3 1.1.5.2.1.4.3.5.5.1.3.2.7.2 1.1 0 .2 0 .4-.1.6-.1.2-.1.3-.2.4-.1.1-.3.2-.4.3-.5.2-1 .5-1.2.7-.2.1-.4.2-.5.3-.2.1-.4.1-.6.1-.2 0-.3 0-.5-.1-.1 0-.2 0-.3-.1-.1-.1-.3-.2-.4-.3-.1-.1-.3-.1-.4-.2-.1 0-.2-.1-.2-.1-.2-.1-.4-.1-.6-.1-.4 0-.7 0-1 .2-.2.1-.4.2-.5.3-.1.1-.2.3-.3.4-.2.3-.4.6-.5 1-.1.2-.1.5-.1.8 0 .3 0 .6.1.8.2 1.4.8 2.6 1.8 3.6 1 1 2.2 1.6 3.6 1.8.3.1.5.1.8.1.3 0 .6 0 .8-.1.3-.1.6-.2.8-.3.2-.1.4-.3.6-.5.1-.1.2-.2.3-.3.1-.1.2-.2.3-.3.1-.1.2-.3.3-.4.1-.1.2-.3.2-.5.1-.1.1-.3.1-.4 0-.2 0-.4-.1-.6-.1-.3-.2-.6-.3-.8-.2-.3-.4-.5-.5-.7-.1-.2-.3-.3-.5-.4-.3-.2-.6-.3-1-.3-.2 0-.4 0-.6.1-.1 0-.3.1-.4.2-.1.1-.2.2-.3.3-.1.1-.1.2-.2.3 0 .1-.1.2-.1.3-.1.1-.1.2-.1.3 0 .2 0 .4.1.6.1.2.3.4.4.5.1.1.2.2.4.2.4.1.8.1 1.1.1.3 0 .7-.1 1-.2.4-.1.7-.4.8-.7.2-.4.3-.8.4-1.2.1-.3.1-.7.1-1.1 0-.6-.1-1.1-.3-1.6-.1-.2-.2-.4-.3-.5-.1-.1-.2-.3-.3-.3-.1-.1-.3-.2-.5-.3-.2-.1-.4-.1-.6-.1-.2 0-.4 0-.6.1-.1 0-.3.1-.4.1-.1.1-.3.2-.4.3-.1.1-.2.3-.2.4-.1.1-.1.2-.1.3 0 .2.1.4.1.6.1.3.2.6.4.9.1.2.2.3.4.5.2.2.4.5.6.6.3.2.6.3.9.3.3 0 .6 0 .8-.1.2 0 .5-.1.7-.2.1-.1.2-.2.3-.3.1-.1.2-.2.3-.4.1-.1.2-.3.3-.4.1-.1.2-.3.2-.5s.1-.4.1-.6c0-.2 0-.4-.1-.6-.1-.4-.3-.7-.5-1z" />
            </svg>
          </span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">Reservasi</p>
            <p className="text-sm font-bold">WhatsApp</p>
          </div>
        </a>
        
        {/* TikTok Button */}
        <a
          href="https://tiktok.com/@warunkmilenial"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-black hover:bg-gray-800 text-white rounded-full px-4 py-3 shadow-lg transition-all mt-3"
        >
          <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M16 2C8.3 2 2 8.3 2 16c0 7.7 6.3 14 14 14s14-6.3 14-14S23.7 2 16 2zm5.5 10.5c-.3 0-.6-.1-.9-.2-.3-.1-.6-.3-.8-.5-.2-.2-.4-.5-.5-.8-.1-.3-.2-.6-.2-.9 0-.3.1-.6.2-.9.1-.3.3-.6.5-.8.2-.2.5-.4.8-.5.3-.1.6-.2.9-.2.3 0 .6.1.9.2.3.1.6.3.8.5.2.2.4.5.5.8.1.3.2.6.2.9 0 .3-.1.6-.2.9-.1.3-.3.6-.5.8-.2.2-.5.4-.8.5-.3.1-.6.2-.9.2zm-2.5 9c-1.1 0-2.1-.2-3-.6-.9-.4-1.7-1-2.3-1.7-.6-.7-1.1-1.5-1.4-2.4-.3-.9-.5-1.8-.5-2.8 0-1 .2-2 .5-2.9.3-.9.8-1.7 1.4-2.4.6-.7 1.4-1.3 2.3-1.7.9-.4 1.9-.6 3-.6.5 0 1 .1 1.5.2.5.1 1 .3 1.4.5.4.2.8.5 1.1.8.3.3.6.7.8 1.1.2.4.4.8.5 1.3.1.5.2 1 .2 1.5v.5c0 .5-.1 1-.2 1.5-.1.5-.3 1-.5 1.3-.2.4-.5.8-.8 1.1-.3.3-.7.6-1.1.8-.4.2-.8.4-1.4.5-.5.1-1 .2-1.5.2zm-1-6.5c.3 0 .6-.1.9-.2.3-.1.6-.3.8-.5.2-.2.4-.5.5-.8.1-.3.2-.6.2-.9 0-.3-.1-.6-.2-.9-.1-.3-.3-.6-.5-.8-.2-.2-.5-.4-.8-.5-.3-.1-.6-.2-.9-.2-.3 0-.6.1-.9.2-.3.1-.6.3-.8.5-.2.2-.4.5-.5.8-.1.3-.2.6-.2.9 0 .3.1.6.2.9.1.3.3.6.5.8.2.2.5.4.8.5.3.1.6.2.9.2z"/>
            </svg>
          </span>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">Visit for Us</p>
            <p className="text-sm font-bold">TikTok</p>
          </div>
        </a>
      </div>

      {/* MODAL CATATAN (Muncul saat tombol diklik) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4 transition-opacity">
          <div className="bg-white w-full md:w-[420px] h-[85vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl flex flex-col shadow-2xl animate-[slideUp_0.3s_ease-out] overflow-hidden">
            {/* Header Modal */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-50">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <ShoppingBag size={20} className="text-yellow-700" /> Keranjang Pesanan
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>
            
            {/* Isi Catatan */}
            <div className="p-4 flex-grow overflow-y-auto bg-gray-50">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingBag size={64} className="mb-4 opacity-30" />
                  <p className="font-semibold text-gray-600">Keranjang Anda kosong</p>
                  <p className="text-sm text-gray-500 mt-2">Tambahkan menu favorit Anda sekarang</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-xl border border-blue-100 mb-4 flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5">ℹ️</span>
                    <div>
                      <b>Panduan Pesanan:</b> Periksa kembali pesanan Anda. Setelah yakin, tulis catatan ini ke kertas yang diberi oleh Waiters.
                    </div>
                  </div>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex items-start gap-3 flex-grow">
                        <div className="font-bold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded text-sm min-w-[40px] text-center">
                          {item.qty}x
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-800 text-sm">{item.nama}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{(item.harga / 1000).toLocaleString('id-ID')}K per porsi</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-extrabold text-gray-800 text-sm">{((item.harga * item.qty) / 1000).toLocaleString('id-ID')}K</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-yellow-700 hover:bg-yellow-50 rounded-lg transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Modal */}
            {cart.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 rounded-b-3xl space-y-3">
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-800">{(totalPrice / 1000).toLocaleString('id-ID')}K</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Pajak (10%)</span>
                    <span className="font-semibold text-gray-800">{((totalPrice * 0.1) / 1000).toLocaleString('id-ID')}K</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="font-extrabold text-xl text-yellow-700">{((totalPrice * 1.1) / 1000).toLocaleString('id-ID')}K</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3.5 rounded-xl transition-all"
                >
                  Tutup & Lanjut Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tailwind Custom Animasi */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { color: black; }
          33% { color: #f59e0b; } /* yellow-500 */
          66% { color: white; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

export default App;