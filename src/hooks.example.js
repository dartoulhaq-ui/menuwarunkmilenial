// =============================================
// FUTURE ENHANCEMENT HOOKS & UTILITIES
// =============================================
// File ini berisi contoh implementasi untuk fitur-fitur professional grade

// 1. LOCAL STORAGE HOOK - untuk menyimpan favorites dan cart
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// 2. CART API SERVICE - untuk future backend integration
export const cartService = {
  addToCart: async (userId, itemId, quantity) => {
    // Future: POST /api/cart/add
    // return fetch(`${API_URL}/cart/add`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, itemId, quantity })
    // }).then(res => res.json());
  },

  removeFromCart: async (userId, itemId) => {
    // Future: DELETE /api/cart/remove
  },

  getCart: async (userId) => {
    // Future: GET /api/cart/:userId
  },

  checkout: async (userId, cartData) => {
    // Future: POST /api/orders/create
  }
};

// 3. MENU API SERVICE
export const menuService = {
  getAllMenus: async () => {
    // Future: GET /api/menu/all
    // Ganti: import menuData from './data/menu.json'
  },

  getMenuByCategory: async (category) => {
    // Future: GET /api/menu/category/:category
  },

  searchMenu: async (query) => {
    // Future: GET /api/menu/search?q=query
  }
};

// 4. PAYMENT SERVICE - untuk integrasi payment gateway
export const paymentService = {
  initiateMidtrans: async (orderData) => {
    // Untuk implementasi Midtrans
    // return fetch('/api/payment/midtrans', {
    //   method: 'POST',
    //   body: JSON.stringify(orderData)
    // })
  },

  initiateStripe: async (orderData) => {
    // Untuk implementasi Stripe
  }
};

// 5. NOTIFICATION/TOAST HOOK
export const useNotification = () => {
  const [notification, setNotification] = React.useState(null);

  const show = (message, type = 'info', duration = 3000) => {
    setNotification({ message, type });
    if (duration) {
      setTimeout(() => setNotification(null), duration);
    }
  };

  return { notification, show };
};

// 6. ANALYTICS TRACKER
export const trackEvent = (eventName, eventData = {}) => {
  // Future: Google Analytics, Mixpanel, etc
  console.log(`[Analytics] ${eventName}:`, eventData);
  // window.gtag?.('event', eventName, eventData);
};

// 7. DISCOUNT CALCULATOR
export const calculateDiscount = (basePrice, discountPercent) => {
  const discountAmount = basePrice * (discountPercent / 100);
  return {
    originalPrice: basePrice,
    discountPercent,
    discountAmount,
    finalPrice: basePrice - discountAmount
  };
};

// 8. VALIDATION HELPER
export const validators = {
  isValidPhone: (phone) => /^62\d{9,12}$/.test(phone),
  isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidPrice: (price) => !isNaN(price) && price > 0,
  minCharacters: (text, min = 3) => text.length >= min
};

// 9. FORMATTING UTILITIES
export const formatters = {
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  },

  formatPrice: (price) => {
    return `${(price / 1000).toLocaleString('id-ID')}K`;
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
};

// 10. ERROR HANDLER
export const handleError = (error, context = '') => {
  const errorMessage = error?.response?.data?.message || error?.message || 'Terjadi kesalahan';
  console.error(`[Error ${context}]:`, errorMessage);
  // Toast/notification handler bisa di-implement di sini
  return {
    success: false,
    error: errorMessage,
    code: error?.response?.status
  };
};

// =============================================
// CONTOH IMPLEMENTASI DI APP.JSX
// =============================================

/*

// Uncomment untuk menggunakan dengan localStorage
const [cart, setCart] = useLocalStorage('warunk_cart', []);
const [favorites, setFavorites] = useLocalStorage('warunk_favorites', []);

// Uncomment untuk menggunakan notification
const { notification, show } = useNotification();

// Uncomment untuk track analytics
const addToCart = (item) => {
  // ... add to cart logic ...
  trackEvent('add_to_cart', { 
    itemId: item.id, 
    itemName: item.nama, 
    price: item.harga 
  });
  show(`${item.nama} ditambahkan ke keranjang`, 'success');
};

// Render notification
{notification && (
  <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
    notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
  }`}>
    {notification.message}
  </div>
)}

*/
