<script setup>
import { ElIcon } from "element-plus";
import { getArtical } from "@/api/artical.js";
import { encode } from "../../utils/articleEncoding";
import { ElMessage, ElSkeleton, ElSkeletonItem } from "element-plus";
import { getBlogList } from "../../cache/cache.js";
import { useStore } from "../../store/pinia.js";
import { onBeforeMount, ref } from "vue";

let currentCount = ref(0); // 下次读取时的起始文章
let currentArticalList = ref([]); //保存展示在的home中的文章列表
let loading = ref(true);
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
      loading.value = false;
      console.log("fetch data :>> ", data.data);
    });
  } else {
    // 下次需要从服务器或是缓存中获取的第一条数据的索引
    currentCount.value += currentArticalList.value.length;
  }

  // 有数据就不显示股价屏了
  if (currentArticalList.value.length !== 0) loading.value = false;
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
  ElMessage.warning("没有更多文章了捏...");
}
</script>


<template>
  <div id="articalList">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div>
          <a>
            <div
              style="
                background-color: var(--contentGroundColor);
                padding: 10px;
                width: 60vw;
              "
            >
              <el-skeleton-item variant="h1" />
              <el-skeleton-item
                style="margin-top: 20px; margin-bottom: 5px"
                variant="p"
              />
              <el-skeleton-item style="margin-bottom: 20px" variant="p" />
              <el-skeleton-item variant="p" style="width: 60px; height: 15px" />
              &nbsp; &nbsp; &nbsp;
              <el-skeleton-item variant="p" style="width: 60px; height: 15px" />
            </div>
          </a>
          <hr />
        </div>
      </template>
      <template #default>
        <div v-for="(item, i) of currentArticalList" :key="i">
          <router-link
            :to="{
              name: 'articleContent',
              params: { articleID: encode(item.blogId) },
            }"
            class="articialInfo"
          >
            <img v-if="item.titleImg" :src="item.titleImg" alt="" />
            <div class="content">
              <h1>{{ item.title }}</h1>
              <p class="pageDescribe">{{ item.content.slice(0, 150) }}</p>
              <div class="articleInfoBox">
                <div class="timebox">
                  <el-icon><Calendar /></el-icon>&nbsp;{{
                    item.pubtime.split("T")[0]
                  }}
                </div>
                <router-link to="/classify" class="typeBox"
                  ><el-icon><CollectionTag /></el-icon>&nbsp;{{
                    item.typeName
                  }}</router-link
                >
              </div>
            </div>
          </router-link>
          <hr />
        </div>
      </template>
    </el-skeleton>
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
  margin: 15px 0px;
  height: 1px;
  border: none;
  background-color:  var(--contentGroundColor);
}

a {
  color: black;
}

#articalList {
  animation: playArticle 0.75s;
}

@keyframes playArticle {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.articialInfo {
  /* background-color: bisque; */
  /* border: 1px solid #aab5cb; */
  cursor: pointer;
  transition: 0.5s linear;
  display: flex;
  background-color: var(--contentGroundColor);

  color: var(--fontColor);

  border-radius: 5px;
}

.articialInfo:hover {
  /* background-color: #e7eaf0; */
  box-shadow: var(--el-box-shadow);
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

.articleInfoBox {
  display: flex;
}

.timebox {
  display: flex;
  align-items: center;
  color: #aab5cb;
}

.typeBox {
  display: flex;
  align-items: center;
  color: #aab5cb;
  border-radius: 10px;
  padding: 2px 5px;
  transition: 0.5s linear;
}

.typeBox:hover {
  /* border: 1px solid var(--themeColor); */
  color: var(--themeColor);
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