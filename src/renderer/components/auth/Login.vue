<template>
  <div class="login">
    <div class="container">
      <h2 class="page-title">Log in</h2>
      <form :ref="'loginBox'"class="loginBox">
        <label for="login">Login</label>
        <input class="form-control" v-model="user.login" type="text" name="login">
        <label for="pass">Password</label>
        <input class="form-control" v-model="user.pass" type="password" name="pass">
        <button class="btn btn--primary" @click.prevent="signIn()">Sign in</button>
        <router-link class="btn" to="Register">Sign up</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service.js'
import { $user, popUpMsg } from '@/functions.js'


export default {
  name: 'login',
  data () {
    return {
      user: { login: "", pass: ""}
    }
  },
  methods: {
    signIn: function() {
      this.$refs.loginBox.classList.add('muted');
      this.$refs.loginBox.querySelectorAll('input, button').forEach(item => item.disabled = true);

      userService.logIn(this.user).then(response => {
        this.$refs.loginBox.classList.remove('muted');
        this.$refs.loginBox.querySelectorAll('input, button').forEach(item => item.removeAttribute("disabled"));
        if(response.data.type == "success") {
          popUpMsg('success', 'You\'ve done it!', 'You have been succesfully authorized!');
          setTimeout(() => { window.location = "#/"; $user.login = this.user.login; $user.isLogged = true; $user.token = response.data.token; }, 1000);
        }
        else if(response.data.type == "error") {
          let msg = response.data.message.map((item) => `<p>-${item}</p>`);
          popUpMsg('error', 'Something went wrong...', msg.join(""));
        } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');

      }).catch(() => {
        popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. Try again');
        this.$refs.loginBox.classList.remove('muted');
        this.$refs.loginBox.querySelectorAll('input, button').forEach(item => item.removeAttribute("disabled"));
      });
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
  font-size: 1.4em;
}
.loginBox {
  display: inline-block;
  max-width: 300px;
  border: 1px solid #333;
  background: rgba(0,0,0,0.7);
  padding: 30px;
}
</style>
