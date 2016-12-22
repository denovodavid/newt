<template>
  <div class="newt-notes">
    <note v-for="note in notes" v-bind:note="note" v-on:zindex="updateZindex" v-on:editnote="editNote(note)"></note>
  </div>
</template>

<script>
import Note from './Note'
import db from '../database.js'
import 'jquery-shapeshift'

var shapeshiftOptions = {
  selector: '.newt-note',
  colWidth: 290,
  animated: false,
  handle: '.drag-handle'
}

export default {
  name: 'notes',
  firebase () {
    return {
      notes: db.ref('notes')
    }
  },
  components: {
    Note
  },
  mounted () {
    var self = this
    var $notes = $(self.$el)
    $notes.on('ss-drop-complete', (e) => {
      console.log('setNotesOrder')
      // self.vm.setNotesOrder();
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
    }
  }
}
</script>

<style scoped>
  .newt-notes {
    position: relative;
  }
  
  .newt-note {
    background: #CCC;
    position: absolute;
    transition: left 0.4s ease, top 0.4s ease;
    z-index: 1;
  }
  
  .ui-draggable-dragging {
    transition: none;
  }
</style>