const App = {
    data: () => ({
        title: 'Заголовок',
        myHTML: '<h1>Vue 3 App</h1>',
        items: [1, 2, 3, 4, 5, 6, 7],
        myItem: '',
        person: {
            firstName: 'Vladilen',
            lastName: 'Minin',
            age: 28
        },
    }),
    methods: {
        addItem() {
            this.items.unshift(this.myItem)
            this.myItem = ''
        },
        log(i) {
            console.log(i)
        }
    },
    computed: {
        evenItems()  {
           return this.items.filter(i => i % 2 === 0)
        }
    }
}

Vue.createApp(App).mount('#app')
