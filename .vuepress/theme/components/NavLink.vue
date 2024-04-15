<template>
  <router-link class="nav-link" :to="link" v-if="!isExternal(link)" :exact="exact">
    <div @mouseenter="$kbnShowTip(link == '/' ? '点击可回到<b>“主页”</b>哦~' : `想看看${pTitle}<b>“${item.text}”</b>么？`)">
      <reco-icon :icon="`${item.icon}`" />
      {{ item.text }}
    </div>
  </router-link>
  <a v-else :href="link" class="nav-link external" :target="isMailto(link) || isTel(link) ? null : '_blank'" :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'">
    <div @mouseenter="$kbnShowTip(`想访问网页<b>“${item.text}”</b>么？`)">
      <reco-icon :icon="`${item.icon}`" />
      {{ item.text }}
      <OutboundLink />
    </div>
  </a>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue';
import { isExternal, isMailto, isTel, ensureExt } from '@theme/helpers/utils';
import { RecoIcon } from '@vuepress-reco/core/lib/components';
import { useInstance } from '@theme/helpers/composable';

export default defineComponent({
  components: { RecoIcon },

  props: {
    item: {
      required: true,
    },
    pTitle: {
      default: ''
    },
  },

  setup(props, ctx) {
    const instance = useInstance();

    const { item } = toRefs(props);

    const link = computed(() => ensureExt(item.value.link));

    const exact = computed(() => {
      if (instance.$site.locales) {
        return Object.keys(instance.$site.locales).some(rootLink => rootLink === link.value);
      }
      return link.value === '/';
    });

    return { link, exact, isExternal, isMailto, isTel };
  },
});
</script>
