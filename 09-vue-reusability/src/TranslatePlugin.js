export default {
    install(app, options) {
        console.log('app - ', app)
        console.log('options - ', options)
        app.config.globalProperties.$alert = text => {
            window.alert(text)
        }
    }
}
