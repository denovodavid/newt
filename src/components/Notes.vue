<template>
  <transition-group class="newt-notes"
                    tag="div"
                    @before-enter="beforeEnter"
                    @enter="enter">
    <note v-for="(note, index) in orderedNotes"
          :key="note['.key']"
          :note="note"
          :data-index="index"
          @shapeshift="shapeshift"
          @zindex="updateZindex"></note>
  </transition-group>
</template>

<script>
import Vue from 'vue'
import Note from './Note'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-shapeshift'
import { mapState, mapGetters, mapActions } from 'vuex'

const shapeshiftOptions = {
  selector: '.newt-note',
  colWidth: 290,
  animated: false,
  handle: '.drag-handle'
}

let shapeshiftTimer = null

export default {
  name: 'notes',
  components: {
    Note
  },
  computed: {
    ...mapState([
      'notes',
      'notesOrder'
    ]),
    ...mapGetters([
      'orderedNotes'
    ])
  },
  mounted () {
    const self = this
    const $notes = $(self.$el)
    $notes.shapeshift(shapeshiftOptions)
    $notes.on('ss-drop-complete', (e) => {
      self.setNotesOrder()
    })
  },
  methods: {
    shapeshift () {
      if (shapeshiftTimer !== null) clearTimeout(shapeshiftTimer)
      shapeshiftTimer = setTimeout(() => {
        $(this.$el).shapeshift(shapeshiftOptions)
        console.log('SHAPESHIPT')
      }, 200)
    },
    updateZindex () {
      $(this.$el).children('.newt-note').css('z-index', '')
    },
    arrange () {
      $(this.$el).trigger('ss-rearrange')
    },
    setNotesOrder () {
      console.log('setNotesOrder')
      const self = this
      let order = {}
      $(self.$el).children('.newt-note').each((i, itemElem) => {
        const noteKey = $(itemElem).data('key')
        order[noteKey] = i + 1
      })
      self.updateNotesOrder(order)
    },
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      const delay = 400 + el.dataset.index * 20
      setTimeout(() => {
        el.style.opacity = 1
      }, delay)
    },
    ...mapActions([
      'updateNotesOrder'
    ])
  },
  watch: {
    notesOrder: {
      handler: function () {
        Vue.nextTick(() => {
          this.arrange()
        })
      },
      deep: true
    },
    notes () {
      Vue.nextTick(() => {
        this.arrange()
      })
    }
  }
}
</script>

<style scoped>
.newt-notes {
  position: relative;
  margin-bottom: 2.4em;
}
</style>

<style>
.ss-placeholder-child {
  border: 1px dashed #999;
  border-radius: 4px;
  position: absolute;
  transition: left 0.4s ease, top 0.4s ease;
  width: 290px;
  z-index: 0;
}
</style>
