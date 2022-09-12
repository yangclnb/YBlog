<script setup>
import articalListVue from "../components/Home/articalList.vue";
import recommendVue from "../components/Home/recommend.vue";
import chartsVue from "../components/Home/charts.vue";
import {addArticleCache} from "../cache/cache.js"

addArticleCache();
</script>

<template>
  <div id="content">
    <articalListVue />
    <div id="homeRightBar">
      <recommendVue />
      <hr>
      <chartsVue />
    </div>
  </div>
</template>


<style scoped>
hr {
  margin: 15px 10px;
  border-top: none;
  background-color: rgb(201, 201, 201);
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

@keyframes displayRightBar {
  from{
    transform: translateY(400px);
  }
  to{
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