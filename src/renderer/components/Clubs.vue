<template>
  <div class="clubs">
    <div class="container">
        <selectImage @imagePicked="loadClub($event)" :imageWidth="'200px'" :dataImages="clubs"></selectImage>
    </div>
  </div>
</template>

<script>
import { clubService } from '@/services/club.service.js'
import { popUpMsg } from '@/functions.js'
import SelectImage from '@/components/helpers/SelectImage'

export default {
  name: 'clubs',
  data () {
    return {
      clubs: []
    }
  },
  methods: {
    loadClub: function(clubId) {
      this.$router.push('/manager/clubs/'+clubId)
    }
  },
  created: function() {
      clubService.getClubsByLeague(this.$route.params.id).then(response => {
        if(response.data.type == "success") {
            this.clubs = response.data.clubs.map((item) => {
              item.src ='/static/img/crests/'+item.id+'.png';
              return item;
            });
        } else throw "error";
      }).catch((err) => {
          popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');
      });
  },
  components: { SelectImage }
}
</script>

<style scoped>

</style>
