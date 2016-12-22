<template>
  <div class="newt-note">
    <div class="ui raised card" v-bind:style="{ backgroundColor: noteColor }">
      <div class="content">
        <div class="right floated meta drag-handle" style="visibility: hidden;">
          <i class="block layout icon"></i>
        </div>
        <div class="header" v-show="note.title">{{ note.title }}</div>
        <div class="description">
          <div v-show="overflow" class="note-overflow"></div>
          <p v-show="!note.markdown" class="note-text">{{ note.text }}</p>
          <div v-show="note.markdown" v-html="markedText" class="note-markdown"></div>
        </div>
        <p v-show="overflow">...</p>
      </div>
      <div class="extra content" style="visibility: hidden;">
        <span class="left floated">
        <div class="compact ui circular icon basic mini button" v-on:click="editNote()">
          <i class="icon write"></i>
        </div>
        <div class="compact ui icon dropdown circular basic mini button" v-dropdown>
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item" v-for="(hex, color) in colors" v-on:click="setNoteColor(color)">
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
            <div class="item" v-on:click="removeNote()">Delete note</div>
            <!-- <div class="item">Add label</div> -->
            <div class="item" v-on:click="copyNote()">Make a copy</div>
          </div>
        </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../database.js'
import Marked from 'marked'
import Colors from '../colors.js'

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
      overflow: false,
      colors: Colors
    }
  },
  computed: {
    markedText () {
      return Marked(this.note.text)
    },
    noteColor () {
      return Colors[this.note.color]
    }
  },
  mounted () {
    var self = this
    var $note = $(self.$el)
    $note.on({
      mouseenter: function () {
        $(this).find('.extra.content').css({'visibility': 'visible'})
        $(this).find('.drag-handle').css({'visibility': 'visible'})
      },
      mouseleave: function () {
        $(this).find('.extra.content').css({'visibility': 'hidden'})
        $(this).find('.drag-handle').css({'visibility': 'hidden'})
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
      $note.find('.note-overflow').css({
        'background': 'linear-gradient(transparent, ' + self.noteColor + ')'
      })
    } else {
      self.overflow = false
    }

    self.$parent.shapeshift()
  },
  beforeDestroy () {
    $('.description, .note-markdown').trigger('destroy.dot')
  },
  methods: {
    copyNote () {
      var self = this
      db.ref('notes').push({
        title: self.note.title,
        text: self.note.text,
        markdown: self.note.markdown,
        color: self.note.color,
        created_at: self.note.created_at
      }, () => {
        console.log('Note Copied!')
      })
    },
    removeNote () {
      var self = this
      var key = self.note['.key']
      db.ref('notes').child(key).remove()
        .then(() => {
          console.log('remove success')
        })
        .catch((error) => {
          console.log('remove failed:' + error.message)
        })
    },
    setNoteColor (color) {
      var self = this
      var key = self.note['.key']
      db.ref('notes').child(key).update({
        color: color
      }, () => {
        console.log('update color success')
      })
    },
    editNote () {
      this.$emit('editnote')
    }
  }
}
</script>

<style scoped>
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

  .ss-placeholder-child {
    border: 1px dashed #999;
    border-radius: 4px;
    position: absolute;
    transition: left 0.4s ease, top 0.4s ease;
    width: 290px;
    z-index: 0;
  }
</style>
