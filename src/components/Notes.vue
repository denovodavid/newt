<template>
  <div class="newt-notes">
    <note v-for="note in orderedNotes"
          :key="note['.key']"
          :note="note"
          @shapeshift="shapeshift"
          @zindex="updateZindex"
          @editnote="editNote(note)"></note>
  </div>
</template>

<script>
import Vue from 'vue'
import Note from './Note'
import 'jquery-shapeshift'
import { mapState, mapGetters, mapActions } from 'vuex'

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
      console.log('setNotesOrder')
      var self = this
      var order = {}
      $(self.$el).children('.newt-note').each((i, itemElem) => {
        var noteKey = $(itemElem).data('key')
        order[noteKey] = i + 1
      })
      self.updateNotesOrder(order)
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
