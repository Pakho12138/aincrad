<template>
  <div id="mse"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Player from 'xgplayer';
import { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import HlsPlugin from 'xgplayer-hls';

const props = defineProps({
  // 播放视频的路径'
  url: {
    type: String,
    default: () => '',
  },
  // 视频封面
  poster: {
    type: String,
    default: () => '',
  },
});
const emit = defineEmits(['loadedmetadata', 'canplay', 'waiting', 'playing', 'pause', 'error']);

const playerInstance = ref();
const initPlayer = () => {
  playerInstance.value = new Player({
    id: 'mse',
    url: props.url,
    // url: 'https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/video/YOASOBI - BiriBiri Official Music Video.mp4',
    height: '100%',
    width: '100%',
    autoplay: true,
    plugins: [HlsPlugin], // 自定义插件列表
    // ignores: [], // 禁用内置插件列表
    videoInit: true, // 是否默认初始化video
    loop: true, // 是否循环播放
    poster: props.poster, // 封面图地址
    controls: false, // 是否使用底部控制栏
    miniprogress: true, // 是否启用mini进度条
    // pip: true, // 是否使用画中画插件
  });

  playerInstance.value.on(Events.LOADED_DATA, () => {
    emit('loadedmetadata');
  });
  playerInstance.value.on(Events.CANPLAY, () => {
    emit('canplay');
  });
  playerInstance.value.on(Events.WAITING, () => {
    emit('waiting');
  });
  playerInstance.value.on(Events.PLAYING, () => {
    emit('playing');
  });
  playerInstance.value.on(Events.PAUSE, () => {
    emit('pause');
  });
  playerInstance.value.on(Events.ERROR, () => {
    emit('error');
  });
};

onMounted(() => {
  initPlayer();
});

defineExpose({
  player: playerInstance,
});
</script>

<style lang="stylus" scoped>
:deep(.xgplayer-enter) {
  display: none !important;
}
:deep(.xgplayer-start) {
  display: none !important;
}
:deep(video){
  object-fit: cover;
}
</style>
