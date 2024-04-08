<template>
  <div class="abstract-item" @click="$router.push(item.path)">
    <reco-icon v-if="item.frontmatter.sticky" icon="reco-sticky" />
    <div class="info-detail">
      <div class="title">
        <reco-icon v-if="item.frontmatter.keys" icon="reco-lock" />
        <router-link :to="item.path">{{ item.title }}</router-link>
      </div>
      <PageInfo :pageInfo="item" :currentTag="currentTag" style="margin-top: 8px; --text-color-sub: #999;"> </PageInfo>
      <div class="abstract" v-html="item.excerpt"></div>
    </div>
    <div class="thumbnail-wrapper">
      <img class="thumbnail" :src="item.firstImage || 'https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/child-1024x576.jpg'" onerror="this.src='https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/child-1024x576.jpg'" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RecoIcon } from '@vuepress-reco/core/lib/components';
import PageInfo from './PageInfo';
export default defineComponent({
  components: { PageInfo, RecoIcon },
  props: ['item', 'currentPage', 'currentTag'],
});
</script>

<style lang="stylus" scoped>
.abstract-item
  display flex
  position relative
  margin: 0 auto 40px;
  width 100%
  height 300px
  overflow: hidden;
  border-radius: $borderRadius
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition all .3s
  background-color var(--background-color)
  cursor: pointer;
  > * {
    pointer-events: auto;
  }
  &:nth-child(2n)
    flex-direction row-reverse
  &:hover .thumbnail
    transform scale(1.2) rotate(5deg)
  .reco-sticky
    position absolute
    top 0
    left 0
    display inline-block
    color $accentColor
    font-size 2.4rem
  &:hover
    box-shadow: var(--box-shadow-hover)
  .thumbnail-wrapper
    width 55%
    overflow hidden
    .thumbnail
      width 100%
      height 100%
      object-fit cover
      object-position center
      transition all .6s
  .info-detail
    flex 1
    overflow hidden
    padding 20px
    .title
      position: relative;
      font-size: 1.28rem;
      line-height: 46px;
      display: inline-block;
    a
      color: var(--text-color);
    .reco-lock
      font-size 1.28rem
      color $accentColor
    &:after
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: $accentColor;
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      transition: .3s ease-in-out;
    &:hover a
      color $accentColor
    &:hover:after
      visibility visible
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    .tags
      .tag-item
        &.active
          color $accentColor
        &:hover
          color $accentColor
    .abstract
      color #666
      line-height 1.6
@media (max-width: $MQMobile)
  .tags
    display block
    margin-top 1rem;
    margin-left: 0!important;
</style>
