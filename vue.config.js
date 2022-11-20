module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        host: "localhost",
        port: 8080,
        // 跨域
        proxy: {
            '/api': {
                target: 'https://hw.tokenomy.vip', //要跨域的地址，接口对接使用
                changeOrigin: true, // 允许跨域
                ws: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    publicPath: './',
    productionSourceMap: false,
}
