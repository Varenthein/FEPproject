<template>
  <div class="register">
    <div class="container">
      <h2 class="page-title">Sign up</h2>
      <form :ref="'registerBox'" class="registerBox">
        <label for="login">Login</label>
        <input class="form-control" v-model="user.login" type="text" name="login" pattern="^[_A-z0-9]{1,}$" minlength=6 maxlength=25>
        <p class="text-muted text-small animated fadeIn" v-show="user.login.length && user.login.length < 6">Login shouldn't be shorter than 6</p>
        <p class="text-muted text-small animated fadeIn" v-show="user.login.length && user.login.length > 25">Login shouldn't be longer than 25</p>
        <label for="pass">Password</label>
        <input class="form-control" v-model="user.pass" type="password" name="pass" pattern="^[_A-z0-9]{1,}$" minlength=6 maxlength=25>
        <p class="text-muted text-small animated fadeIn" v-show="user.pass.length && user.pass.length < 6">Password shouldn't be shorter than 6</p>
        <p class="text-muted text-small animated fadeIn" v-show="user.pass.length && user.pass.length > 25">Password shouldn't be longer than 25</p>
        <label for="pass">Repeat password</label>
        <input class="form-control" v-model="user.repass" type="password" name="repass">
        <p class="text-muted text-small animated fadeIn" v-show="(user.repass.length) && (user.pass !== user.repass)">Passwords don't match</p>
        <button class="btn btn--primary" @click.prevent="signIn()">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service.js'
import { popUpMsg } from '@/functions.js'

export default {
  name: 'register',
  data () {
    return {
      user: { login: "", pass: "", repass: ""}
    }
  },
  methods: {
    signIn: function() {
      this.$refs.registerBox.classList.add('muted');
      this.$refs.registerBox.querySelectorAll('input, button').forEach(item => item.disabled = true);

      userService.signUp(this.user).then(response => {

          this.$refs.registerBox.classList.remove('muted');
          this.$refs.registerBox.querySelectorAll('input, button').forEach(item => item.removeAttribute("disabled"));
          if(response.data.type == "success") {
            popUpMsg('success', 'You\'ve done it!', 'You have been successfully registered. You\'ll be now redirected to log in page!');
            setTimeout(() => { window.location = "#/login"; }, 5000);
          }
          else if(response.data.type == "error") {
            let msg = response.data.message.map((item) => `<p>-${item}</p>`);
            popUpMsg('error', 'Something went wrong...', msg.join(""));
          } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');
      }).catch(() => {
          popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. Try again');
          this.$refs.registerBox.classList.remove('muted');
          this.$refs.registerBox.querySelectorAll('input, button').forEach(item => item.removeAttribute("disabled"));
        });
    }
  }
}
</script>

<style scoped>
.register {
  text-align: center;
  font-size: 1.4em;
}
.registerBox {
  display: inline-block;
  max-width: 300px;
  border: 1px solid #333;
  background: rgba(0,0,0,0.7);
  padding: 30px;
}
</style>
