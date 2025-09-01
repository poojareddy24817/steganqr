/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core System Colors */
        background: 'var(--color-background)', // slate-50
        foreground: 'var(--color-foreground)', // slate-900
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // slate-100
        ring: 'var(--color-ring)', // blue-500
        
        /* Card & Surface Colors */
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-900
        },
        
        /* Muted Elements */
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        
        /* Brand Primary - Deep Navy Foundation */
        primary: {
          DEFAULT: 'var(--color-primary)', // slate-800
          foreground: 'var(--color-primary-foreground)' // slate-50
        },
        
        /* Brand Secondary - Supporting Structure */
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-700
          foreground: 'var(--color-secondary-foreground)' // slate-100
        },
        
        /* Accent - Electric Blue Innovation */
        accent: {
          DEFAULT: 'var(--color-accent)', // blue-500
          foreground: 'var(--color-accent-foreground)' // white
        },
        
        /* Success - Positive Operations */
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        
        /* Warning - Important Notices */
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        
        /* Error - Problem Identification */
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        
        /* Destructive - Alias for Error */
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        /* Brand Specific Colors */
        'navy-deep': 'var(--color-navy-deep)', // slate-800
        'navy-light': 'var(--color-navy-light)', // slate-700
        'blue-electric': 'var(--color-blue-electric)', // blue-500
        'teal-sophisticated': 'var(--color-teal-sophisticated)', // cyan-600
        'green-trust': 'var(--color-green-trust)', // emerald-600
        'red-strategic': 'var(--color-red-strategic)', // red-600
        
        /* Surface & Text Utilities */
        surface: 'var(--color-surface)', // slate-100
        'text-primary': 'var(--color-text-primary)', // slate-900
        'text-secondary': 'var(--color-text-secondary)' // slate-500
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'monospace'],
        'brand-headline': ['Inter', 'sans-serif'],
        'brand-body': ['Inter', 'sans-serif'],
        'brand-code': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'brand-hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        'brand-headline': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 36px
        'brand-subheading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'brand-body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'brand-caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'brand-code': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }] // 14px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
        '144': '36rem' // 576px
      },
      boxShadow: {
        'brand-card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'brand-modal': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'brand-hover': '0 8px 24px rgba(59, 130, 246, 0.15)',
        'quantum': '0 4px 8px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'crypto-rotate': 'cryptoRotate 60s linear infinite',
        'security-pulse': 'securityPulse 3s ease-in-out infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'reveal': 'reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards'
      },
      keyframes: {
        cryptoRotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        securityPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        dataFlow: {
          'to': { strokeDashoffset: '0' }
        },
        reveal: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      },
      backdropBlur: {
        'brand': '8px'
      },
      borderRadius: {
        'brand': '0.5rem', // 8px
        'brand-lg': '0.75rem', // 12px
        'brand-xl': '1rem' // 16px
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}