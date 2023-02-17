/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gradientFrom': '#FE6860',
                'gradientTo': '#FE8A71',
                'softShadow': '#d1b8b2'
            },
        }
    },
    plugins: [
        require("daisyui"),
        require('@tailwindcss/forms')
    ],
}
