<template>
<div class="newt-note" v-bind:data-key="key">
  <div class="ui raised card" v-bind:style="{ backgroundColor: noteColor }">
    <div class="content">
      <div class="right floated meta drag-handle" style="visibility: hidden;">
        <i class="block layout icon"></i>
      </div>
      <div class="header" v-show="note.title">{{ note.title }}</div>
      <div class="description">
        <div v-show="overflow" class="note-overflow" v-bind:style="{ background: overflowGradient }"></div>
        <p v-show="!note.markdown" class="note-text">{{ note.text }}</p>
        <div v-show="note.markdown" v-html="markedText" class="note-markdown"></div>
      </div>
      <p v-show="overflow">...</p>
    </div>
    <div class="extra content" style="visibility: hidden;">
      <span class="left floated">
        <div class="compact ui circular icon basic mini button" @click="EDIT_NOTE({ note, show: true })">
          <i class="icon write"></i>
        </div>
        <div class="compact ui icon dropdown circular basic mini button" v-dropdown>
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item" v-for="(hex, color) in colors" @click="updateNoteColor({ '.key': note['.key'], color})">
              <div class="ui large empty circular label" v-bind:style="{ backgroundColor: hex }"></div>
              {{ color | capitalise }}
            </div>
          </div>
        </div>
      </span>
      <span class="right floated">
        <span>{{ note.created_at | formatDate }}</span>
        <div class="ui icon dropdown" v-dropdown>
          <i class="icon ellipsis vertical"></i>
          <div class="menu">
            <div class="item" @click="removeNote(note)">Delete note</div>
            <!-- <div class="item">Add label</div> -->
            <div class="item" @click="createNote(note)">Make a copy</div>
          </div>
        </div>
      </span>
    </div>
  </div>
</div>
</template>

<script>
import Marked from 'marked'
import * as types from '../store/mutation-types'
import { mapState, mapMutations, mapActions } from 'vuex'

var mdRenderer = new Marked.Renderer()
mdRenderer.image = function (href, title, text) {
  return '<p><img src="' + href + '" alt="' + text + '" class="ui image"></p>'
}
mdRenderer.link = function (href, title, text) {
  return '<a href="' + href + '" target="_blank">' + text + '</a>'
}
Marked.setOptions({
  renderer: mdRenderer
})

export default {
  name: 'note',
  props: ['note'],
  data () {
    return {
      overflow: false
    }
  },
  computed: {
    markedText () {
      return Marked(this.note.text)
    },
    noteColor () {
      return this.colors[this.note.color]
    },
    overflowGradient () {
      return 'linear-gradient(transparent, ' + (this.noteColor === '' ? '#fff' : this.noteColor) + ')'
    },
    key () {
      return this.note['.key']
    },
    ...mapState([
      'colors'
    ])
  },
  mounted () {
    var self = this
    var $note = $(self.$el)
    $note.on({
      mouseenter: function () {
        $(this).find('.extra.content').css({
          'visibility': 'visible'
        })
        $(this).find('.drag-handle').css({
          'visibility': 'visible'
        })
      },
      mouseleave: function () {
        $(this).find('.extra.content').css({
          'visibility': 'hidden'
        })
        $(this).find('.drag-handle').css({
          'visibility': 'hidden'
        })
      },
      click: function () {
        self.$emit('zindex')
        $(this).css('z-index', '2')
      }
    })

    var $noteMarkdown = $note.find('.note-markdown')
    var $noteText = $note.find('.note-text')
    if (
      $noteMarkdown[0].scrollHeight > $noteMarkdown.innerHeight() ||
      $noteText[0].scrollHeight > $noteText.innerHeight()
    ) {
      // Text has over-flowed
      console.log('text overflow')
      self.overflow = true
      $note.find('.note-overflow').css({
        'background': 'linear-gradient(transparent, ' + self.noteColor + ')'
      })
    }

    self.$parent.shapeshift()
  },
  updated () {
    var self = this
    var $note = $(self.$el)
    var $noteMarkdown = $note.find('.note-markdown')
    var $noteText = $note.find('.note-text')
    if (
      $noteMarkdown[0].scrollHeight > $noteMarkdown.innerHeight() ||
      $noteText[0].scrollHeight > $noteText.innerHeight()
    ) {
      // Text has over-flowed
      self.overflow = true
    } else {
      self.overflow = false
    }

    self.$parent.shapeshift()
  },
  beforeDestroy () {
    $('.description, .note-markdown').trigger('destroy.dot')
  },
  methods: {
    ...mapMutations([
      types.EDIT_NOTE
    ]),
    ...mapActions([
      'createNote',
      'removeNote',
      'updateNoteColor'
    ])
  }
}
</script>

<style scoped>
.newt-note {
  background: #CCC;
  position: absolute;
  transition: left 0.4s ease, top 0.4s ease;
  z-index: 1;
}

.ui-draggable-dragging {
  transition: none;
}

.description {
  position: relative;
}

.note-text {
  max-height: 24em;
  overflow: hidden;
  white-space: pre-wrap;
}

.note-markdown {
  max-height: 24em;
  overflow: hidden;
  word-wrap: break-word;
}

.note-overflow {
  pointer-events: none;
  position: absolute;
  height: 5em;
  bottom: 0;
  left: 0;
  right: 0;
}

.drag-handle {
  cursor: move;
}
</style>
