const plugins = require('./config/plugins');
const nav = require("./config/nav");
const sidebar = require("./config/sidebar");
const friendLink = require("./config/friendLink");

module.exports = {
  base: '/aincrad/',
  title: "AINCRAD",
  description: "别让认知束缚了自己",
  dest: "public",
  head: [
    [
      'link',
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
    [
      'meta',
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  markdown: {
    "lineNumbers": true,
  },
  theme: "reco",
  themeConfig: {
    subSidebar: 'auto',
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类"
      },
      tag: {
        location: 3,
        text: "标签"
      },
      socialLinks: [
        // 信息栏展示社交信息
        {
          icon: 'reco-github',
          link: 'https://github.com/Pakho12138',
        },
        {
          icon: 'reco-mayun',
          link: 'https://gitee.com/pakhoc',
        },
        {
          icon: 'reco-gitlab',
          link: 'https://gitlab.com/',
        },
        {
          icon: 'reco-juejin',
          link: 'https://juejin.cn/user/2342416329748863',
        },
        {
          icon: 'reco-csdn',
          link: 'https://www.csdn.net/',
        },
        {
          icon: 'reco-npm',
          link: 'https://www.npmjs.com/',
        },
      ],
    },
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Pakho",
    authorAvatar: "/avatar.png",
    noFoundPageByTencent: false, //关闭404
    record: "v1.0.0",
    startYear: "2023",
    // 评论插件
    valineConfig: {
      appId: 'vmCTZevnoxQKw5s8SY3zaWTW-gzGzoHsz',// your appId
      appKey: 'VZ4UKu0rBRhwqf1BaQqW6UXd', // your appKey
    },
    // config目录
    nav,
    sidebar,
    friendLink,
  },
  plugins,
}