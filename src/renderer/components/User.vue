<template>
  <div class="user">
    <router-link v-if="!user.login" class="animated shake user__link" to="Login">
      <span>Zaloguj</span> się...
    </router-link>
    <span v-if="user.login" class="animated shake">Logged as <strong>{{ user.login }}</strong><br><a class="user__link" @click="logOut()">Log out</a></span>
  </div>
</template>

<script>
import { $user, popUpMsg } from '@/functions.js'
import { userService } from '@/services/user.service.js'

export default {
  name: 'user',
  data () {
    return {
      user: $user
    }
  },
  methods: {
    logOut: function() {
      document.body.classList.add('muted');

      userService.logOut().then(response => {
        document.body.classList.remove('muted');
        if(response.data.type == "success") {
          popUpMsg('success', 'Success!', 'You have logged out successfully!');
          setTimeout(() => { window.location = "#/";  $user.login = ""; $user.isLogged = false; $user.token = ""; }, 1000);
        }
        else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');

      }).catch(() => {
        popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. Try again');
        document.body.classList.remove('muted');
      });
    }
  }
}
</script>

<style scoped>
.user {
  float: right;
  margin:50px 200px 0px 0px;
  height: 100px;
  display: flex;
  align-items: center;
}
.user__link {
  font-weight: bold;
  color: #fff;
  font-size: 1.3em;
  font-style: italic;
  text-decoration: none;
  transition: .2s;
}
.user__link:hover {
  color: rgb(226,0,38);
}

</style>
