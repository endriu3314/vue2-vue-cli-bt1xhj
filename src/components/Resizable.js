const ResizeSensor = require('css-element-queries/src/ResizeSensor')
export default {
  props: {
    text: {},
    times: {},
  },
  mounted() {
    const vm = this
    this.gridItem = this.$parent

    const compute = () => {
      const widgetHeight = this.$el.clientHeight

      if (widgetHeight !== vm.widgetHeight) {
        const h = Math.ceil((widgetHeight + vm.gridItem.margin[1]) / (vm.gridItem.rowHeight + vm.gridItem.margin[1]))
        const newH = h

        vm.widgetHeight = widgetHeight

        vm.gridItem.eventBus.$emit(
          'resizeEvent',
          'resizeend',
          vm.gridItem.i,
          vm.gridItem.x,
          vm.gridItem.y,
          newH,
          vm.gridItem.w
        )
      }
    }

    this.resizeSensor = new ResizeSensor(this.$el, () => {
      compute()
    })

    compute()

    this.widgetHeight = this.$el.clientHeight
  },
  data() {
    return {
      resizeSensor: null,
      clientHeight: null,
    }
  },
  computed: {
    randomNumber() {
      return Math.floor(Math.random() * 10) + 1
    },
  },
  render(h) {
    // prettier-ignore
    return h('div', [
      h('div', { attrs: { contentEditable: true, class: 'editable' } }, [
        Array.from({ length: this.randomNumber }).fill(undefined).map(() => {
          return h('p', 'hello world')
        })
      ])
    ])
  },
}
