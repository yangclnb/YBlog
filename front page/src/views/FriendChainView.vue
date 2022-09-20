<script setup>
import { ref } from "@vue/reactivity";
import { getFriendChain } from "../api/friend";

let friendChainArray = ref([]);

getFriendChain().then((results) => {
  console.log(results.data);
  friendChainArray.value = results.data;
  console.log(friendChainArray.value)
});
</script>

<template>
  <div id="content">
    <div class="friendBox" v-for="(item,i) of friendChainArray" :key="i">
      <img src="@/assets/62ae7273c1c30be3fe326fa15af8ae8034718dc0.jpg" v-if="item.photo==null" />
      <img :src="item.photo" v-else />
      <h3>{{item.name}}</h3>
      <p>{{item.describe}}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
#content {
  margin: 0 auto;
  padding: 10px;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  // background-color: aqua;
}

.friendBox {
  width: 24.5%;
  height: 240px;
  border: 1px solid var(--secondaryFontColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
  background-color: var(--backGroundColor);
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
</style>