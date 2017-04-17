<template>
  <div id="signin">
    <form id="signin-form" class="ui form" v-on:submit.prevent="">
      <div class="ui input">
        <input type="email" placeholder="Email" v-model="login.email">
      </div>
      <br><br>
      <div class="ui input">
        <input type="password" placeholder="Password" v-model="login.password">
      </div>
      <br><br>
      <button class="ui button" v-on:click="toggleSignIn()">Sign In</button>
    </form>
    <br><br>
    <form id="signup-form" class="ui form" v-on:submit.prevent="">
      <div class="ui input">
        <input type="email" placeholder="Email" v-model="signup.email">
      </div>
      <br><br>
      <div class="ui input">
        <input type="password" placeholder="Password" v-model="signup.password">
      </div>
      <br><br>
      <button class="ui button" v-on:click="handleSignUp()">Sign Up</button>
    </form>
  </div>
</template>

<script>
import router from '../router'
import { firebaseApp } from '../firebase'

export default {
  name: 'signin',
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      signup: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    toggleSignIn () {
      if (firebaseApp.auth().currentUser) {
        // [START signout]
        firebaseApp.auth().signOut()
        // [END signout]
      } else {
        var email = this.login.email
        var password = this.login.password
        if (email.length < 4) {
          alert('Please enter an email address.')
          return
        }
        if (password.length < 4) {
          alert('Please enter a password.')
          return
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
          // document.getElementById('quickstart-sign-in').disabled = false
          // [END_EXCLUDE]
        })
        // [END authwithemail]
      }
      // document.getElementById('quickstart-sign-in').disabled = true
    },
    handleSignUp () {
      var email = this.signup.email
      var password = this.signup.password
      if (email.length < 4) {
        alert('Please enter an email address.')
        return
      }
      if (password.length < 4) {
        alert('Please enter a password.')
        return
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
        // [END_EXCLUDE]
      })
      // [END createwithemail]
    }
  }
}

firebaseApp.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName
    // var email = user.email
    // var emailVerified = user.emailVerified
    // var photoURL = user.photoURL
    // var isAnonymous = user.isAnonymous
    // var uid = user.uid
    // var providerData = user.providerData
    // ...
    console.log('LOGGED IN!')
    router.push({name: 'home'})
  } else {
    console.log('User is signed out!')
    // User is signed out.
    // ...
  }
})
</script>

<style>
body {
  background: #eee;
  height: auto !important;
}

#signin {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
