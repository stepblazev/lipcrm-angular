/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "src/**/*.{htm,html,ts}",
        "index.html",
    ],
    theme: {
        container: {
            center: true,
            screens: {
                tablet: '768px',
                laptop: '1024px',
                desktop: '1280px',
            },
            padding: {
                DEFAULT: '1rem',
            },
        },
        fontSize: {
            "header": ["38px", {
                lineHeight: "33.6px",
                fontWeight: "700"
            }],

            "subheader": ["24px", "31.2px"],

            "body-1": ["16px", "22.5px"],
            "body-2": ["14px", "20px"],
            "body-3": ["12px", {
                lineHeight: "16.8px", fontWeight: 400
            }],

            "button": ["17px", {
                lineHeight: "20px",
                fontWeight: "500"
            }],
        },
        fontFamily: {
            "primary": ['Montserrat'],
        },
        colors: {
            white: "#FFFFFF",

            primary: "#5599FF",
            darkprimary: "#294FCC",
            
            success: "#1BCD54",
            darksuccess: "#128035",
            
            warning: "#ffc800",
            darkwarning: "#ad8800",
            
            error: "#D21545",
            darkerror: "#850828",

            black: "#151821",
            dark: "#222831",
            gray: "#393E46",
            light: "#EEEEEE",
        },
        screens: {
            'phone': '480px',
            'mobile': '576px',
            'tablet': '768px',
            'laptop': '1024px',
            'desktop': '1280px',
        },
        extend: {},
    },
    plugins: [],
}
