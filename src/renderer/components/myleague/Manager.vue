<template>
  <div class="manager">
    <div class="container">
      <div :ref="'router'">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manager',
  data () {
    return {
    }
  },
  watch: {
    '$route': function() {
      this.$refs['router'].classList.remove('animated');
      this.$refs['router'].classList.remove('bounceInLeft');
      setTimeout(() => {
        this.$refs['router'].classList.add('animated');
        this.$refs['router'].classList.add('bounceInLeft');
      }, 2)
    }
  },
}
</script>

<style scoped>

</style>
