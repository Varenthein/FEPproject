<template>
  <div class="newPlayer">
    <div class="container container--small">
      <div class="row">
        <div class="col-8 col-md-12">
          <h2 class="page-title">New player</h2>
            <div class="tab">
              <h3 class="tab__title page-subtitle">Basic info</h3>
                <div class="tab__content box animated bounceInUp">
                  <form>
                    First name: <input type="text"><hr>
                    Last name: <input type="text"><hr>
                    Age: <input type="number" value="20" min="15" max="45"><hr>
                    Height (cm): <input type="number" value="150" min="150" max="220"><hr>
                    Weight (kg): <input type="number" value="40" min="40" max="120"><hr>
                    Preffered foot: <select>
                                        <option value="R">Right</option>
                                        <option value="L">Left</option>
                                        <option value="B">Both</option>
                                    </select><hr>
                    Nationality: <select v-if="countries && countries.length" v-model="player.nationality">
                            <option v-for="country in countries" :value="country.id">{{ country.name }}</option>
                          </select>
                          <span v-if="!countries.length">Loading...</span>
                    Club: <select v-if="clubs && clubs.length" v-model="player.club">
                            <option v-for="club in clubs" :value="club.id">{{ club.name }}</option>
                          </select>
                          <span v-if="!clubs.length">Loading...</span>
                  </form>
                </div>
                <h3 class="tab__title page-subtitle">Skills</h3>
                <div class="tab__content newPlayer__skills box animated bounceInUp">
                  <form>
                    <div class="row">
                      <div class="col-6">
                        <div v-for="item in skillList.slice(0,8)">
                          <label>{{ item.name }}:</label> <input type="number" v-bind:class="{ 'yellow': player.skills[item.skill] >= 75, 'orange': player.skills[item.skill] >= 90, 'red': player.skills[item.skill] >= 95}" v-model="player.skills[item.skill]" min=50 max="99"><br>
                        </div>
                      </div>
                      <div class="col-6">
                        <div v-for="item in skillList.slice(8,16)">
                          <label>{{ item.name }}:</label> <input type="number" v-bind:class="{ 'yellow': player.skills[item.skill] >= 75, 'orange': player.skills[item.skill] >= 90, 'red': player.skills[item.skill] >= 95}" v-model="player.skills[item.skill]" min="50" max="99"><br>
                        </div>
                        <label>Happiness:</label> <input type="number" v-model="player.happiness" min="50" max="99"><br>
                        <label>Loyality:</label> <input type="number" v-model="player.loyality" min="-50" max="99"><br>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
      <div class="col-4 col-md-12">

      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { toogleTab } from '@/functions.js'
import { clubService } from '@/services/club.service.js'
import { countryService } from '@/services/country.service.js'

export default {
  name: 'newPlayer',
  data () {
    return {
      player: {
        firstName: '',
        lastName: '',
        avatar: '',
        age: 20,
        height: 180,
        weight: 80,
        foot: 'R',
        club: 0,
        nationality: 0,
        value: 0,
        contract: {
          presentYear: 1,
          time: 1,
          salary: 1000,
          clause: 0
        },
        skills: {
          strength: 50,
          agility: 50,
          jump: 50,
          accelaration: 50,
          speed: 50,
          technique: 50,
          lowPass: 50,
          highPass: 50,
          heading: 50,
          shoot: 50,
          goalkeeping: 50,
          defence: 50,
          mental: 50,
          ambition: 50
        },
        happiness: 50,
        loyality: 50
      },
      skillList: [
          { name: 'Strength', skill: 'strength' },
          { name: 'Agility', skill: 'agility' },
          { name: 'Jump', skill: 'jump' },
          { name: 'Accelaration', skill: 'accelaration' },
          { name: 'Speed', skill: 'speed' },
          { name: 'Technique', skill: 'technique' },
          { name: 'Low pass', skill: 'lowPass' },
          { name: 'High pass', skill: 'highPass' },
          { name: 'Heading', skill: 'heading' },
          { name: 'Shoot', skill: 'shoot' },
          { name: 'Goalkeeping', skill: 'goalkeeping' },
          { name: 'Defence', skill: 'defence' },
          { name: 'Mental', skill: 'mental' },
          { name: 'Ambition', skill: 'ambition' }
        ],
        clubs: [],
        countries: []
    }
  },
  created: function() {

    //hide unneded tabs
    setTimeout(function() {
      document.querySelectorAll(".tab__title").forEach((item, index) => {
        item.addEventListener('click', toogleTab)
        if(index != 0) item.nextElementSibling.style.display = "none";
      });
    },1)

    //load clubs and countires
    clubService.getClubs().then(response => this.clubs = response.data);
    countryService.getCountries().then(response => this.countries = response.data);

  }
}
</script>

<style scoped>
.newPlayer form {
  font-size: 1.5em;
}
.newPlayer form input, .newPlayer form select {
  background: none;
  border: none;
  border-bottom: 2px dashed #fff;
  outline: none;
  padding: 8px;
  margin: 5px 10px;
  color: #fff;
  font-size: 1em;
}
.newPlayer form select option:not(:checked) {
  color: #000;
}
.newPlayer form input:focus {
  background: rgba(0,0,0,0.2);
}
.newPlayer form input[type="number"] {
  width: 65px;
}
.newPlayer form hr {
  border: none;
  //border-bottom: 1px solid #777;
  margin: 5px 0;
}
.newPlayer__skills {
  font-size: 0.8em;
}
.newPlayer__skills form input[type=number] {
  border: none;
  border-radius: 5px;
  width: 40px;
  background: rgba(0,0,0,0.7);
}
.newPlayer__skills form input[type=number]::-webkit-inner-spin-button,
.newPlayer__skills form input[type=number]::-webkit-outer-spin-button {
   display: none;
   text-align: right;
}
.newPlayer__skills label {
  display: inline-block;
  width: 150px;
}
.newPlayer__skills form input[type=number].yellow {
  color: yellow;
}
.newPlayer__skills form input[type=number].orange {
  color: orange;
}
.newPlayer__skills form input[type=number].red {
  color: red;
}
</style>
