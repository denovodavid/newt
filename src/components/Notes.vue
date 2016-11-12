<template>
  <div class="newt-notes">
    <div class="newt-note" v-for="note in notes">
      <note v-bind:note="note"></note>
    </div>
  </div>
</template>

<script>
import Note from './Note'

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
      notes: this.$root.db.ref('notes')
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