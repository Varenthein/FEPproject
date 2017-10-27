<template>
  <router-link :to="link.path" class="menu__link">
    <img class="menu__link__image" :src="link.image" alt="menu-img">
    <h3 class="menu__link__title">{{ link.title }}</h3>
  </router-link>
</template>

<script>
export default {
  name: 'menu-item',
  props: ["link"],
  data () {
    return {
    }
  }
}
</script>

<style scoped>

.menu__link {
  display: block;
  width: 100%;
  border: 1px solid #333;
  height: 180px;
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  box-shadow: 0 0 40px #000 inset;
  cursor: pointer;
  text-decoration: none;
}

.menu__link__title {
  display: inline-block;
  padding: 5px 20px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 0 20px #333;
  font-size: 1.5em;
}

.menu__link__image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 0;
  z-index: -1;
  transition: 1s;
  top: 0;
  left: 0;
}

.menu__link:hover .menu__link__image {
  left: -10%;
  top: -10%;
  width: 120%;
  height: 120%;
}

</style>
