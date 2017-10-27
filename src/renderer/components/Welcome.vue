<template>
  <div class="welcome">
      <img :ref="'welcomeLogo'" class="welcome__logo" src="../assets/img/logo--big.png" alt="logo">
      <h2 :ref="'welcomeSlogan'" @click="startGame()" class="welcome__slogan animated infinite pulse">{{ slogan }}</h2>
      <audio :ref="'welcomeAudioBack'" loop autoplay>
          <source src="../../static/audio/ambient/stadium--empty.wav" type="audio/wav">
          Your browser does not support the audio element.
      </audio>
      <audio :ref="'clickEffect'">
          <source src="../../static/audio/effects/button--click.wav" type="audio/wav">
          Your browser does not support the audio element.
      </audio>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      slogan: 'Play the game!'
    }
  },
  methods: {
    startGame: function() {

        //Step 1 -> slide logo out
        this.$refs['welcomeLogo'].classList.add('animated');
        this.$refs['welcomeLogo'].classList.add('bounceOutLeft');

        //Step 2-> After the aniamtion bounce the button
        setTimeout(() => {
          this.$refs['clickEffect'].currentTime = 0;
          this.$refs['clickEffect'].play();
          this.$refs['welcomeLogo'].style.position = "absolute";
          this.$refs['welcomeSlogan'].classList.remove('pulse')
          this.$refs['welcomeSlogan'].classList.add('flash')
        }, 500);

        //step 3 -> After flashing bounce slogan left
        setTimeout(() => {
          this.$refs['welcomeSlogan'].classList.remove('flash')
          this.$refs['welcomeSlogan'].classList.remove('infinite')
          this.$refs['welcomeSlogan'].classList.add('bounceOutLeft')
        }, 1000);

        //step 4 -> Emit event "start the game!"
        //step 3 -> After flashing bounce slogan left
        setTimeout(() => {
          this.$emit('gameStarted');
        }, 1500);
    }
  }
}
</script>

<style scoped>

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome__logo {
  width: 100%;
  max-width: 1000px;
}

.welcome__slogan {
  font-size: 4em;
  font-family: 'Lato';
  font-style: italic;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  transition: .2s;
}

.welcome__slogan:hover {
  transform: scale(1.1);
  opacity: 0.7;
}
</style>
