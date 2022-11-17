<script setup>
import { computed } from "vue";
import { ref } from "@vue/reactivity";
import { getRecommendList } from "@/api/artical.js";
import { encode } from "../../utils/articleEncoding";
import { ElSkeleton, ElSkeletonItem } from "element-plus";

let recommendList = ref([]);
let loading = ref(true);

getRecommendList().then((results) => {
  recommendList.value = results.data;
  loading.value = false;
});

let getRouter = function computed(blogID) {
  return "/articlePage/" + blogID;
};
</script>


<template>
  <div id="recommend">
    <div id="title">推荐阅读</div>
    <el-skeleton :loading="loading" animated :count="5">
      <template #template>
        <div style="padding: 14px">
          <el-skeleton-item
            variant="h3"
            style="width: 100%; text-align: center"
          />
        </div>
      </template>
      <template #default>
        <ul>
          <li v-for="item in recommendList" :key="item">
            <router-link
              :to="{
                name: 'articleContent',
                params: { articleID: encode(item.blogid) },
              }"
              >{{ item.title }}</router-link
            >
          </li>
        </ul>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
#recommend {
  min-width: 280px;
  background-color: var(--contentGroundColor);
  border-radius: 5px;
  /* box-shadow: var(--el-box-shadow); */
}

#title {
  text-align: center;
  background-color: var(--themeColor);
  color: var(--backGroundColor);
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

ul > li > a {
  /* background-color: antiquewhite; */
  display: block;
  color: var(--fontColor);
}

ul > li:hover {
  background-color: #e7eaf0;
}
</style>