<template>
  <img
    v-bind="$attrs"
    :src="config.loadImage"
    :data-src="dataSrc"
    :loading="config.useNative ? 'lazy' : null"
    :class="[config.selector, { 'show' : showAnimate }]"
    @load="handleImageLoad"
    @error="handleError"
  />
</template>

<script>
import config from '@dynamic/imgLazy'

export default {
  name: 'ImgLazy',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      isFirst: true,
      showAnimate: false
    }
  },
  computed: {
    config() {
      return config
    },
    dataSrc() {
      return this.src &&
        this.src.charAt(0) === '/' &&
        !this.src.startsWith(this.$site.base)
        ? this.$site.base + this.src.slice(1)
        : this.src
    }
  },
  methods: {
    handleError(e){
      config.errorImage && (e.currentTarget.src = config.errorImage);
      this.$emit('error', e);
    },
    handleImageLoad(){
      if (!this.isFirst) {
        this.showAnimate = true;
      }
      this.isFirst = false;
    }
  },
}
</script>

<style lang="stylus" scoped>
.show
  animation blur-in 1s

@-webkit-keyframes blur-in {
  0% {
    filter: blur(10px);
  }

  100% {
    filter: blur(0);
  }
}
@keyframes blur-in {
  0% {
    filter: blur(10px);
  }

  100% {
    filter: blur(0);
  }
}
</style>
