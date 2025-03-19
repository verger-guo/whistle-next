module.exports = {
    plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {
            flexbox: 'all',
            grid: true,
            overrideBrowserslist: [
                'last 10 versions',
                'ie >= 8',
                'Firefox >= 3',
                'Chrome >= 4',
                'Safari >= 4',
                'Opera >= 10'
            ]
        }
    }
}
