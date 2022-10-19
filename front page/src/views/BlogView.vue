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
</script>

<template>
  <div id="page">
    <navigationBarVue />
    <div id="rightBox">
      <div id="logo">
        <div><IconLogoVue width="120" height="50" style="padding-left:10px"/></div>
        <a href="https://github.com/yangclnb" target="_blank">
          <IconGitVue width="55" height="55" />
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

    #logo {
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      

      svg{
        color: var(--themeColor);
      }
    }
  }
}
</style>
