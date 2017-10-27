<template>
  <header>
    <div class="container">
      <img class="header__logo animated bounceInDown" src="../assets/img/logo--big.png" alt="logo">
      <user></user>
    </div>
  </header>
</template>

<script>
import User from './User'
export default {
  name: 'game-header',
  data () {
    return {
    }
  },
  components: { 'user': User},
}
</script>

<style scoped>
/* HEADER */

header {
  margin-top: 200px;
}
.header__logo {
  width: 400px;
}
</style>
