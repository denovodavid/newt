<template>
  <div class="newt-note">
    <div class="ui raised card" v-bind:style="{ backgroundColor: noteColor }">
      <div class="content">
        <div class="right floated meta drag-handle" style="visibility: hidden;">
          <i class="block layout icon"></i>
        </div>
        <div class="header">{{ note.title }}</div>
        <div class="description" v-show="!note.markdown">
          <p class="note-text">{{ note.text }}</p>
        </div>
        <div v-show="note.markdown" v-html="markedText" class="note-markdown"></div>
        <div></div>
      </div>
      <div class="extra content" style="visibility: hidden;">
        <span class="left floated">
        <div class="compact ui circular icon basic mini button">
          <i class="icon write"></i>
        </div>
        <div class="compact ui icon dropdown circular basic mini button" v-dropdown>
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item" v-for="(hex, color) in colors">
              <div class="ui large empty circular label" v-bind:style="{ backgroundColor: hex }"></div>
              {{ color | capatalise }}
              </div>
            </div>
          </div>
        </span>
        <span class="right floated">
          <span>{{ note.created_at | formatDate }}</span>
          <div class="ui icon dropdown" v-dropdown>
            <i class="icon ellipsis vertical"></i>
            <div class="menu">
              <div class="item">Delete note</div>
              <!-- <div class="item">Add label</div> -->
              <div class="item">Make a copy</div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Marked from 'Marked'
import 'jquery-dotdotdot/src/jquery.dotdotdot.js'
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
    $('.description, .note-markdown').dotdotdot({
      wrap: 'letter',
      watch: true,
      height: 400
    })
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
    self.$parent.shapeshift()
  },
  beforeDestroy () {
    $('.description, .note-markdown').trigger('destroy.dot')
  }
}
</script>

<style scoped>
  .note-text {
    /*max-height: 400px;*/
    /*overflow: hidden;*/
    /*white-space: pre-wrap;*/
    /*word-wrap: break-word;*/
    /*text-overflow: ellipsis;*/
  }
  
  .note-markdown {
    max-height: 400px;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
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