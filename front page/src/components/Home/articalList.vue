<script setup>
import { getArtical } from "@/api/artical.js";
import IconDate from "../icons/IconDate.vue";
import { ElNotification } from "element-plus";
import { getBlogList } from "../../cache/cache.js";
import { useStore } from "../../store/pinia.js";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "vue";

let currentCount = ref(0); // 下次读取时的起始文章
let currentArticalList = ref([]); //保存展示在的home中的文章列表
const articleNumsStore = useStore(); // pinia保存当前展开的博客数量

// 项目组件加载时 读取本地 4 条数据用于展示，若为空则请求服务器数据用于展示
onBeforeMount(() => {
  currentArticalList.value = getBlogList(
    currentCount.value,
    articleNumsStore.browsesNumber
  );

  if (currentArticalList.value.length === 0) {
    getArtical(4, currentCount.value).then((data) => {
      currentArticalList.value = data.data;
      currentCount.value += currentArticalList.value.length;
      console.log("fetch data :>> ", data.data);
    });
  } else {
    // 下次需要从服务器或是缓存中获取的第一条数据的索引
    currentCount.value += currentArticalList.value.length;
  }
});

/**
 * @function loadingNewArtical
 * @description: 加载文章，若缓存中存在则从缓存中读取
 * @return {void}
 * @author: Banana
 */
function loadingNewArtical() {
  let currentCatchData = getBlogList(currentCount.value, 4);
  console.log("cacheData :>> ", currentCatchData);

  currentCatchData.length === 0 && onMore();

  for (const item of currentCatchData) {
    currentArticalList.value.push(item);
  }

  currentCount.value += currentCatchData.length;

  // 若是currentArticalList的数量大于articleNumsStore的数量，代表home中显示的文章增加了，
  // 则需要将store中的数量更改为文章的数量，使用户退回到home时文章数量不变
  if (articleNumsStore.browsesNumber < currentArticalList.value.length) {
    articleNumsStore.browsesNumber = currentArticalList.value.length;
    console.log("articleNumsStore :>> ", articleNumsStore.browsesNumber);
  }

  // getArtical(4, currentCount.value).then((data) => {
  //   let currentFetchData = data.data;

  //   if (currentFetchData.length === 0) {
  //     this.onMore();
  //   }
  //   // console.log("data :>> ", currentFetchData);

  //   for (const item of currentFetchData) {
  //     currentArticalList.value.push(item);
  //   }
  //   currentCount.value += currentFetchData.length;
  //   // console.log("currentCount :>> ", currentCount.value);
  // });
}

/**
 * @function onMore
 * @description: 没有更多文章的时候弹窗提示
 * @return {void}
 * @author: Banana
 */
function onMore() {
  ElNotification({
    title: "Warning",
    message: "没有更多文章了捏...",
    type: "warning",
  });
}
</script>


<template>
  <div id="articalList">
    <div v-for="(item, i) of currentArticalList" :key="i">
      <router-link
        :to="{ name: 'articleContent', params: { articleID: item.blogId } }"
        class="articialInfo"
      >
        <img v-if="item.titleImg" :src="item.titleImg" alt="" />
        <div class="content">
          <h1>{{ item.title }}</h1>
          <p class="pageDescribe">{{ item.content }}</p>
          <div class="timebox">
            <IconDate width="20" />{{ item.pubtime.split("T")[0] }}
          </div>
        </div>
      </router-link>
      <hr />
    </div>
    <div @click="loadingNewArtical" id="loadingMore">加载更多文章</div>
  </div>
</template>


<style scoped>
h1 {
  font-size: 25px;
  font-weight: 400;
}

p {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  max-height: 40px;
}

hr {
  margin: 15px 10px;
  border-top: none;
  background-color: rgb(201, 201, 201);
}

a {
  color: black;
}

#articalList {
  animation: playArticle 0.75s;
}

@keyframes playArticle {
  from {
    transform: translateY(400px);
  }
  to {
    transform: translateY(0px);
  }
}

.articialInfo {
  /* background-color: bisque; */
  /* border: 1px solid #aab5cb; */
  cursor: pointer;
  transition: 0.5s linear;
  display: flex;
  box-shadow: var(--el-box-shadow);
}

.articialInfo:hover {
  background-color: #e7eaf0;
}

.articialInfo > img {
  margin-right: 10px;
  width: 30%;
}

.content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pageDescribe {
  margin: 30px 0;
}

.timebox {
  display: flex;
  align-items: center;
  color: #aab5cb;
}
.timebox > svg {
  margin-right: 4px;
}

#loadingMore {
  cursor: pointer;
  text-align: center;
  color: #aab5cb;
  padding: 0 0 10px 0;
}

@media screen and (max-width: 576px) {
  .articialInfo {
    flex-direction: column;
  }
  .articialInfo > img {
    margin-right: 0;
    width: 100%;
  }
}
</style>