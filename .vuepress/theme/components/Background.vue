<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(url, index) in $themeConfig.heroImages" :key="index">
        <!-- <img :src="url" v-if="index==0||index==($themeConfig.heroImages.length-1)" /> -->
        <img :data-src="url" class="swiper-lazy" />
        <div class="swiper-lazy-preloader swiper-lazy-preloader"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { EventBus } from '../helpers/eventBus';

const props = defineProps({
  // 播放视频的路径'
  initialSlide: {
    type: Number,
    default: () => 0,
  },
});

const swiper = ref();
onMounted(() => {
  swiper.value = new Swiper('.swiper-container', {
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    initialSlide: props.initialSlide, // 初始下标
    loop: true,
    speed: 500,
    effect: 'fade',
    lazy: {
      // 懒加载
      loadPrevNext: true, // 允许将延迟加载应用到最接近的slide的图片（前一个和后一个slide）
      loadPrevNextAmount: 2, // 设置在延迟加载图片时提前多少个slide
      loadOnTransitionStart: true, // 当slide在transition开始时加载图片
    },
    updateOnImagesReady: true,
    on: {
      lazyImageReady: function (slideEl, imageEl) {
        //图片完成加载时隐藏loading
        const classList = slideEl.classList;
        if (classList.contains('swiper-slide-active')) {
          EventBus.$emit('hideLoading');
        }
      },
    },
  });
});

defineExpose({
  swiper,
});
</script>

<style lang="stylus" scoped>
.swiper-container {
  --swiper-theme-color: $accentColor; // swiper 主题色
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  .swiper-slide img {
    width: 100%;
    height: 100%;
    transition: 1s linear 2s;
    transform: scale(1.1, 1.1);
    object-fit: cover;
  }
  .swiper-slide-active img,
  .swiper-slide-duplicate-active img {
    transition: 6s linear;
    transform: scale(1, 1);
  }
}
</style>
