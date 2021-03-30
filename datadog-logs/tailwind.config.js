module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      primary: {
        100: '#FAFAFA',
        200: '#EAEAEA',
        300: '#999',
        400: '#888',
        500: '#666',
        600: '#444',
        700: '#333',
        800: '#111'
      },
      error: {
        lighter: '#F7D4D6',
        light: '#FF1A1A',
        DEFAULT: '#E00',
        dark: '#C50000'
      },
      success: {
        lighter: '#D3E5FF',
        light: '#3291FF',
        DEFAULT: '#0070F3',
        dark: '#0761D1'
      },
      warning: {
        lighter: '#FFEFCF',
        light: '#F7B955',
        DEFAULT: '#F5A623',
        dark: '#AB570A'
      },
      violet: {
        lighter: '#E3D7FC',
        light: '#8A63D2',
        DEFAULT: '#7928CA',
        dark: '#4C2889'
      },
      cyan: {
        lighter: '#AAFFEC',
        light: '#79FFE1',
        DEFAULT: '#50E3C2',
        dark: '#29BC9B'
      },
      highlight: {
        purple: '#F81CE5',
        magenta: '#EB367F',
        pink: '#FF0080',
        yellow: '#FFF500'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['disabled'],
      backgroundColor: ['disabled', 'active'],
      textColor: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
