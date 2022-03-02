export default {
    install(app, options) {
        app.config.globalProperties.$alert = text => {
            window.alert(text)
        }

        let current = 'ru'

        const changeLanguage = name => {
            current = name
              //  console.log('current: ', current)
        }

        app.config.globalProperties.$i18n = key => {

           return key.split('.').reduce((words, k) => {
            //   console.log('options[current]: ', options[current])
             //  console.log('words: ', words)
            //   console.log('k: ', k)
               return words[k] || '=== UNKNOWN ==='
           }, options[current])
        }

        app.provide('changeI18n', changeLanguage)
    }
}
