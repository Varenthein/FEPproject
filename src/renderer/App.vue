<template>
  <div id="app">

    <!-- HEADER -->
    <game-header v-if="headerShow"></game-header>

    <!-- PAGE CONTENT -->
    <div class="page" :ref="'router'">
      <router-view v-if="routerShow"></router-view>
    </div>

    <!-- WELCOME SCREEN -->
    <welcome v-if="welcomeShow" @gameStarted="prepareGame()"></welcome>

    <!-- MUSIC -->
    <audio :ref="'effect-stadium'" loop>
        <source src="../static/audio/ambient/stadium--full.wav" type="audio/wav">
    </audio>
    <audio :ref="'song-0'" loop>
        <source src="../static/audio/songs/Franz Ferdinand - Take Me Out.mp3" type="audio/mp3">
    </audio>

  </div>
</template>

<script>

require('animate.css')

import Welcome from './components/Welcome'
import GameHeader from './components/GameHeader'

export default {
  name: 'app',
  data () {
    return {
      routerShow: false,
      headerShow: false,
      welcomeShow: true
    }
  },
  methods: {

    /************** PREPARE GAME ***************/

    prepareGame: function() {

        //show page content and header, hide welcome screen
        this.routerShow = true
        this.headerShow = true
        this.welcomeShow = false

        //turn on song
        this.$refs['song-0'].play()

        //fadeIn router
        this.routerFadeIn()
    },

    /************** ROUTER->fadeIn ***************/

    routerFadeIn: function() {
        this.$refs['router'].classList.add('animated')
        this.$refs['router'].classList.add('bounceInLeft')
    },

    /************** ROUTER->fadeOut ***************/

    routerFadeOut: function() {
      this.$refs['router'].classList.add('animated')
      this.$refs['router'].classList.add('bounceInLeft')
    },

    /************** hookGoBack  ***************/

    hookGoBack: function() {

      document.onkeydown = function(evt) {

          evt = evt || window.event
          let isEscape = false

          if ("key" in evt) isEscape = (evt.key == "Escape" || evt.key == "Esc")
          else isEscape = (evt.keyCode == 27)

          if (isEscape) {
            if(window.location.hash != "#/") history.back();
          }

      }

    }

  },
  created: function() {

    //at the start always go back to start screen
    if(window.location.hash != "#/") {
        window.location = "";
    }

    //hook return event (by clicking ESC, we return to previous page)
    this.hookGoBack();
  },
  watch: {

    /************** ON ROUTE CHANGE ***************/

    '$route': function() {

      //hide router
      this.routerFadeOut()
      //after two seconds show router
      setTimeout(() => this.routerFadeOut(), 2000)

    }
  },
  components: {Welcome: Welcome, GameHeader: GameHeader},
}
</script>

<style>

body {
    background: url(assets/img/game__back.png) no-repeat fixed center center;
    background-size: cover;
    margin: 0;
    font-family: 'Lato';
    overflow-x: hidden;
}

/* FONTS */

@font-face {
    font-family: 'Lato';
    src: url('assets/fonts/lato-bold-webfont.woff2') format('woff2'),
         url('assets/fonts/lato-bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'latobold_italic';
    src: url('assets/fonts/lato-bolditalic-webfont.woff2') format('woff2'),
         url('assets/fonts/lato-bolditalic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'latoitalic';
    src: url('assets/fonts/lato-italic-webfont.woff2') format('woff2'),
         url('assets/fonts/lato-italic-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'latoregular';
    src: url('assets/fonts/lato-regular-webfont.woff2') format('woff2'),
         url('assets/fonts/lato-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/* GRID */

.row {
    display: flex;
    flex-wrap: wrap;
    align-items:flex-start;
}

[class*="col-"] {
  position: relative;
  box-sizing: border-box;
  padding: 5px;
  width: 0;
  flex-grow: 1;
  min-height: 1px;
}

.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width:41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

.col-offset-1 {margin-left: 8.33%;}
.col-offset-2 {margin-left: 16.66%;}
.col-offset-3 {margin-left: 25%;}
.col-offset-4 {margin-left: 33.33%;}
.col-offset-5 {margin-left: 41.66%;}
.col-offset-6 {margin-left: 50%;}
.col-offset-7 {margin-left: 58.33%;}
.col-offset-8 {margin-left: 66.66%;}
.col-offset-9 {margin-left: 75%;}
.col-offset-10 {margin-left: 83.33%;}
.col-offset-11 {margin-left: 91.66%;}

@media (max-width: 1000px) {
  .col-md-1 {width: 8.33%;}
  .col-md-2 {width: 16.66%;}
  .col-md-3 {width: 25%;}
  .col-md-4 {width: 33.33%;}
  .col-md-5 {width:41.66%;}
  .col-md-6 {width: 50%;}
  .col-md-7 {width: 58.33%;}
  .col-md-8 {width: 66.66%;}
  .col-md-9 {width: 75%;}
  .col-md-10 {width: 83.33%;}
  .col-md-11 {width: 91.66%;}
  .col-md-12 {width: 100%;}
}

@media (max-width: 768px) {
  .col-sm-1 {width: 8.33%;}
  .col-sm-2 {width: 16.66%;}
  .col-sm-3 {width: 25%;}
  .col-sm-4 {width: 33.33%;}
  .col-sm-5 {width:41.66%;}
  .col-sm-6 {width: 50%;}
  .col-sm-7 {width: 58.33%;}
  .col-sm-8 {width: 66.66%;}
  .col-sm-9 {width: 75%;}
  .col-sm-10 {width: 83.33%;}
  .col-sm-11 {width: 91.66%;}
  .col-sm-12 {width: 100%;}

  .container--small {
    padding-right: 20px;
  }
}

/* APP */

#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
  animation-duration: 3s;
  animation-fill-mode: both;
  animation-name: fadeIn;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
}

/* CONTAINERS */

.container {
  max-width: 1300px;
  padding: 0px 20px 0px 20px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}

.container--small {
  padding-right: 200px;
}

.page .container {
  min-height: 576px;
}

/* PAGE-TITLE */

.page-title {
  display: block;
  font-style: italic;
  font-weight: bold;
  font-size: 3em;
  width: 100%;
  margin: 10px 0;
}

.page-title:before {
  content: "";
  display: inline-block;
	width: 0;
	height: 0;
	border-top: 20px solid transparent;
	border-left: 40px solid rgb(225,0,39);
	border-bottom: 20px solid transparent;
  margin-right: 10px;
  position: relative;
  top: 3px;
  transform: rotate(4deg);
}

.page-subtitle {
  font-size: 1.8em;
}

/* BOX */

.box {
  background: rgba(0,0,0,0.7);
  border: 1px solid #666;
  padding: 20px;
}

/* TABS */

.tab__title {
  display: block;
  border-bottom: 1px solid #fff;
  margin: 10px 0;
  width: 100%;
  cursor: pointer;
}
.tab__content {
  transition: .2s;
  overflow: hidden;
}

/* BUTTONS */

.btn {
  display: inline-block;
  border: none;
  padding: 10px 15px;
  margin: 10px;
  font-size: 1.2rem;
  border: 1px solid #333;
  background: rgba(0,0,0,0.7);
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

.btn--primary {
  border-color: rgb(226,0,38);
  background: rgb(226,0,38);
}

/* FORMS */

.form-control {
  border: 1px solid #333;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 10px 10px;
  font-size: 1.2rem;
  margin: 15px;
}

/* TEXT */

.text-muted {
  opacity: 0.8;
  font-style: italic;
}

.text-center {
  text-align: center;
}

.text-small {
  font-size: 0.8em;
}

/* AlERTS */

.alert {
  font-family: Lato;
  max-width: 600px;
  margin: auto;
  position: absolute;
  border: 1px solid #333;
  background: rgba(0,0,0,0.9);
  color: #fff;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 0 40px 20px rgba(0,0,0,0.7);
  top: 50%;
  transform: translateY(-50%);
}

.alert__closeBtn {
  border:none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2em;
  font-weight: bold;
  background: none;
  cursor: pointer;
  outline: none;
  color: rgb(226,0,38);
}

.alert--error h3 {
  color: rgb(226,0,38);
}

.alert--success h3 {
  color: #27ae60;
}

/* POSITIONS */


.position {
  padding: 2px 5px;
  text-align: center;
  border-radius: 3px;
  color: #fff;
  font-size: 0.8em;
  margin: 2px 0px;
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

/* SKILLS */

.skills {
  font-size: 0.8em;
}
.skill {
  margin: 5px 0;
}
.skill__pkt {
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: rgba(0,0,0,0.7);
  display: inline-block;
}

.skill__label {
  display: inline-block;
  width: 150px;
}
.skill__pkt--yellow {
  color: yellow;
}
.skill__pkt--orange {
  color: orange;
}
.skill__pkt--red {
  color: red;
}

/* OTHERS */

.muted {
  opacity: 0.5;
}

</style>
