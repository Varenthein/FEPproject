<template>
  <div class="club">
      <div class="row">
        <div class="col-8">

           <!-- BOX WITH CLUB NAME -->
            <div class="box club__header">
                  <img alt="crest" class="club__header__logo" :src="'/static/img/crests/'+club.id+'.png'">
                  <h2 class="page-title club__name">{{ club.name }}</h2>
                  <p><img alt="flag" class="flag" :src="'/static/img/flags/'+club.countryCode+'.png'"> {{ club.league }}</p>
            </div>

            <!-- GOALKEPPERS -->
            <div class="box" v-if="goalkeepers.length > 0">
              <h2 class="page-title">Goalkeppers</h2>
              <div class="players">
                <div v-for="player in goalkeepers">
                  <player :data="player"></player>
                </div>
              </div>
            </div>

            <!-- DEFENDERS -->
            <div class="box" v-if="defenders.length > 0">
              <h2 class="page-title">Defenders</h2>
              <div class="players">
                <div v-for="player in defenders">
                  <player :data="player"></player>
                </div>
              </div>
            </div>

            <!-- MIDFIELDERS -->
            <div class="box">
              <h2 class="page-title" v-if="midfielders.length > 0">Midfielders</h2>
              <div class="players">
                <div v-for="player in midfielders">
                  <player :data="player"></player>
                </div>
              </div>
            </div>

            <!-- FORWARDS -->
            <div class="box" v-if="forwards.length > 0">
              <h2 class="page-title">Forwards</h2>
              <div class="players">
                <div v-for="player in forwards">
                  <player :data="player"></player>
                </div>
              </div>
            </div>

        </div>
      </div>
  </div>
</template>

<script>

import { clubService } from '@/services/club.service.js'
import { playerService } from '@/services/player.service.js'
import { popUpMsg } from '@/functions.js'
import Player from './Player'

export default {
  name: 'club',
  data () {
    return {
      club: {},
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      forwards: []
    }
  },
  methods: {

    /************ PREPARE CLUB ******************/

    prepareClub: function(response) {

          this.club = response.data.club;

          //get all players
          playerService.getPlayersByClub(this.club.id).then(response => {

              if(response.data.type == "success") this.preparePlayers(response)
              else throw "error";

          }).catch((err) => {
              popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!'+err);
              setTimeout(() => this.$router.push('/clubs/'+this.$route.params.id), 3000);
          });

    },

    /************ PREPARE PLAYERS ******************/

    preparePlayers: function(response) {

           const players = response.data.players;

           /* Add attribute main_position, that hold the most important of positions */
           players.map((player) => {
                let positions = player.position.split("/");
                    player.main_position = positions[0];
           });

          /* split players into the groups */
          this.goalkeepers = players.filter((item) => item.main_position === "GK");
          this.defenders = players.filter((item) => ["CB", "LB", "RB", "RWB", "LB"].indexOf(item.main_position) !== -1);
          this.midfielders = players.filter((item) => ["CDM", "RM", "CM", "LM", "CAM"].indexOf(item.main_position) !== -1);
          this.forwards = players.filter((item) => ["RF", "CF", "LF", "RW", "ST", "LW"].indexOf(item.main_position) !== -1);
    }
  },
  created: function() {

      //Load club from db
      clubService.getClubById(this.$route.params.id).then(response => {

        if(response.data.type == "success") this.prepareClub(response);
        else throw "error";

      }).catch((err) => {
          popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');
          setTimeout(() => this.$router.push('/clubs/'+this.$route.params.id), 3000);
      });
  },
  components: { Player }
}
</script>

<style scoped>

  /* CLUB */

  .club__header {
    position: relative;
    padding: 8px;
    padding-left: 200px;
  }

  .club__header__logo {
    position: absolute;
    top: -10px;
    left: 20px;
    width: 150px;
    height: 150px;
  }

  .club__name {
    margin: 0px 0px;
  }

  /* HELPERS */

  .flag {
    width: 25px;
    height: 25px;
    position: relative;
    top: 5px;
  }

  .players {
    display: flex;
    flex-wrap: wrap;
  }
</style>
