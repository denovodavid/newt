<template>
  <div class="newt-note"
       :data-key="key">
    <div class="ui raised card"
         :style="{ backgroundColor: noteColor }">
      <div class="content">
        <div class="right floated meta drag-handle"
             style="visibility: hidden;">
          <i class="block layout icon"></i>
        </div>
        <div class="header note-title"
             v-show="note.title">{{ note.title }}</div>
        <div class="description">
          <div class="note-overflow"
               v-show="overflow"
               :style="{ background: overflowGradient }"></div>
          <p v-show="!note.markdown"
             class="note-text">{{ note.text }}</p>
          <div class="note-markdown"
               v-show="note.markdown"
               v-html="markdown(note.text)"></div>
        </div>
        <p v-show="overflow">...</p>
      </div>
      <div class="extra content"
           style="visibility: hidden;">
        <span class="left floated">
          <div class="compact ui circular icon basic mini button"
               @click="NOTE_EDITOR({ note, show: true })">
            <i class="icon write"></i>
          </div>
          <div class="compact ui icon dropdown circular basic mini button"
               v-dropdown>
            <i class="icon theme"></i>
            <div class="menu">
              <div class="item"
                   v-for="(hex, color) in colors"
                   @click="updateNoteColor({ '.key': key, color})">
                <div class="ui large empty circular label"
                     :style="{ backgroundColor: hex }"></div>
                {{ color | capitalise }}
              </div>
            </div>
          </div>
        </span>
        <span class="right floated">
          <span>{{ createdDate }}</span>
        <div class="ui icon dropdown"
             v-dropdown>
          <i class="icon ellipsis vertical"></i>
          <div class="menu">
            <div class="item"
                 @click="removeNote(note)">Delete note</div>
            <!-- <div class="item">Add label</div> -->
            <div class="item"
                 @click="createNote(note)">Make a copy</div>
          </div>
        </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import formatDate from 'date-fns/format'

export default {
  name: 'note',
  props: ['note'],
  data () {
    return {
      overflow: false
    }
  },
  computed: {
    noteColor () {
      return this.colors[this.note.color]
    },
    overflowGradient () {
      return `linear-gradient(transparent, ${this.noteColor})`
    },
    key () {
      return this.note['.key']
    },
    createdDate () {
      return formatDate(this.note.created_at, 'DD/MM/YY')
    },
    ...mapState([
      'colors'
    ]),
    ...mapGetters([
      'markdown'
    ])
  },
  mounted () {
    const self = this
    const $note = $(self.$el)
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
    self.fixOverflow()
    self.$emit('shapeshift')
  },
  updated () {
    this.fixOverflow()
    this.$emit('shapeshift')
  },
  methods: {
    fixOverflow () {
      const self = this
      const $note = $(self.$el)
      const $noteMarkdown = $note.find('.note-markdown')
      const $noteText = $note.find('.note-text')
      if (
        $noteMarkdown[0].scrollHeight > $noteMarkdown.innerHeight() ||
        $noteText[0].scrollHeight > $noteText.innerHeight()
      ) {
        self.overflow = true
      } else {
        self.overflow = false
      }
    },
    ...mapMutations([
      types.NOTE_EDITOR
    ]),
    ...mapActions([
      'createNote',
      'removeNote',
      'updateNoteColor'
    ])
  }
}
</script>

<style src="semantic-ui-css/components/card.css"></style>
<style src="semantic-ui-css/components/icon.css"></style>
<style src="semantic-ui-css/components/button.css"></style>
<style src="semantic-ui-css/components/dropdown.css"></style>
<style src="semantic-ui-css/components/menu.css"></style>
<style src="semantic-ui-css/components/transition.css"></style>
<style src="semantic-ui-css/components/label.css"></style>
<style scoped>
.newt-note {
  background: #CCC;
  position: absolute;
  transition: left 0.4s ease, top 0.4s ease, opacity 0.4s;
  z-index: 1;
}

.ui-draggable-dragging {
  transition: none;
}

.description {
  position: relative;
}

.note-title {
  word-wrap: break-word;
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
