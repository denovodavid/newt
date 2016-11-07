<template>
  <div class="ui text container">
    <form id="note-form" class="ui form">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui large transparent left input fluid">
            <input id="note-title" type="text" placeholder="Title" v-model="newNote.title">
          </div>
          <div class="ui divider"></div>
          <div class="field">
            <textarea id="note-text" rows="3" placeholder="Take a note..." v-model="newNote.text" style="border: 0; padding: 0;"></textarea>
          </div>
        </div>
        <div class="extra content">
          <div class="compact ui icon dropdown circular basic tiny button">
            <i class="icon theme"></i>
            <div class="menu">
              <div class="item">
                <div class="ui large empty circular label"></div>
                <!--{{ color | capitalize }}-->
              </div>
            </div>
          </div>
          <div class="right floated">
            <div class="ui icon basic tiny buttons compact">
              <button class="ui toggle button" type="button">Markdown</button>
              <!--<div class="ui icon dropdown button" v-dropdown>
                <i class="icon ellipsis vertical"></i>
                <div class="menu">
                  <div class="item">Option 1</div>
                  <div class="item">Option 2</div>
                  <div class="item">Option 3</div>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <button class="ui bottom attached button" type="submit">Done</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'noteform',
  data () {
    return {
      newNote: {
        title: '',
        text: '',
        markdown: false,
        color: 'none',
        created_at: ''
      }
    }
  }
}
</script>

<style></style>