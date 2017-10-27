<template>
  <div class="loadManager">
    <div class="container">
      <h2 class="page-title text-center">MyLeague</h2>
      <p class="text-center">Waiting for the server response...</p>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service.js'
import { managerService } from '@/services/manager.service.js'
import { $user, popUpMsg } from '@/functions.js'

export default {
  name: 'load-manager',
  data () {
    return {
    }
  },
  created: function() {
    if(!$user.isLogged) {
      popUpMsg('error', 'Something went wrong...', 'Oooopppss... You must be logged in to start a manager campaign!');
      setTimeout(() => { window.location = "#/"; }, 2000);
    }
    else {

      //get logged manager
      managerService.getManager().then(response => {
        if(response.data.type == "success") {
          window.location = "#/manager/info";
        } else if(response.data.type == "nomanager") {
          popUpMsg('success', 'Welcome to MyLeague!', 'First time here? Don\'t worry! We\'ll take you by the hand and show what it\'s all about. Start by making your manager profile.', 10000);
          setTimeout(() => { window.location = "#/manager/create"; }, 2000);
        }
        else if(response.data.type == "error") {
          popUpMsg('error', 'Something went wrong...', response.data.message);
        } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');

      }).catch(() => {
        popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. Try again');
        setTimeout(() => { window.location = "#/"; }, 2000);
      });

    }
  }
}
</script>

<style scoped>

</style>
