<template>
  <div class="skillSets">
  <div v-if="skillSets.length > 0" class="row">
      <skills :ref="'set-'+index" class="col-3 col-md-6 col-sm-12" v-for="(set, index) in skillSets" @click.native="pickSet(set.skills, index)" :class="{ 'skillset--active': set.isActive, 'skillSet': true }" :skillList="skillList" :skills="set.skills" :header="set.name"></skills>
  </div>
  </div>
</template>

<script>
 import Skills from '@/components/helpers/Skills'

 export default {
  props: ["skillSets", "skillList"],
  data () {
    return {
      images: this.dataImages
    }
  },
  methods: {
    pickSet: function(skills, index) {
      setTimeout(() => {
        this.skillSets.map((item, i) => {
          this.$refs['set-'+i][0].$el.classList.remove('skillSet--active');
        });
        this.$refs['set-'+index][0].$el.classList.add('skillSet--active');
      }, 10);
      this.$forceUpdate();
      this.$emit('setPicked', skills);
    },
  },
  components: { Skills }
}
</script>

<style scoped>

.skillSet {
  transition: .2s;
  opacity: 0.7;
}
.skillSet--active {
  transition: .2s;
  opacity: 1;
  transform: scale(1.05);
}

</style>
