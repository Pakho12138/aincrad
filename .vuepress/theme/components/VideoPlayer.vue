<template>
  <div id="mse"></div>
</template>

<script>
import { defineComponent } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import HlsPlugin from 'xgplayer-hls'

export default defineComponent({
  props: {
    // 播放视频的路径'
    url: {
      type: String,
      default: () => '',
    },
    // 视频封面
    img: {
      type: String,
      default: () => 'https://cn.bing.com/th?id=OHR.MeotoIwa_ZH-CN3126370410_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    const player = new Player({
      id: 'mse',
      url: this.$props.url,
      height: '100%',
      width: '100%',
      plugins: [HlsPlugin]
    });
  },
  methods: {},
});
</script>

<style lang="stylus" scoped></style>
