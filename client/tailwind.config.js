/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#ecfeff',
                    500: '#22d3ee',
                    600: '#06b6d4',
                    700: '#0f766e',
                },
            },
            boxShadow: {
                glow: '0 0 30px rgba(34, 211, 238, 0.2)',
            },
        },
    },
    plugins: [],
};
