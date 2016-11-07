<template>
  <div class="ui raised card">
    <div class="content">
      <div class="right floated meta drag-handle" style="visibility: hidden;">
        <i class="block layout icon"></i>
      </div>
      <div class="header">note.title</div>
      <div class="description">
        <p style="white-space: pre-wrap; word-wrap: break-word; text-overflow: ellipsis;">note.text</p>
      </div>
      <div></div>
    </div>
    <div class="extra content" style="visibility: hidden;">
      <span class="left floated">
        <div class="compact ui circular icon basic mini button">
          <i class="icon write"></i>
        </div>
        <div class="compact ui icon dropdown circular basic mini button">
          <i class="icon theme"></i>
          <div class="menu">
            <div class="item">
              <div class="ui large empty circular label"></div>
              color
            </div>
          </div>
        </div>
      </span>
      <span class="right floated">
      <span>note.created_at</span>
      <div class="ui icon dropdown">
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
</template>

<script>
export default {
  name: 'note',
  data () {
    return {
      msg: 'lol'
    }
  }
}
</script>

<style></style>