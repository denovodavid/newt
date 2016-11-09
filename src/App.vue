<template>
  <div id="app">
    <navbar></navbar>
    <br>
    <div class="ui fluid container">
      <noteform></noteform>
      <notes></notes>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Navbar from './components/Navbar'
import Noteform from './components/Noteform'
import Notes from './components/Notes'

export default {
  name: 'app',
  components: {
    Hello,
    Navbar,
    Noteform,
    Notes
  }
}
</script>

<style>
  body {
    background: #eee;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>