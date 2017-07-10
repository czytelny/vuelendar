<template>
  <div id="loginPage">
    <h1>Login to vuelendar</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Login">
        <el-input v-model="form.login"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="float-right">
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
    <div style="clear:both;">
      <hr/>
      <h4>I don't like to create accounts either so...</h4>
      <el-button @click="signInWithGoogle">Sign in with Google</el-button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'LoginPage',
    data () {
      return {
        form: {
          login: null,
          password: null
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submitting user credentials')
      },
      signInWithGoogle () {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
          .then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
//            var token = result.credential.accessToken
//             The signed-in user info.
            console.log(`logged user ${JSON.stringify(result.user)}`)
//            this.$emit('loggedUser', result.user)
          })
          .catch(function ({email, errorCode, errorMessage}) {
            console.error(email, errorCode, errorMessage)
          })
      }
    }
  }
</script>

<style>
  #loginPage {
    text-align: center;
    margin: auto;
    max-width: 400px;
  }

</style>
