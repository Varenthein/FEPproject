<template>
  <div class="skillbox">
    <div class="box">
      <h3>{{ header }}</h3>
      <div class="skill" v-for="(skill, index) in skills">
        <strong class="skill__label">{{ skillList[index] }}:</strong> <span  v-bind:class="{ 'skill__pkt': true, 'skill__pkt--yellow': skill >= 75, 'skill__pkt--orange': skill >= 90, 'skill__pkt--red': skill >= 95}">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
  props: ["skills", "skillList", "header"],
}
</script>

<style scoped>
.skillbox {
    padding: 20px;
    cursor: pointer;
    transition: .2s;
}
</style>
