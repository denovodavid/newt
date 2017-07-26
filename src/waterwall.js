export default {
  options: {
    columnWidth: 100,
    gutterWidth: 10,
    gutterHeight: 10
  },
  containerWidth: null,
  columns: null,
  boxes: [],
  thing (el) {
    this.containerWidth = el.offsetWidth
    el.style.position = 'relative'

    const boxes = el.querySelectorAll('.box')
    boxes.forEach((el, i) => {
      const style = getComputedStyle(el)
      const outerHeight =
        el.offsetHeight +
        parseInt(style.marginTop) +
        parseInt(style.marginBottom) +
        parseInt(style.borderTop) +
        parseInt(style.borderBottom)
      this.boxes.push({ outerHeight, el })
    })
    this.position()
    console.log(this.boxes)
  },
  getColumns () {
    let columns = Math.floor(this.containerWidth / (this.options.columnWidth + this.options.gutterWidth)) || 1
    if ((this.options.gutterWidth + this.options.columnWidth) * columns + this.options.columnWidth <= this.containerWidth) {
      columns++
    }
    this.columns = columns
  },
  position () {
    this.boxes.forEach((e, i) => {
      e.el.style.position = 'absolute'
      e.el.style.left = i * this.columns * this.options.columnWidth + 'px'
    })
  }
}
