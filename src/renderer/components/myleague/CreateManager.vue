<template>
  <div class="createManager">
    <div class="container">
      <h2 class="page-title text-center">Create new manager!</h2>
      <p class="text-center" v-if="!startCreating">Waiting for the server response...</p>
      <div :ref="'slider'" class="slides" v-else>
        <div class="slide">
          <p class="slide_question">What's your name?</p>
          <input pattern="[a-zA-Z\s]+" class="form-control" type="text" v-model="manager.name"><br>
          <p v-show="manager.name.length > 0 && manager.name.length < 3 || manager.name.length > 225" class="text-muted text-small animated fadeIn">Minimum three characters, maximum 225.</p>
          <a v-show="manager.name.length >= 3 && manager.name.length <= 225" class="btn btn--primary slide__next">Next</a>
        </div>
        <div class="slide">
          <p class="slide_question">How old are you?</p>
          <input class="form-control" type="number" min="20" max="80" v-model="manager.age"><br>
          <p v-show="manager.age < 20 || manager.age > 80" class="text-muted text-small animated fadeIn">Minimium 20, maximum 80.</p>
          <a class="btn slide__back">Back</a><a v-show="manager.age >= 20 && manager.name.length <= 80" class="btn btn--primary slide__next">Next</a>
        </div>
        <div class="slide">
          <p class="slide_question">What are you physics?</p>
          <input class="form-control" type="number" min="150" max="220" v-model="manager.height"> cm<br>
          <input class="form-control" type="number" min="40" max="150" v-model="manager.weight"> kg<br>
          <p v-show="manager.height < 150 || manager.height > 220" class="text-muted text-small animated fadeIn">Height: Minimum 150, maximum 220</p>
          <p v-show="manager.weight < 40 || manager.weight > 150" class="text-muted text-small animated fadeIn">Weight: Minimum 150, maximum 220</p>
          <a class="btn slide__back">Back</a><a v-show="manager.height >= 150 && manager.height <= 220 && manager.weight >= 40 && manager.weight <= 150" class="btn btn--primary slide__next">Next</a>
        </div>
        <div class="slide">
          <p class="slide_question">Where are you from?</p>
          <selectImage @imagePicked="manager.nationality = $event" :imageWidth="'100px'" :dataImages="countries"></selectImage>
          <a class="btn slide__back">Back</a><a v-show="manager.nationality != 0" class="btn btn--primary slide__next">Next</a>
        </div>
        <div class="slide">
          <p class="slide_question">How do do you look like?</p>
          <selectImage class="images--bordered" @imagePicked="manager.avatar = $event" :imageWidth="'200px'" :dataImages="managersFaces"></selectImage>
          <a class="btn slide__back">Back</a><a v-show="manager.avatar != ''" class="btn btn--primary slide__next">Next</a>
        </div>
        <div class="slide">
          <p class="slide_question">What type of manager are you?</p>
          <div class="row">
            <selectSkills @setPicked="manager.skills = $event" :skillSets="managerStyles" :skillList="skillList"/>
          </div>
          <a class="btn slide__back">Back</a><a v-show="Object.keys(manager.skills).length !== 0" @click="createManager()" class="btn btn--primary slide__next">Finish!</a>
        </div>
        <div class="slide">
          <p class="slide_question">That's all! Wait a few seconds for the server response...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service.js'
import { managerService } from '@/services/manager.service.js'
import { countryService } from '@/services/country.service.js'
import { $user, popUpMsg, Slider } from '@/functions.js'
import SelectImage from '@/components/helpers/SelectImage'
import SelectSkills from '@/components/helpers/SelectSkills'

var fs = require('fs');

export default {
  name: 'createManager',
  data () {
    return {
      startCreating: false,
      slider: '',
      manager: {
        name: '',
        age: 20,
        nationality: 0,
        height: 180,
        weight: 80,
        avatar: '',
        skills: {}
      },
      countries: [],
      managersFaces: [],
      skillList: {
        Defence: 'Defence',
        Attack: 'Attack',
        SetPieces: 'Set pieces',
        Penalties: 'Penalties',
        Ambition: 'Ambition',
        Mentality: 'Mentality',
        Agression: 'Agression',
        Teamwork: 'Teamwork',
        Condition: 'Condition',
        ShortPass: 'Short pass',
        LongBall: 'Long ball',
        QuickCounter: 'Quick counter',
        AllForDefence: 'All for defence',
        Possesion: 'Possesion'
      },
      managerStyles: [
        { name: 'Defensive', skills: {
          Defence: 60,
          Attack: 40,
          SetPieces: 50,
          Penalties: 40,
          Ambition: 40,
          Mentality: 50,
          Agression: 50,
          Teamwork: 60,
          Condition: 60,
          ShortPass: 40,
          LongBall: 60,
          QuickCounter: 40,
          AllForDefence: 60,
          Possesion: 40
        }},
        { name: 'Offensive', skills: {
          Defence: 40,
          Attack: 60,
          SetPieces: 50,
          Penalties: 50,
          Ambition: 50,
          Mentality: 50,
          Agression: 50,
          Teamwork: 50,
          Condition: 50,
          ShortPass: 60,
          LongBall: 40,
          QuickCounter: 60,
          AllForDefence: 40,
          Possesion: 60
        }},
        { name: 'Balanced', skills: {
          Defence: 50,
          Attack: 50,
          SetPieces: 50,
          Penalties: 50,
          Ambition: 50,
          Mentality: 50,
          Agression: 50,
          Teamwork: 50,
          Condition: 50,
          ShortPass: 50,
          LongBall: 50,
          QuickCounter: 50,
          AllForDefence: 50,
          Possesion: 50
        }},
        { name: 'Tiki-taka', skills: {
          Defence: 40,
          Attack: 60,
          SetPieces: 50,
          Penalties: 50,
          Ambition: 50,
          Mentality: 50,
          Agression: 40,
          Teamwork: 60,
          Condition: 50,
          ShortPass: 60,
          LongBall: 40,
          QuickCounter: 60,
          AllForDefence: 40,
          Possesion: 60
        }}
      ]
    }
  },
  methods: {
    createManager: function() {
      managerService.createManager(this.manager).then(response => {
        if(response.data.type == "success") {
          popUpMsg('success','Everything went fine!', `Let's get started ${this.manager.name}!`);
          setTimeout(() => { window.location = "#/manager"; }, 2000);
        } else if(response.data.type == "error") {
            let msg = response.data.message.map((item) => `<p>-${item}</p>`);
            popUpMsg('error', 'Something went wrong...', msg.join(""));
            setTimeout(() => { window.location = "#/manager"; }, 2000);
        } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');
      }).catch((err) => {
          popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. <br><br>Sending another request...');
          setTimeout(() => this.createManager(), 5000);
      });
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
          popUpMsg('error', 'You already have your manager!', 'That\'s enough. We don\'t duplicates in our football universe.');
          setTimeout(() => { window.location = "#/manager"; }, 2000);
        } else if(response.data.type == "nomanager") {

          this.startCreating = true;
          setTimeout(() => {
            this.slider = new Slider(this.$refs.slider);
          }, 10);
          countryService.getCountries().then(response => {
            this.countries = response.data;
            this.countries.map((item) => {
              item.src = "/static/img/flags/"+item.code+".png";
            })
        });

        fs.readdir(__dirname+'/../../../../static/img/managers', (err, files) => {
            if (err) {
              popUpMsg('error', 'Something went wrong...', 'Couldn\'t load managers faces');
            }
            else {
              if(files.length > 0) {
                this.managersFaces = files;
                this.managersFaces = this.managersFaces.map((item) => { return { id: item, src: '/static/img/managers/'+item}});
              } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t load managers faces');
            }
          });

        }
        else if(response.data.type == "error") {
          popUpMsg('error', 'Something went wrong...', response.data.message);
        } else popUpMsg('error', 'Something went wrong...', 'Couldn\'t estabilished connection to the server. Try again!');

      }).catch(() => {
        popUpMsg('error', 'Connection failed', 'Couldn\'t estabilshed connection to the server. It could be problem with your internet connection. Otherwise it\'s a problem with API. Try again');
        setTimeout(() => { window.location = "#/"; }, 2000);
      });

    }
  },
  components: { SelectImage, SelectSkills }
}
</script>

<style scoped>

.slide {
  text-align: center;
}

.slide_question {
    font-family: 'Lato';
    font-weight: Bold;
    font-style: italic;
    font-size: 1.5em;
}



</style>
