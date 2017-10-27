<template>
  <div v-if="player.name" @click="showPlayerDetails(player)" class="player">
    <img alt="player photo" class="player__photo" :src="'/static/img/faces/'+player.id+'.png'">
    <div class="player__positions">
        <div :class="'position position--'+pos" v-for="pos in player.position.split('/')">
          {{ pos }}
        </div>
    </div>
    <img alt="flag" class="player__flag" :src="'/static/img/flags/'+player.countryCode+'.png'">
    <h3>{{ player.club_nr + '. ' + player.name }}</h3>
  </div>
</template>

<script>
import popUpMsg from '@/functions.js'

export default {
  name: 'player',
  props: ["data"],
  data () {
    return {
      player: this.data
    }
  },
  methods: {
    showPlayerDetails: function(player) {
      let playerBox = document.createElement('div');
      playerBox.className = "playerBox";
      playerBox.innerHTML = `
        <div class="row">
          <div class="col-4">
              <img alt="player photo" class="player__photo" src="/static/img/faces/${player.id}.png">
              <div class="playerBox__basicData">
                <p><strong>Wiek:</strong> ${player.age}</p>
                <p><strong>Narodowość:</strong> ${player.nationality} <img alt="flag" class="player__flag" src="/static/img/flags/${player.countryCode}.png"></p>
              </div>
           <div class="col-8">
                Skills
           </div>
        </div>
      `;
      popUpMsg('info', player.club_nr + '. ' +player.name, playerBox);
    }
  },
  watch: {
     data: function (newData) {
       this.player = newData;
     }
   },
}
</script>

<style scoped>

.player {
  position: relative;
  width: 140px;
  text-align: center;
  margin: 10px;
}

.player_photo {
  width: 128px;
  height: 128px;
}

.player__flag {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 10px;
  top: 5px;
}

.player__positions {
  position: absolute;
  top: 0px;
  left: 10px;
}

.position--GK {
  background: #f39c12;
}

.position--CB,
.position--RWB,
.position--RB,
.position--LB,
.position--LWB {
  background: #3498db;
}

.position--CMD,
.position--RM,
.position--LM,
.position--CAM,
.position--CDM,
.position--CM {
  background: #2ecc71;
}

.position--RF,
.position--CF,
.position--LF,
.position--RW,
.position--ST,
.position--LW  {
  background: #c0392b;
}

.position {
  padding: 2px 5px;
  text-align: center;
  border-radius: 3px;
  color: #fff;
  font-size: 0.8em;
  margin: 2px 0px;
}

</style>
