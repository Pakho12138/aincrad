import ImgLazy from '../plugins/vuepress-plugin-img-lazy/ImgLazy'
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  Vue.component(ImgLazy.name, ImgLazy);
  Vue.component('DPlayer' ,VueDPlayer);
}