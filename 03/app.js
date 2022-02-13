const App = {
    data: () => ({
        title: 'Заголовок',
        myHTML: '<h1>Vue 3 App</h1>',
        items: [1, 2, 3, 4, 5, 6, 7],
        person: {
            firstName: 'Vladilen',
            lastName: 'Minin',
            age: 28
        },
    }),
}

Vue.createApp(App).mount('#app')
