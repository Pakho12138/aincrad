const BASE_URL = 'https://pakhoc.gitee.io';
const MUSIC_LIST = [
  { artist: 'YOASOBI', name: '夜に駆ける' },
].map((music) => ({
  name: music.name,
  artist: music.artist,
  url: `${BASE_URL}/assets/music/${music.name}.mp3`,
  cover: `${BASE_URL}/assets/music/${music.name}.png`,
}))

module.exports = {
  base: '/aincrad/',
  "title": "AINCRAD",
  "description": "Unlimited World",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        text: "主页",
        link: "/",
        icon: "reco-home"
      },
      {
        text: "日志",
        link: "/timeline/",
        icon: "reco-date"
      },
      {
        text: "文档",
        icon: "reco-document",
        items: [
          { text: "CssWorld", link: "/docs/css-world/" },
        ],
      },
      {
        text: "社交账号",
        icon: "reco-account",
        items: [
          {
            "text": "Gitee",
            "link": "https://gitee.com/pakhoc",
            "icon": "reco-mayun"
          },
          {
            "text": "GitHub",
            "link": "https://github.com/Pakho12138",
            "icon": "reco-github"
          }
        ]
      }
    ],
    subSidebar: 'auto',
    sidebar: {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/docs/css-world/": [
        "",
        "4.2",
        "9.1",
        "9.2",
        "9.3",
      ]
    },
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
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "logo": "/avatar.png",
        "link": "https://gitee.com/pakhoc"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "logo": "/avatar.png",
        "link": "https://gitee.com/pakhoc"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Pakho",
    "authorAvatar": "/avatar.png",
    "record": "v1.0.0",
    "startYear": "2023",
    // 评论插件
    valineConfig: {
      appId: 'vmCTZevnoxQKw5s8SY3zaWTW-gzGzoHsz',// your appId
      appKey: 'VZ4UKu0rBRhwqf1BaQqW6UXd', // your appKey
    },
  },
  "markdown": {
    "lineNumbers": true
  },
  plugins: [
    // 看板娘
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang', {
        theme: [
          'wanko', 'miku', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'blackCat', 'z16'
        ],
        clean: false,
        messages: {
          welcome: '欢迎来到我的博客', home: '心里的花，我想要带你回家。', theme: '好吧，希望你能喜欢我的其他小伙伴。', close: '你不喜欢我了吗？痴痴地望着你。'
        },
        messageStyle: { right: '68px', bottom: '290px' },
        width: 250,
        height: 320
      }
    ],
    // 公告
    // ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
    //   title: '公告',
    //   body: [
    //     {
    //       type: 'title',
    //       content: '欢迎加我的QQ/vx 🎉🎉🎉',
    //       style: 'text-aligin: center;',
    //     },
    //     {
    //       type: 'text',
    //       content: 'QQ/VX：326061636',
    //       style: 'text-align: center;'
    //     },
    //     {
    //       type: 'text',
    //       content: '喜欢的主题特效可以去个人信息',
    //       style: 'text-align: center;'
    //     },
    //     {
    //       type: 'text',
    //       content: '友链或疑问均可在留言板给我留言',
    //       style: 'text-align: center;'
    //     }
    //   ],
    //   footer: [
    //     {
    //       type: 'button',
    //       text: '打赏',
    //       link: '/blog/donate'
    //     },
    //   ]
    // }],
    // 音乐播放器
    [
      "@vuepress-reco/vuepress-plugin-bgm-player", {
        audios: MUSIC_LIST,
        autoShrink: true,
        // autoplay: true,
      }
    ],
    // 鼠标点击特效
    [
      "vuepress-plugin-cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: 'circle',  // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    // 彩带背景
    ["ribbon-animation", {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }],
    // 樱花特效
    ["sakura", {
      num: 20,  // 默认数量
      show: true, //  是否显示
      zIndex: -1,   // 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...'     // 绝对路径
      }
    }],
    // 阅读进度条
    'reading-progress',
    // 小猫goTop
    'go-top'
  ],
}