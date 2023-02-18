<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import {ElIcon,ElMessage} from "element-plus";
import { getFriendChain } from "../api/friend";
import title from "../utils/changeTitle";
let friendChainArray = ref([]);

// 滚动到顶部
onMounted(()=>{
  document.documentElement.scrollTop = 0;
  title("友链");
})

getFriendChain().then((results) => {
  console.log(results.data);
  friendChainArray.value = results.data;
  console.log(friendChainArray.value);
});

function applicationFriendChain(){
  ElMessage.error("Features are still under development");
}
</script>

<template>
  <div id="content">
    <a class="friendBox" v-for="(item, i) of friendChainArray" :key="i" :href="'http://'+item.url" target="_blank">
      <img src="@/assets/62ae7273c1c30be3fe326fa15af8ae8034718dc0.jpg" v-if="item.photo == null" />
      <img :src="item.photo" v-else />
      <h3>{{ item.name }}</h3>
      <p>{{ item.describe }}</p>
    </a>
    <a class="friendBox" @click="applicationFriendChain">
      <el-icon :size="40"><DocumentAdd /></el-icon>
      <h3>申请友链</h3>
    </a>
  </div>
</template>

<style lang="less" scoped>
#content {
  margin: 0 auto;
  padding: 10px;
  max-width: 1000px;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  // background-color: aqua;


  // animation ----------------------------
  .dispalyFriendChain(@name) {
    @keyframes @name {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }

      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }

  .dispalyFriendChain(testDisplayFriendChain);

  .animation(@animation-name, @animation-duration) {
    animation: @arguments;
  }

  .animation(testDisplayFriendChain, 1s);

  // animation ----------------------------

  .friendBox {
    width: 24.5%;
    height: 240px;
    border: 1px solid var(--backGroundColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    background-color: var(--contentGroundColor);
    color:var(--fontColor);

    img {
      width: 100px;
      border-radius: 50px;
      border: 1px solid var(--secondaryFontColor);
    }

    &:hover {
      transform: scale(1.1, 1.1);
      box-shadow: var(--el-box-shadow);
      z-index: 9;
    }

    @media screen and (max-width: 576px) {
      width: 49%;
    }
  }
}
</style>