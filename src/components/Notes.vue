<template>
  <div>
    <transition-group id="note-wall"
                      class="newt-notes"
                      tag="div"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <note v-for="(note, index) in orderedNotes"
            :key="note['.key']"
            :note="note"
            :data-index="index"
            @shapeshift="shapeshift"
            @zindex="updateZindex"></note>
    </transition-group>
    <transition name="fade">
      <h1 class="ui center aligned grey icon header"
          v-show="!asyncLoading && notes.length === 0">
        <i class="sticky note yellow icon"></i>
        Welcome.
        <div class="sub header">Make a note!</div>
      </h1>
    </transition>
  </div>
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
let $notes = null

export default {
  name: 'notes',
  components: {
    Note
  },
  computed: {
    ...mapState([
      'notes',
      'notesOrder',
      'asyncLoading'
    ]),
    ...mapGetters([
      'orderedNotes'
    ])
  },
  mounted () {
    const self = this
    $notes = $(self.$el.querySelector('#note-wall'))
    $notes.on('ss-drop-complete', (e) => {
      self.setNotesOrder()
    })
  },
  methods: {
    shapeshift () {
      if (shapeshiftTimer !== null) clearTimeout(shapeshiftTimer)
      shapeshiftTimer = setTimeout(() => {
        $notes.shapeshift(shapeshiftOptions)
        console.log('SHAPESHIPT')
      }, 200)
    },
    updateZindex () {
      $notes.children('.newt-note').css('z-index', '')
    },
    arrange () {
      $notes.trigger('ss-rearrange')
    },
    setNotesOrder () {
      console.log('setNotesOrder')
      const self = this
      let order = {}
      $notes.children('.newt-note').each((i, itemElem) => {
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
      $(el).one('transitionend', done)
      setTimeout(() => {
        el.style.opacity = 1
      }, delay)
    },
    leave (el, done) {
      done()
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

<style src="semantic-ui-css/components/header.css"></style>
<style src="semantic-ui-css/components/icon.css"></style>
<style scoped>
.newt-notes {
  position: relative;
  margin-bottom: 2.4em;
  height: 100px;
  transition: height 0.4s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
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
