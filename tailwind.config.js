/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./themes/selfhosthub/layouts/**/*.html",
        "./themes/selfhosthub/assets/js/**/*.js",
        "./static/js/**/*.js",
        "./content/**/*.md",
        "./content/**/*.html"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                // 自定义颜色
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        color: 'inherit',
                        a: {
                            color: 'var(--primary-color)',
                            '&:hover': {
                                color: 'var(--primary-hover)',
                            },
                            textDecoration: 'none',
                        },
                        h1: {
                            color: 'inherit',
                        },
                        h2: {
                            color: 'inherit',
                        },
                        h3: {
                            color: 'inherit',
                        },
                        h4: {
                            color: 'inherit',
                        },
                        code: {
                            color: 'inherit',
                        },
                        strong: {
                            color: 'inherit',
                        },
                        blockquote: {
                            color: 'inherit',
                        },
                    },
                },
                invert: {
                    css: {
                        a: {
                            color: 'var(--tw-prose-invert-links)',
                            '&:hover': {
                                color: 'var(--tw-prose-invert-links-hover)',
                            },
                        },
                        code: {
                            color: 'var(--tw-prose-invert-code)',
                            backgroundColor: 'var(--tw-prose-invert-code-bg)',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
} 