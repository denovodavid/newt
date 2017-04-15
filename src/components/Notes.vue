<template>
<div class="newt-notes">
  <note v-for="note in orderedNotes" v-bind:key="note['.key']" v-bind:note="note" v-on:zindex="updateZindex" v-on:editnote="editNote(note)"></note>
</div>
</template>

<script>
import Vue from 'vue'
import Note from './Note'
import 'jquery-shapeshift'
import { mapState, mapGetters } from 'vuex'

var shapeshiftOptions = {
  selector: '.newt-note',
  colWidth: 290,
  animated: false,
  handle: '.drag-handle'
}

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
    var self = this
    var $notes = $(self.$el)
    $notes.on('ss-drop-complete', (e) => {
      console.log('setNotesOrder')
      self.setNotesOrder()
    })
  },
  methods: {
    shapeshift () {
      $(this.$el).shapeshift(shapeshiftOptions)
      console.log('SHAPESHIPT')
    },
    updateZindex () {
      $(this.$el).children('.newt-note').css('z-index', '')
    },
    editNote (note) {
      this.$emit('editnote', note)
    },
    arrange () {
      $(this.$el).trigger('ss-rearrange')
    },
    setNotesOrder () {
      var self = this
      var order = {}
      $(self.$el).children('.newt-note').each((i, itemElem) => {
        var noteKey = $(itemElem).data('key')
        order[noteKey] = i + 1
      })
      self.$firebaseRefs.notesOrder.update(order, () => {
        console.log('update order success')
      })
      Vue.nextTick(() => {
        self.arrange()
      })
    }
  },
  watch: {
    notesOrder () {
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
