<script setup>
import IconAboutVue from "./icons/IconAbout.vue";
import IconClassifyVue from "./icons/IconClassify.vue";
import IconFriendVue from "./icons/IconFriend.vue";
import IconHomeVue from "./icons/IconHome.vue";
import IconSearcgVue from "./icons/IconSearcg.vue";
import IconTimeLineVue from "./icons/IconTimeLine.vue";

import ActiveIconAboutVue from "./icons/active/IconAbout.vue";
import ActiveIconClassifyVue from "./icons/active/IconClassify.vue";
import ActiveIconFriendVue from "./icons/active/IconFriend.vue";
import ActiveIconHomeVue from "./icons/active/IconHome.vue";
import ActiveIconSearcgVue from "./icons/active/IconSearcg.vue";
import ActiveIconTimeLineVue from "./icons/active/IconTimeLine.vue";
</script>

<template>
  <nav>
    <div id="top_icon">
      <RouterLink to="/home">
        <div>
          <IconHomeVue width="30" />
          <ActiveIconHomeVue width="30" />
          <p>首页</p>
        </div>
      </RouterLink>

      <RouterLink to="/search">
        <div>
          <IconSearcgVue width="30" />
          <ActiveIconSearcgVue width="30" />
          <p>搜索</p>
        </div>
      </RouterLink>

      <RouterLink to="/classify">
        <div>
          <IconClassifyVue width="30" />
          <ActiveIconClassifyVue width="30" />
          <p>分类</p>
        </div>
      </RouterLink>
    </div>

    <div id="botton_icon">
      <RouterLink to="/about">
        <div>
          <IconAboutVue width="30" />
          <ActiveIconAboutVue width="30" />
          <p>关于</p>
        </div>
      </RouterLink>

      <RouterLink to="/friendChain">
        <div>
          <IconFriendVue width="30" />
          <ActiveIconFriendVue width="30" />
          <p>友链</p>
        </div>
      </RouterLink>

      <RouterLink to="/timeLine">
        <div>
          <IconTimeLineVue width="30" />
          <ActiveIconTimeLineVue width="30" />
          <p>归档</p>
        </div>
      </RouterLink>
    </div>
  </nav>
</template>

<style  scoped>
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 60px;
  height: 100vh;
  text-align: center;
  box-shadow: var(--el-box-shadow);
  /* border-right: 1px solid rgb(201, 201, 201); */

  position: sticky;
  top: 0;

  animation: playBarInHugeScreen 0.5s;
}

div > svg:nth-child(1) {
  transition: all 0.5s;
  z-index: 5;
  position: relative;
  left: 15px;
}

div > svg:nth-child(2) {
  position: relative;
  right: 15px;
}

.router-link-exact-active > div {
  color: #06a6ff;
}

.router-link-exact-active > div > svg:nth-child(2) {
  z-index: 9;
}

a {
  color: #aab5cb;
}

a:hover > div {
  background-color: #e7eaf0;
}

a > div {
  cursor: pointer;
  padding: 10px 0 10px 0;
  transition: 0.5s linear;
}

p {
  font-size: 12px;
}

hr {
  margin: 10px 0 10px 0;
  height: 0px;
}

@media screen and (max-width: 576px) {
  nav {
    flex-direction: row;
    justify-content: center;

    width: 100vw;
    height: auto;
    z-index: 9;
    background-color: white;
    box-shadow: none;

    position:sticky;
    bottom: 0;

    animation: none;
    transition: none;
  }

  nav > div {
    display: flex;
    align-items: center;
  }

  a > div > p {
    display: none;
  }
}

@keyframes playBarInHugeScreen {
  from {
    transform: translateX(-400px);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes playBarInSmallScreen {
  from {
    transform: translateY(400px);
  }
  to {
    transform: translateY(0px);
  }
}
</style> 