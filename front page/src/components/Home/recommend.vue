<script setup>
import { getRecommendList } from "@/api/artical.js";
import { ref } from "@vue/reactivity";
import { computed } from "vue";
let recommendList = ref([]);

getRecommendList().then((results) => {
  recommendList.value = results.data;
});

let getRouter = function computed(blogID) {
  return "/articlePage/" + blogID;
};
</script>


<template>
  <div id="recommend">
    <div id="title">推荐阅读</div>
    <ul>
      <li v-for="item in recommendList" :key="item">
        <router-link :to="getRouter(item.blogid)">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#recommend {
  min-width: 20vw;
  box-shadow: var(--el-box-shadow);
}

#title {
  text-align: center;
  background-color: #aab5cb;
  color: white;
  padding: 5px 0;
  font-size: 20px;
}

ul {
  list-style: none;
}

ul > li {
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.5s linear;
}

ul > li:hover {
  background-color: #e7eaf0;
}
</style>