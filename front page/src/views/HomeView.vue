<script setup>
import articalListVue from "../components/Home/articalList.vue";
import personCardVue from "../components/Home/personCard.vue";
import recommendVue from "../components/Home/recommend.vue";
import chartsVue from "../components/Home/charts.vue";
import title from "../utils/changeTitle";
import { addArticleCache } from "../cache/cache.js";
import { onMounted } from "vue";

// 滚动到顶部
onMounted(() => {
  document.documentElement.scrollTop = 0;
  title("首页");
});

addArticleCache();
</script>

<template>
  <div id="content">
    <articalListVue />
    <div id="homeRightBar">
      <recommendVue />
      <hr />
      <personCardVue />
      <hr />
      <chartsVue />
      <hr />
      <div id="pageInfo"><a id="recordInfo" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备2022015715号-1</a></div>
      
    </div>
  </div>
</template>


<style scoped>
hr {
  margin: 15px 0px;
  height: 1px;
  border: none;
  background-color:  var(--contentGroundColor);
}

#content {
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
}

#homeRightBar {
  margin-left: 20px;
  animation: 0.75s displayRightBar;
}

#pageInfo {
  text-align: center;
}

#recordInfo{
  color: var(--secondaryFontColor);
}

@keyframes displayRightBar {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  }
}

@media screen and (max-width: 768px) {
  #content {
    margin: 10px;
    padding: 0;
    flex-direction: column;
  }
  #homeRightBar {
    margin-left: 0;
  }
}
</style>