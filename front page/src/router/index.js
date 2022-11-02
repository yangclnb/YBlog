import { createRouter, createWebHistory } from "vue-router";
import indexPage from "../views/BlogView.vue";
import homePage from "../views/HomeView.vue";
import aboutPage from "../views/AboutView.vue";
import classiftPage from "../views/ClassifyView.vue";
import friendChainPage from "../views/FriendChainView.vue";
import searchPage from "../views/SearchView.vue";
import timeLinePage from "../views/TimeLineView.vue";
import articleContent from "../views/ArticleContentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: indexPage,
      children: [
        {
          path: "/home",
          name: "home",
          component: homePage,
        },
        {
          path: "/about",
          name: "about",
          component: aboutPage,
        },
        {
          path: "/classify",
          name: "classify",
          component: classiftPage,
        },
        {
          path: "/friendChain",
          name: "friendChain",
          component: friendChainPage,
        },
        {
          path: "/search",
          name: "search",
          component: searchPage,
        },
        {
          path: "/timeLine",
          name: "timeLine",
          component: timeLinePage,
        },
      ],
    },
    {
      path: "/articlePage/:articleID",
      name: "articleContent",
      component: articleContent,
    },
  ],
});

export default router;
