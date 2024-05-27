/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "src/**/*.{htm,html,ts}",
        "index.html",
    ],
    theme: {
        container: {
            center: true,
            screens: { desktop: '1350px'},
            padding: { DEFAULT: '1rem' },
        },
        fontSize: {
            "header": ["36px", { fontWeight: "700" }],

            "body-1": ["16px", { fontWeight: 400 }],
            "body-2": ["14px", { fontWeight: 400 }],
            "body-3": ["12px", { fontWeight: 400 }],

            "button": ["16px", { fontWeight: 500 }],
        },
        fontFamily: {
            "primary": ['Montserrat'],
        },
        colors: {
            header: "#003162",
            border: "#8DB2E3",
            background: "#E7F1FF",
            
            primary: "#02529F",
            darkprimary: "#003970",
            
            success: "#2BB080",
            darksuccess: "#1a6e50",
            
            warning: "#FF8A00",
            darkwarning: "#b56200",
            
            error: "#F21D6A",
            darkerror: "#ad134b",

            black: "#151821",
            dark: "#292929",
            gray: "#7D8E9E",
            light: "#EEEEEE",
            white: "#FFFFFF",
        },
        screens: {
            'phone': '480px',
            'mobile': '576px',
            'tablet': '768px',
            'laptop': '1024px',
            'desktop': '1350px',
        },
        extend: {},
    },
    plugins: [],
}
