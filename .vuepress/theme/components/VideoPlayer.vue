<template>
  <DPlayer id="dplayer" ref="player" class="dplayer video-box" :options="options"></DPlayer>
</template>

<script>
import { defineComponent } from 'vue';
// import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
// import DPlayer from 'dplayer';
/*
npm i dplayer -S // 视频播放器插件
npm i hls.js -S  // 播放hls流插件
*/
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
      dp: null,
      options: {
        container: this.$refs.player, //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: '#b7daff', // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: 'zh-cn', // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: 'auto', // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: 'https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png', // 在视频左上角上打一个logo
        video: {
          // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4', // 播放视频的路径
          url: 'https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/video/花火PV/花火PV.m3u8', // 播放视频的路径
          // quality: [
          //   // 设置多个质量的视频
          //   {
          //     name: '高清',
          //     url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          //     type: 'auto', // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          //   },
          //   {
          //     name: '标清',
          //     url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          //     type: 'auto',
          //   },
          // ],
          defaultQuality: 0, // 默认是高清
          pic: 'https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/202404132258293.png', // 视频封面图片
          // thumbnails: 'https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/202404132207985.png', // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
          type: "customHls",
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
        },
        // subtitle: {
        //   //字幕
        //   url: "", //字幕网址
        //   color: "#fff", //字幕颜色
        //   fontSize: "20px",
        //   bottom: "40px"
        // },
        // contextmenu: [
        //   //  自定义上下文菜单
        //   // 右键菜单
        //   {
        //     text: 'b站',
        //     link: 'https://www.bilibili.com',
        //   },
        //   {
        //     text: '选项二',
        //     click: player => {
        //       console.log(player);
        //     },
        //   },
        // ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.player.$el.querySelector('video').setAttribute('crossorigin', 'anonymous');
    });
  },
  methods: {
  },
});
</script>

<style lang="stylus" scoped></style>
