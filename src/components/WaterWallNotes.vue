<template>
  <div class="waterwall">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>

<script>
import WaterWall from '@/waterwall'

export default {
  name: 'waterwallnotes',
  mounted () {
    WaterWall.thing(document.querySelector('.waterwall'))
  }
}
</script>

<style scoped>
.waterwall {
  background: yellowgreen;
}

.box {
  background: red;
  width: 90px;
  height: 90px;
  border: 5px solid blue;
}
</style>
