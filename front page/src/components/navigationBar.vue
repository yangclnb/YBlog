<script setup>
import IconAboutVue from "./icons/IconAbout.vue";
import IconClassifyVue from "./icons/IconClassify.vue";
import IconFriendVue from "./icons/IconFriend.vue";
import IconHomeVue from "./icons/IconHome.vue";
import IconSearchVue from "./icons/IconSearch.vue";
import IconTimeLineVue from "./icons/IconTimeLine.vue";
</script>

<template>
  <nav>
    <div id="top_icon">
      <RouterLink to="/home">
        <div>
          <IconHomeVue width="30" />
          <p>首页</p>
        </div>
      </RouterLink>

      <RouterLink to="/search">
        <div>
          <IconSearchVue width="30" />
          <p>搜索</p>
        </div>
      </RouterLink>

      <RouterLink to="/classify">
        <div>
          <IconClassifyVue width="30" />
          <p>分类</p>
        </div>
      </RouterLink>
    </div>

    <div id="botton_icon">
      <RouterLink to="/about">
        <div>
          <IconAboutVue width="30" />
          <p>关于</p>
        </div>
      </RouterLink>

      <RouterLink to="/friendChain">
        <div>
          <IconFriendVue width="30" />
          <p>友链</p>
        </div>
      </RouterLink>

      <RouterLink to="/timeLine">
        <div>
          <IconTimeLineVue width="30" />
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

  background-color: var(--contentGroundColor);

  min-width: 60px;
  height: 100vh;
  text-align: center;
  /* box-shadow: var(--el-box-shadow); */
  /* border-right: 1px solid rgb(201, 201, 201); */

  position: sticky;
  top: 0;

  animation: playBarInHugeScreen 0.5s;
}

.router-link-exact-active > div {
  color: var(--themeColor);
}

a {
  color: #aab5cb;
}

@media (any-hover: hover) {
  a:hover > div {
    filter: contrast(180%);
  }
}

a > div {
  cursor: pointer;
  padding: 10px 0 10px 0;
  transition: 0.3s linear;
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
    justify-content: space-around;

    width: 100vw;
    height: auto;
    z-index: 9;
    box-shadow: none;

    position: sticky;
    bottom: 0;

    animation: none;
    transition: none;
  }

  nav > div {
    width: 41vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a > div > p {
    display: none;
  }
}

@keyframes playBarInHugeScreen {
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes playBarInSmallScreen {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  }
}
</style> 