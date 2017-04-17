<template>
  <div class="ui text container">
    <form id="note-form"
          class="ui form">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="note-title"
                   type="text"
                   placeholder="Title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="note-text"
                      rows="3"
                      placeholder="Take a note..."
                      v-autosize></textarea>
          </div>
        </div>
        <div class="extra content"
             v-bind:style="newNoteColor">
          <div class="compact ui icon dropdown circular basic tiny button"
               v-dropdown>
            <i class="icon theme"></i>
            <div class="menu">
              <div class="item">
                <div class="ui large empty circular label"></div>
                {{ 'color' | capitalise }}
              </div>
            </div>
          </div>
          <div class="right floated">
            <div class="ui icon basic tiny buttons compact">
              <button id="note-markdown"
                      type="button"
                      class="ui toggle button">Markdown</button>
            </div>
          </div>
        </div>
        <button id="done-button"
                class="ui bottom attached button"
                type="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'testing'
}
</script>

<style scoped>
#note-text {
  border: 0;
  padding: 0;
}
</style>
