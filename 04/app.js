const h = Vue.h
const app = Vue.createApp({
    data() {
      return {
          title: 'Это из свойства template',
          confirmation: false
      }
    },
    methods: {
        changeTitle() {
            this.confirmation = confirm('Точно изменить?');
            if (this.confirmation) {
                this.title = 'Изменили!'
            }

        }
    },
   /* template: `
    <div class="card center">
        <h1>{{ title }}</h1>
        <button
            class="btn"
            @click="title = 'Изменили!'"
        >
          Изменить
        </button>
    </div>
    `*/
    render() {
        return h('div', {class: 'card center'}, [
            h('h1', {}, this.title),
            h('button', {class: 'btn', onclick: this.changeTitle}, 'Изменить')
        ])
    },


})

app.mount('#app')

Vue.createApp({
    data() {
        return {
            title: 'Это самостоятельное приложение!'
        }
    }

}).mount('#app2')
