import ImgLazy from '../plugins/vuepress-plugin-img-lazy/ImgLazy'

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  Vue.component(ImgLazy.name, ImgLazy);
}