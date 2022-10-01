import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("../views/BlogView.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/classify",
          name: "classify",
          component: () => import("../views/ClassifyView.vue"),
        },
        {
          path: "/friendChain",
          name: "friendChain",
          component: () => import("../views/FriendChainView.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: () => import("../views/SearchView.vue"),
        },
        {
          path: "/timeLine",
          name: "timeLine",
          component: () => import("../views/TimeLineView.vue"),
        },
      ],
    },
    {
      path: "/articlePage/:articleID",
      name: "articleContent",
      component: () => import("../views/ArticleContentView.vue"),
    },
  ],
});

export default router;
