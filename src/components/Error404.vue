<template>
  <div class="ui center aligned text container sign-in-container">
    <h1 class="ui center aligned grey icon header">
      <i class="sticky note yellow icon"></i>
      NEWT
      <div class="sub header">dem notes yo</div>
    </h1>
    <div class="ui divider"></div>
    <div class="sub header">ERROR 404</div>
    <div class="ui divider"></div>
    <h1 class="ui header">
      Bugger this and bugger that!
      <div class="sub header">We can't find what you need...</div>
      <div class="sub header">Sorry.</div>
    </h1>
    <router-link to="/" class="ui button">Get me outa here!</router-link>
  </div>
</template>

<script>
export default {
  name: 'error404'
}
</script>

<style src="semantic-ui-css/components/container.css"></style>
<style src="semantic-ui-css/components/icon.css"></style>
<style src="semantic-ui-css/components/header.css"></style>
<style src="semantic-ui-css/components/button.css"></style>
<style src="semantic-ui-css/components/divider.css"></style>
<style scoped>
.ui.form .field {
  max-width: 20em;
  margin: auto auto 1em;
}

.sign-in-container {
  padding-top: 3em;
}

.ui.loading.form:before {
  background: rgba(249, 249, 249, 0.8);
}
</style>
