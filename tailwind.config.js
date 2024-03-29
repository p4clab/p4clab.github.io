/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'media',
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
        `./posts/**/*.{md,mdx}`,
        'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#66fcf1',
                    300: '#49cbb6',
                    500: '#45a29e'
                }
            },
        },
        fontFamily: {
            sans: [
                'Inter', '"Noto Sans KR"', '"Noto Sans"',  ...defaultTheme.fontFamily.sans
            ],
            serif: [
                '"Source Serif 4"', '"Noto Sans KR"', '"Noto Serif"', ...defaultTheme.fontFamily.serif
            ],
            body: [
                'Inter', '"Noto Sans KR"', '"Noto Sans"',  ...defaultTheme.fontFamily.sans
            ],
            mono: [
                '"Ubuntu Mono"',  ...defaultTheme.fontFamily.mono
            ]
        },
    },
    plugins: [
        require('flowbite'),
        require('flowbite/plugin'),
        require('flowbite-typography'),
    ],
}
