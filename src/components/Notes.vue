<template>
  <div class="newt-notes">
    <div class="newt-note" v-for="note in notes">
      <note></note>
    </div>
  </div>
</template>

<script>
import Note from './Note'

export default {
  name: 'notes',
  data () {
    return {
      notes: [
        'note1'
      ],
      msg: 'lol'
    }
  },
  components: {
    Note
  }
}
</script>

<style></style>