// =====================================================
// THEME CONFIGURATION - Warunk Milenial Menu App
// =====================================================
// File ini mendefinisikan semua warna dan styling yang bisa di-customize

export const theme = {
  // PRIMARY COLORS
  colors: {
    primary: {
      50: '#fffbeb',   // Sangat ringan
      100: '#fef3c7',  // Ringan
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',  // Umum digunakan
      600: '#d97706',  // PRIMARY - Warna utama
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',  // Sangat gelap
    },
    
    // SECONDARY COLORS
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    // ACCENT COLORS
    success: {
      light: '#dcfce7',
      base: '#22c55e',
      dark: '#15803d',
    },
    
    warning: {
      light: '#fef3c7',
      base: '#eab308',
      dark: '#b45309',
    },
    
    error: {
      light: '#fee2e2',
      base: '#ef4444',
      dark: '#991b1b',
    },
    
    info: {
      light: '#dbeafe',
      base: '#3b82f6',
      dark: '#1e40af',
    },

    // BACKGROUND
    bg: {
      primary: '#F2F2F7',    // Main background
      secondary: '#ffffff',  // Card background
      tertiary: '#f9fafb',   // Subtle background
    },

    // TEXT
    text: {
      primary: '#111827',    // Heading
      secondary: '#4b5563',  // Body text
      tertiary: '#9ca3af',   // Disabled/hint text
      light: '#f9fafb',      // On dark backgrounds
    },
  },

  // COMPONENT SPECIFIC STYLES
  components: {
    button: {
      primary: {
        bg: 'bg-yellow-500',
        bgHover: 'bg-yellow-600',
        text: 'text-black',
        padding: 'py-2 px-4',
        border: 'border-0',
      },
      secondary: {
        bg: 'bg-gray-100',
        bgHover: 'bg-gray-200',
        text: 'text-gray-700',
        padding: 'py-2 px-4',
        border: 'border border-gray-200',
      },
      outline: {
        bg: 'bg-white',
        bgHover: 'bg-gray-50',
        text: 'text-yellow-700',
        padding: 'py-2 px-4',
        border: 'border border-yellow-700',
      },
      ghost: {
        bg: 'bg-transparent',
        bgHover: 'bg-gray-100',
        text: 'text-gray-700',
        padding: 'py-2 px-4',
        border: 'border-0',
      },
    },

    card: {
      bg: 'bg-white',
      border: 'border border-gray-100',
      padding: 'p-4',
      rounded: 'rounded-2xl',
      shadow: 'shadow-sm hover:shadow-md',
    },

    input: {
      bg: 'bg-gray-100',
      border: 'border-0',
      text: 'text-gray-900',
      placeholder: 'placeholder-gray-400',
      padding: 'py-2 px-4',
      rounded: 'rounded-xl',
    },

    header: {
      bg: 'bg-white/80 backdrop-blur-md',
      border: 'border-b border-gray-200',
      padding: 'px-4 py-3',
      shadow: 'shadow-sm',
    },

    badge: {
      primary: 'bg-yellow-100 text-yellow-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    },
  },

  // SPACING
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // TYPOGRAPHY
  typography: {
    heading1: 'text-2xl font-bold',
    heading2: 'text-xl font-bold',
    heading3: 'text-lg font-bold',
    heading4: 'text-base font-bold',
    body: 'text-base',
    bodySmall: 'text-sm',
    label: 'text-xs font-semibold',
    caption: 'text-xs',
  },

  // BREAKPOINTS
  breakpoints: {
    mobile: '640px',
    tablet: '1024px',
    desktop: '1920px',
  },

  // BORDER RADIUS
  radius: {
    sm: '0.375rem',   // 6px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },

  // SHADOWS
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // ANIMATIONS
  animations: {
    fadeIn: 'fade-in 0.3s ease-out',
    slideUp: 'slide-up 0.3s ease-out',
    slideDown: 'slide-down 0.3s ease-out',
    scaleIn: 'scale-in 0.3s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },

  // Z-INDEX
  zIndex: {
    dropdown: 40,
    sticky: 20,
    fixed: 30,
    backdrop: 25,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },
};

// =====================================================
// USAGE EXAMPLES
// =====================================================

/*

// 1. IMPORT DAN GUNAKAN
import { theme } from './theme.config';

// 2. AKSES WARNA
const primaryColor = theme.colors.primary[600];  // #dc2626

// 3. BUTTON VARIANTS
const buttonClass = `
  ${theme.components.button.primary.bg}
  ${theme.components.button.primary.bgHover}
  ${theme.components.button.primary.text}
  ${theme.components.button.primary.padding}
`;

// 4. RESPONSIVE CLASSES
`hidden md:block`  // Hidden mobile, show desktop
`grid-cols-1 md:grid-cols-2`  // 1 column mobile, 2 desktop

// 5. CREATE CUSTOM GRADIENT
const gradientButton = `
  bg-gradient-to-r from-${theme.colors.primary[600]} 
  to-${theme.colors.primary[500]}
`;

// 6. TYPOGRAPHY
const heading = theme.typography.heading2;  // 'text-xl font-bold'

// 7. SPACING
<div className={`p-${theme.spacing.md}`}>Content</div>

*/

// =====================================================
// CUSTOMIZATION GUIDE
// =====================================================

/*

UNTUK MENGUBAH WARNA KESELURUHAN:

1. Ganti primary color dari Red ke Blue:
   - Change primary[600] dari '#dc2626' ke '#2563eb'
   - Atau install color palette dari Tailwind

2. Update di tailwind.config.js:
   extend: {
     colors: {
       primary: '#dc2626',
       secondary: '#f3f4f6',
     }
   }

3. Restart dev server untuk update

PRESET WARNA ALTERNATIF:

- Red (Current): #dc2626 - Energetic, Food-related
- Orange: #ea580c - Warm, Friendly
- Yellow: #eab308 - Cheerful, Bright
- Green: #16a34a - Fresh, Natural
- Blue: #2563eb - Professional, Trust
- Purple: #a855f7 - Creative, Premium
- Pink: #ec4899 - Modern, Trendy

*/

export default theme;
