<template>
  <div class="home-blog">
    <div class="hero">
      <div class="hero-bg" :style="{ ...bgImageStyle }"></div>

      <div class="video-wrapper">
        <video ref="videoRef" v-if="$frontmatter.bgVideo" v-show="showBgVideo" class="hero-video" :src="$frontmatter.bgVideo" preload="auto" @canplay="videoCanPlay" @play="handleVideoPlay" @pause="handleVideoPause"></video>
        <div class="video-btn" :class="{ 'video-play': !isPlay, 'video-pause': isPlay }" @click="toggleVideoStatus"></div>
        <div class="video-stu" :class="{ show: showBgVideo && !isPlay }">{{ !isCanPlay ? '视频加载中...' : '已暂停..'}}.</div>
      </div>

      <ModuleTransition>
        <img class="hero-img" v-if="recoShowModule && $frontmatter.heroImage" :style="heroImageStyle || {}" :src="$withBase($frontmatter.heroImage)" alt="hero" />
      </ModuleTransition>

      <div class="focus-info" :class="{ hide: isPlay }">
        <ModuleTransition delay="0.04">
          <h1 class="hover" v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || 'vuePress-theme-reco' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <div>
            <span id="description" v-if="recoShowModule && $frontmatter.tagline !== null" class="description hover">
              <!-- {{ $frontmatter.tagline || $description || 'Welcome to your vuePress-theme-reco site' }} -->
            </span>
          </div>
        </ModuleTransition>
      </div>

      <component v-if="bubbles && !isPlay" :is="bubbles" :options="options"></component>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo />
          <h4><reco-icon icon="reco-category" /> {{ $recoLocales.category }}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ backgroundColor: getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr />
          <h4 v-if="$tags.list.length !== 0"><reco-icon icon="reco-tag" /> {{ $recoLocales.tag }}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><reco-icon icon="reco-friend" /> {{ $recoLocales.friendLink }}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom />
    </ModuleTransition>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import TagList from '@theme/components/TagList';
import FriendLink from '@theme/components/FriendLink';
import NoteAbstract from '@theme/components/NoteAbstract';
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components';
import PersonalInfo from '@theme/components/PersonalInfo';
import { getOneColor } from '@theme/helpers/other';
import { useInstance, useShowModule } from '@theme/helpers/composable';
import Typed from '@theme/lib/typed.js';

export default defineComponent({
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  data() {
    return {
      recoShow: false,
      currentPage: 1,
      tags: [],
      bubbles: null,
      options: null,
      showBgVideo: false,
      isCanPlay: false,
      isPlay: false,
    };
  },
  setup(props, ctx) {
    const instance = useInstance();

    const state = reactive({
      recoShow: false,
      heroHeight: 0,
    });

    const recoShowModule = useShowModule();

    const heroImageStyle = computed(() => instance.$frontmatter.heroImageStyle || {});

    // 原先的背景封面图片
    // const bgImageStyle = computed(() => {
    //   const url = instance.$frontmatter.bgImage ? instance.$withBase(instance.$frontmatter.bgImage) : require('../../images/bg.svg');

    //   const initBgImageStyle = {
    //     textAlign: 'center',
    //     overflow: 'hidden',
    //     background: `url(${url}) center/cover no-repeat`,
    //   };

    //   const { bgImageStyle } = instance.$frontmatter;

    //   return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle;
    // });

    // 自定义修改的背景图片设置, 随机产生一张图片
    const bgImageStyle = computed(() => {
      const url = instance.$themeConfig.heroImages[Math.floor(Math.random() * instance.$themeConfig.heroImages.length)]
        ? instance.$withBase(instance.$themeConfig.heroImages[Math.floor(Math.random() * instance.$themeConfig.heroImages.length)])
        : instance.$frontmatter.bgImage; //如果用户没有设置背景图，设置主题默认封面图

      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(${url}) center/cover no-repeat `,
      };
      // 获取用户自定义的样式，优先更高
      const { bgImageStyle } = instance.$frontmatter;

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle;
    });

    onMounted(() => {
      state.heroHeight = document.querySelector('.hero').clientHeight;
      state.recoShow = true;

      new Typed('#description', {
        strings: instance.$frontmatter.tagline,
        typeSpeed: 35,
        backDelay: 1500,
        backSpeed: 25,
        cursorChar: ' __',
        loop: true,
      });
    });

    return { recoShowModule, heroImageStyle, bgImageStyle, ...toRefs(state), getOneColor };
  },
  mounted() {
    console.log(
      '\n%c欢迎来到我的博客🎮我是Pakho！🚀',
      'color:#6366f1; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #6366f1; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;'
    );

    import('vue-canvas-effect/src/components/bubbles').then(module => {
      this.bubbles = module.default;
    });
    this.recoShow = true;

    // 添加向下滚动箭头
    const ifJanchor = document.getElementById('JanchorDown');
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById('JanchorDown');
    targetA.addEventListener('click', e => {
      // 添加点击事件
      this.scrollFn();
    });
  },

  methods: {
    paginationChange(page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight);
      }, 100);
    },
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path });
    },
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight - 58; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    },
    videoCanPlay(){
      this.isCanPlay = true;
    },
    toggleVideoStatus() {
      if (this.isPlay) {
        this.$refs.videoRef.pause();
      } else {
        this.$refs.videoRef.play();
        if (!this.showBgVideo) {
          this.showBgVideo = true;
        }
      }
    },
    handleVideoPlay() {
      this.isPlay = true;
    },
    handleVideoPause() {
      this.isPlay = false;
    },
  },
});
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .hero {
    margin $navbarHeight auto 0
    position relative
    box-sizing border-box
    padding 0 20px
    height 100vh
    display flex
    align-items center
    justify-content center
    text-align center
    overflow hidden

    .hero-bg{
      position absolute
      width 100%
      height 100%
      animation zoom-in 10s linear forwards, fade-in 2.5s linear forwards
    }

    .video-wrapper{
      position absolute
      top 0
      bottom 0
      left 0
      right 0

      .hero-video {
        width 100%
        height 100%
        object-fit cover
        object-position center
        pointer-events none
      }

      .video-btn {
        position: absolute;
        bottom: 3px;
        right: 5px;
        width: 32px;
        height: 32px;
        z-index: 7;
        background-position: center;
        background-size: cover;
        cursor: pointer;
        opacity: .8;
        animation: poi-face 10s linear infinite alternate;
        &.video-play {
          background: url(https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/202403221729599.png);
        }
        &.video-pause {
          background: url(https://cdn.jsdelivr.net/gh/Pakho12138/PicGoCDN/other/202403221738731.png);
        }
      }

      .video-stu{
        position: absolute;
        bottom: -100px;
        left: 0;
        right: 0;
        margin: auto;
        padding: 6px 15px;
        text-align: center;
        color: #fff;
        width: 100%;
        background-color: rgba(0, 0, 0, .8);
        border-radius: 0;
        font-size: 18px;
        z-index: 1;
        transition: .4s ease all;
        &.show{
          bottom: 0;
        }
      }
    }

    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem
    }

    .focus-info {
      z-index 1
      transition: .4s ease all;
      &.hide{
        transform: translateY(-999px);
      }
    }

    h1 {
      display: block;
      margin:0 auto 1.8rem;
      font-size: 2.5rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    padding 0 20px
    max-width $homePageWidth
    .blog-list {
      flex auto
      width 0
      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .info-wrapper {
      position -webkit-sticky;
      position sticky;
      top 70px
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
      h4 {
        color var(--text-color)
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)
          &:hover {
            transform scale(1.04)
            a {
              color $accentColor
            }
          }
          a {
            display flex
            justify-content: space-between
            align-items: center
            color var(--text-color)
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size 13px
              color #fff
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

/* -------------添加向下滚动箭头------------- */
.anchor-down {
  display: block;
  margin: 12rem auto 0;
  bottom: 45px;
  width: 30px;
  height: 30px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 3.5s infinite;
  position: absolute;
  left: 50%;
  bottom: 30%;
  margin-left: -15px;
  cursor: pointer;
  z-index 1
}
@-webkit-keyframes bounce-in{
  0%{transform:translateY(0); opacity: 1}
  50%{transform:translateY(-20px); opacity: 0.5}
  to{transform:translateY(0); opacity: 1}
}
@keyframes bounce-in{
  0%{transform:translateY(0); opacity: 1}
  50%{transform:translateY(-20px); opacity: 0.5}
  to{transform:translateY(0); opacity: 1}
}
.anchor-down::before {
  content: "";
  width: 30px;
  height: 30px;
  display: block;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}

@-webkit-keyframes zoom-in{
  to{transform:scale(1.1);}
}
@keyframes zoom-in{
  to{transform:scale(1.1);}
}
@-webkit-keyframes fade-in{
  from{filter: blur(5px);}
  to{filter: blur(0);}
}
@keyframes fade-in{
  from{filter: blur(5px);}
  to{filter: blur(0);}
}

@-webkit-keyframes poi-face {
    2%,24%,80% {
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      transform: translate(0,0) rotate(0)
    }
}

@keyframes poi-face {
    2%,24%,80% {
      transform: translate(0,1.5px) rotate(1.5deg)
    }

    4%,68%,98% {
      transform: translate(0,-1.5px) rotate(-.5deg)
    }

    38%,6% {
      transform: translate(0,1.5px) rotate(-1.5deg)
    }

    8%,86% {
      transform: translate(0,-1.5px) rotate(-1.5deg)
    }

    10%,72% {
      transform: translate(0,2.5px) rotate(1.5deg)
    }

    12%,64%,78%,96% {
      transform: translate(0,-.5px) rotate(1.5deg)
    }

    14%,54% {
      transform: translate(0,-1.5px) rotate(1.5deg)
    }

    16% {
      transform: translate(0,-.5px) rotate(-1.5deg)
    }

    18%,22% {
      transform: translate(0,.5px) rotate(-1.5deg)
    }

    20%,36%,46% {
      transform: translate(0,-1.5px) rotate(2.5deg)
    }

    26%,50% {
      transform: translate(0,.5px) rotate(.5deg)
    }

    28% {
      transform: translate(0,.5px) rotate(1.5deg)
    }

    30%,40%,62%,76%,88% {
      transform: translate(0,-.5px) rotate(2.5deg)
    }

    32%,34%,66% {
      transform: translate(0,1.5px) rotate(-.5deg)
    }

    42% {
      transform: translate(0,2.5px) rotate(-1.5deg)
    }

    44%,70% {
      transform: translate(0,1.5px) rotate(.5deg)
    }

    48%,74%,82% {
      transform: translate(0,-.5px) rotate(.5deg)
    }

    52%,56%,60% {
      transform: translate(0,2.5px) rotate(2.5deg)
    }

    58% {
      transform: translate(0,.5px) rotate(2.5deg)
    }

    84% {
      transform: translate(0,1.5px) rotate(2.5deg)
    }

    90% {
      transform: translate(0,2.5px) rotate(-.5deg)
    }

    92% {
      transform: translate(0,.5px) rotate(-.5deg)
    }

    94% {
      transform: translate(0,2.5px) rotate(.5deg)
    }

    0%,100% {
      transform: translate(0,0) rotate(0)
    }
}
</style>
