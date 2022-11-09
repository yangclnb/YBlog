<script setup>
import { onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import navigationBarVue from "../components/navigationBar.vue";
import settingButtonVue from "../components/settingButton/settingButton.vue";
import IconGitVue from "../components/icons/iconGit.vue";
import IconLogoVue from "../components/icons/iconLogo.vue";

// onMounted(() => {
//   console.log("页面加载");
// });
// // TODO 在页面关闭时加载
// onUnmounted(() => {
//   console.log("页面关闭");
// });

// TODO 导航栏背景模糊效果
</script>

<template>
  <div id="page">
    <navigationBarVue />
    <div id="rightBox">
      <div id="headerBox">
        <div id="logo">
          <IconLogoVue width="90" />
        </div>
        <a href="https://github.com/yangclnb" target="_blank">
          <IconGitVue width="30" />
        </a>
      </div>
      <RouterView />
    </div>
    <settingButtonVue />
  </div>
</template>

<style lang="less" scoped>
#page {
  display: flex;
  background-color: var(--backGroundColor);

  @media screen and (max-width: 576px) {
    flex-direction: column;
  }

  #rightBox {
    flex: 3;

    @media screen and (max-width: 576px) {
      order: -1;
    }

    #headerBox {
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 10px;
      border-bottom: 1px solid rgb(230, 230, 230);

      position: sticky;
      top: 0;
      backdrop-filter: blur(6px);
      z-index: 99;

      @media screen and (max-width: 768px) {
        position:static;
        backdrop-filter: none;
      }

      #logo {
        display: flex;
      }

      a {
        display: flex;
      }

      svg {
        color: var(--themeColor);
      }
    }
  }
}
</style>
