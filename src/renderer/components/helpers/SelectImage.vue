<template>
  <div class="selectImage">
  <div v-if="images.length > 0" class="images">
      <div class="animated fadeIn" v-for="image in images">
        <img :style="{ width: imageWidth }" :class="{ 'images__image--active': image.isActive, 'images__image': true}" :src="image.src" @click="pickImage(image.id)">
      </div>
  </div>
  </div>
</template>

<script>
 export default {
  props: ["dataImages", "imageWidth", "imageMargin"],
  data () {
    return {
      images: this.dataImages
    }
  },
  methods: {
    pickImage: function(id) {
       if(this.images.filter((item) => item.isActive == true).length > 0) this.images.filter((item) => item.isActive == true)[0].isActive = false;
       this.images.filter((item) => item.id == id)[0].isActive = true
       this.$forceUpdate();
       this.$emit('imagePicked', id);
    },
  },
  created: function() {
    this.images.map((item) => item.isActive = false);
  },
  watch: {
     dataImages: function (dataImagesNew) {
       this.images = dataImagesNew;
       this.images.map((item) => { item.isActive = false });
     }
   },
}
</script>

<style scoped>

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.images--bordered .images__image {
  margin: 20px;
  background: rgba(0,0,0,0.7);
  border: 1px solid #666;
}

.images__image {
  padding: 10px;
  opacity: 0.6;
  max-width: 150px;
  cursor:pointer;
  transition: .2s;
}

.images__image--active {
  opacity: 1;
  transform: scale(1.1);
}

</style>
