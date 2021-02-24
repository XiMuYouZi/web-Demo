import Vue from "vue";
import Router from "vue-router";

const Discovery = () =>
  import(/* webpackChunkName: "Discovery" */ "@/page/discovery");
const Songs = () => import(/* webpackChunkName: "Songs" */ "@/page/songs");
const Playlists = () =>
  import(/* webpackChunkName: "Playlists" */ "@/page/playlists");
const PlaylistDetail = () =>
  import(/* webpackChunkName: "PlaylistDetail" */ "@/page/playlist-detail");
const Mvs = () => import(/* webpackChunkName: "Mvs" */ "@/page/mvs");
const Mv = () => import(/* webpackChunkName: "Mv" */ "@/page/mv");
const Search = () => import(/* webpackChunkName: "Search" */ "@/page/search");
const SearchSongs = () =>
  import(/* webpackChunkName: "SearchSongs" */ "@/page/search/songs");
const SearchPlaylists = () =>
  import(/* webpackChunkName: "SearchPlaylists" */ "@/page/search/playlists");
const SearchMvs = () =>
  import(/* webpackChunkName: "SearchMvs" */ "@/page/search/mvs");

//内容需要居中的页面
export const LayoutCenterNames = ["discovery", "songs", "mvs"];

//需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: "/discovery",
    name: "discovery",
    component: Discovery,
    meta: {
      title: "发现音乐",
      icon: "music",
    },
  },
  {
    path: "/playlists",
    name: "playlists",
    component: Playlists,
    meta: {
      title: "推荐歌单",
      icon: "playlist-menu",
    },
  },
  {
    path: "/songs",
    name: "songs",
    component: Songs,
    meta: {
      title: "最新音乐",
      icon: "yinyue",
    },
  },
  {
    path: "/mvs",
    name: "mvs",
    component: Mvs,
    meta: {
      title: "最新MV",
      icon: "mv",
    },
  },
];
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/discovery",
    },
    {
      path: "/playlist/:id",
      name: "playlist",
      component: PlaylistDetail,
    },
    {
      path: "/mv/:id",
      name: "mv",
      component: Mv,
      props: (route) => ({ id: +route.params.id }),
    },
    {
      path: "/search/:keywords",
      name: "search",
      component: Search,
      props: true,
      children: [
        {
          path: "/",
          redirect: "songs",
        },
        {
          path: "songs",
          name: "searchSongs",
          component: SearchSongs,
        },
        {
          path: "playlists",
          name: "searchPlaylists",
          component: SearchPlaylists,
        },
        {
          path: "mvs",
          name: "searchMvs",
          component: SearchMvs,
        },
      ],
    },
    ...menuRoutes,
  ],
});

!(function(t) {
  var e,
    n,
    c,
    l,
    o,
    i,
    a =
      '<svg><symbol id="icon-bofang" viewBox="0 0 1024 1024"><path d="M510.8 961.8c-60.7 0-119.5-11.9-175-35.3-53.5-22.6-101.6-55-142.9-96.3-41.3-41.3-73.7-89.3-96.3-142.9-23.4-55.4-35.3-114.3-35.3-175s11.9-119.5 35.3-175c22.6-53.5 55-101.6 96.3-142.9 41.3-41.3 89.3-73.7 142.9-96.3 55.4-23.4 114.3-35.3 175-35.3s119.5 11.9 175 35.3c53.5 22.6 101.6 55 142.9 96.3 41.3 41.3 73.7 89.3 96.3 142.9 23.4 55.4 35.3 114.3 35.3 175s-11.9 119.5-35.3 175c-22.6 53.5-55 101.6-96.3 142.9-41.3 41.3-89.3 73.7-142.9 96.3-55.5 23.4-114.4 35.3-175 35.3z m0-835c-52.1 0-102.5 10.2-150 30.3-45.9 19.4-87.1 47.2-122.5 82.6-35.4 35.4-63.2 76.6-82.6 122.5-20.1 47.5-30.3 98-30.3 150 0 52.1 10.2 102.5 30.3 150 19.4 45.9 47.2 87.1 82.6 122.5 35.4 35.4 76.6 63.2 122.5 82.6 47.5 20.1 98 30.3 150 30.3 52.1 0 102.5-10.2 150-30.3 45.9-19.4 87.1-47.2 122.5-82.6s63.2-76.6 82.6-122.5c20.1-47.5 30.3-98 30.3-150 0-52.1-10.2-102.5-30.3-150-19.4-45.9-47.2-87.1-82.6-122.5-35.4-35.4-76.6-63.2-122.5-82.6-47.5-20.2-98-30.3-150-30.3zM396.7 716.3c-5.3 0-10.7-1.3-15.5-4-10.4-5.8-16.8-16.8-16.5-28.7l7.2-344.1c0.2-11.9 7.1-22.6 17.7-28 10.6-5.3 23.3-4.3 33 2.6l246.8 177.3c8.6 6.2 13.5 16.1 13.3 26.7-0.2 10.5-5.6 20.3-14.4 26.1L414.3 711c-5.3 3.6-11.4 5.3-17.6 5.3z m38-314.6L430 624.2l164.3-107.9-159.6-114.6z"  ></path></symbol><symbol id="icon-yanzheng" viewBox="0 0 1024 1024"><path d="M511.7 137.2h249.4c9.8 70.5 68.1 117.1 138.8 126.9v355.6c0 190.3-339.5 354-388.1 354S123.5 810 123.5 619.8V264.2c70.4-9.9 128.6-56.1 138.8-127h249.4z m0 0" fill="#FFFFFF" ></path><path d="M511.7 991.4c-32.8 0-135-46.5-222.5-109.1-83.7-59.5-183.3-153.3-183.3-262.7V248.7l15.3-2c66.9-9.5 115.4-53.2 123.6-111.9l2.1-15.2h529.5l2.1 15.2c8.1 58.6 56.7 102.5 123.6 111.9l15.2 2.1v370.9c0 109.1-99.6 203.2-183.3 262.7-87.4 62.4-189.6 109-222.3 109zM141.2 278.7v341.1c0 177 331.2 336.3 370.5 336.3 16.9 0 108.7-35.9 202.1-102.4 62.9-44.7 168.4-134.6 168.4-234V279c-69.6-14.5-120.8-61.6-135.7-124.1H276.9c-15 62.5-66.2 109.4-135.7 124.1v-0.3z m0 0" fill="#2A5082" ></path><path d="M790.2 973.5l-20.4-29.1C914.5 841.9 988 732.6 988 619.5V454.8h35.3v165c0 125.1-78.3 244.1-233.1 353.7z m-155-942.1h141.2v35.3H635.2V31.4z m-388.2 0h141.2v35.3H247V31.4z m-14.1 942.1C78.3 863.9 0.1 744.9 0.1 619.8v-165h35.1v165c0 113 73.3 222.3 218.2 324.9l-20.5 28.8z m0 0" fill="#BCC0C4" ></path><path d="M495.3 807.9c-110.6 0-210.4-66.1-253.6-167.9-43.2-101.8-21.5-219.5 55.3-299.1 76.7-79.6 193.6-105.6 296.9-66.1l-12.6 32.9c-98.2-37.4-209.3-6.7-274.2 75.9-64.9 82.6-68.6 197.8-9 284.4 59.5 86.6 168.5 124.3 268.8 93.2 100.3-31.1 168.8-123.9 168.9-229H771c-0.1 152.3-123.5 275.6-275.7 275.7z m0 0" fill="#2A5082" ></path><path d="M744.2 276.1L511.6 508.6l-96.9-96.9-77.5 77.5 174.4 174.4 310.1-310.1-77.5-77.4z m0 0" fill="#A3D4FF" ></path><path d="M511.7 688.6L312.3 489.3l102.5-102.5 96.9 96.9L744.4 251l102.3 102.5-335 335.1zM362.2 489.3l149.5 149.4 285.1-285.2-52.6-52.6-232.7 232.8-96.7-96.9-52.6 52.5z m0 0" fill="#2A5082" ></path><path d="M988.1 243.1h35.3v35.3h-35.3v-35.3z m0 70.6h35.3V349h-35.3v-35.3z m0 70.6h35.3v35.3h-35.3v-35.3zM0 243.1h35.3v35.3H0v-35.3z m0 70.6h35.3V349H0v-35.3z m0 70.6h35.3v35.3H0v-35.3zM494 31.4h35.3v35.3H494V31.4z m-70.6 0h35.3v35.3h-35.3V31.4z m141.2 0h35.3v35.3h-35.3V31.4z m0 0" fill="#BCC0C4" ></path></symbol></svg>',
    h = (h = document.getElementsByTagName("script"))[
      h.length - 1
    ].getAttribute("data-injectcss");
  if (h && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function d() {
    o || ((o = !0), c());
  }
  (e = function() {
    var t, e, n, c;
    ((c = document.createElement("div")).innerHTML = a),
      (a = null),
      (n = c.getElementsByTagName("svg")[0]) &&
        (n.setAttribute("aria-hidden", "true"),
        (n.style.position = "absolute"),
        (n.style.width = 0),
        (n.style.height = 0),
        (n.style.overflow = "hidden"),
        (t = n),
        (e = document.body).firstChild
          ? ((c = t), (n = e.firstChild).parentNode.insertBefore(c, n))
          : e.appendChild(t));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((n = function() {
            document.removeEventListener("DOMContentLoaded", n, !1), e();
          }),
          document.addEventListener("DOMContentLoaded", n, !1))
      : document.attachEvent &&
        ((c = e),
        (l = t.document),
        (o = !1),
        (i = function() {
          try {
            l.documentElement.doScroll("left");
          } catch (t) {
            return void setTimeout(i, 50);
          }
          d();
        })(),
        (l.onreadystatechange = function() {
          "complete" == l.readyState && ((l.onreadystatechange = null), d());
        }));
})(window);
