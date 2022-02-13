const App = {
  data() {
      return {
          title: 'Список заметок',
          placeholderString: 'Введите название заметки',
          inputValue: '',
          notes: [],
          inputColor: ''
      }
  },
    methods: {
/*
      inputChangeHandler(evt) {
          this.inputValue = evt.target.value
      },
*/
      addNote() {
          if (this.inputValue !== '') {
              this.notes.push(this.inputValue)
              this.inputValue = ''
          }
      },
        removeNote(idx) {
          this.notes.splice(idx, 1)
        }
    },
    computed: {
      doubleCountComputed() {
          console.log('computed')
          return this.notes.length * 2
      }
    },
    watch: {
      inputValue(value) {
          console.log('watch input value - ', value)
          this.inputValue = value.length > 10 ? '' : value
          this.inputColor = value.length < 4 ? 'red' : 'black'
      }
    }
}

Vue.createApp(App).mount('#app')
