<template>
  <div class="club">
    <div class="container">
      <div class="row">
        <div class="col-8">
            <div class="box club__header">
                  <img alt="crest" class="club__header__logo" :src="'/static/img/crests/'+club.id+'.png'">
                  <h2 class="page-title club__name">{{ club.name }}</h2>
                  <p><img alt="flag" class="flag" :src="'/static/img/flags/'+club.countryCode+'.png'"> {{ club.league }}</p>
            </div>
            <div class="box" v-if="goalkeepers.length > 0">
              <h2 class="page-title">Goalkeppers</h2>
              <div class="players">
                <div v-for="player in goalkeepers">
                  <player :data="player"></player>
                </div>
              </div>
            </div>
            <div class="box">
              <h2 class="page-title">Defenders</h2>
              <div class="players">
                <div v-for="player in defenders">
                  <player :data="player"></player>
                </div>
              </div>
            </div>
            <div class="box">
              <h2 class="page-title">Midfielders</h2>
              <div class="players">
                <div v-for="player in midfielders">
                  <player :data="player"></player>
                </div>
              </div>
            </div>
            <div class="box">
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
    loadClub: function(clubId) {
      this.$router.push('/clubs/'+clubId)
    }
  },
  created: function() {
      clubService.getClubById(this.$route.params.id).then(response => {
        if(response.data.type == "success") {

            this.club = response.data.club;

            //get all players
            playerService.getPlayersByClub(this.club.id).then(response => {
              if(response.data.type == "success") {

                  const players = response.data.players;

                  players.map((player) => {
                    let positions = player.position.split("/");
                    player.main_position = positions[0];
                  });

                  this.goalkeepers = players.filter((item) => item.main_position === "GK");
                  this.defenders = players.filter((item) => ["CB", "LB", "RB", "RWB", "LB"].indexOf(item.main_position) !== -1);
                  this.midfielders = players.filter((item) => ["CDM", "RM", "CM", "LM", "CAM"].indexOf(item.main_position) !== -1);
                  this.forwards = players.filter((item) => ["RF", "CF", "LF", "RW", "ST", "LW"].indexOf(item.main_position) !== -1);

              } else throw "error";
            }).catch((err) => {
                popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!'+err);
                this.$router.push('/clubs/'+this.$route.params.id);
            });


        } else throw "error";
      }).catch((err) => {
          popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');
          this.$router.push('/clubs/'+this.$route.params.id)
      });
  },
  components: { Player }
}
</script>

<style scoped>
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
