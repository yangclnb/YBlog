<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "vue";

let titleArr = ref([]);

onMounted(() => {
  setTimeout(() => {
    // 格式化 h 标签，并且存入数组中
    let contentBox = document.querySelector("#articleContent").children;
    let index = 0; //文章内节点的索引
    let id = 0; //摘要中的索引
    for (const node of contentBox) {
      if (node.tagName.indexOf("H") != -1 && node.tagName != "HR") {
        titleArr.value.push({
          id,
          index,
          // TODO t1 t2 t3...
          tag: "t" + node.tagName[1],
          text: node.textContent,
          active: id == 0 ? true : false, // 初始化时高亮第一条数据
        });
        id++;
      }
      index++;
    }

    console.log("titleArr.value :>> ", titleArr.value);

    // 若是 摘要列表中存在内容 则添加滚动高亮摘要的事件
    if (titleArr.value.length > 0) {
      window.addEventListener("scroll", DigestHighLightByScroll);
    } else {
      // 没有标签关闭标签栏
      document.querySelector("#digest").style.display = "none";
    }
  }, 200);
});

// 关闭页面时清除绑定的scroll事件
onUnmounted(() => {
  window.removeEventListener("scroll", DigestHighLightByScroll);
});

/**
 * @function navigateToNode
 * @description: 点击后，滚动到 文章中 该标题的位置，并且高亮点击的摘要
 * @param {*} articleNodeIndex 文章中的节点索引
 * @param {*} digestIndex 摘要中的节点索引
 * @return {void}
 * @author: Banana
 */
function navigateToArticleNode(articleNodeIndex, digestIndex) {
  clearDigestHighLight();
  let content = document.querySelector("#articleContent").children;
  content[articleNodeIndex].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  titleArr.value[digestIndex].active = true;
}

/**
 * @function:
 * @description: 滚动页面改变最顶端的标题后，定位到这个标题对应的摘要位置，并且高亮他
 * @param {*} currentDigest 当前摘要对象
 * @return {*}
 * @author: Banana
 */
function navigateToDigestNode(currentDigest) {
  let digestList = document.querySelector("#digestList").children;
  currentDigest.active = true;
}

/**
 * @function clearDigestHighLight
 * @description: 清楚摘要的高光效果
 * @return {*}
 * @author: Banana
 */
function clearDigestHighLight() {
  for (const item of titleArr.value) {
    item.active = false;
  }
}

// 防抖计时器
let time = null;
/**
 * @function DigestHighLightByScroll
 * @description: 防抖 | 当页面内容滚动到指定位置时高亮对应的摘要
 * @return {void}
 * @author: Banana
 */
function DigestHighLightByScroll() {
  // 页面防抖
  if (time !== null) clearTimeout(time);
  time = setTimeout(() => {
    let content = document.querySelector("#articleContent").children;
    clearDigestHighLight();
    // TODO 添加防抖
    for (const item of titleArr.value) {
      const currentNodePosition = content[item.index].getBoundingClientRect();
      if (currentNodePosition.bottom > 0) {
        navigateToDigestNode(item);
        return;
      }
    }
    // 若是遍历完之后没有标题在屏幕中，则高亮最后一条摘要
    navigateToDigestNode(titleArr.value[titleArr.value.length - 1]);
  }, 50);
}
</script>

<template>
  <!-- 摘要模块 -->
  <ul id="digestList">
    <li
      v-for="item in titleArr"
      :key="item.id"
      @click="navigateToArticleNode(item.index, item.id)"
      :class="[{ active: item.active }, item.tag]"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<style lang="less" scoped>
/* 侧边栏 大纲 各个标题的格式 */
ul {
  padding: 0 20px;

  animation: displayDigest 1s;

  li {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    margin-bottom: 10px;
  }

  .active {
    color: var(--themeColor);
  }

  .t2::before {
    content: "";
    display: inline-block;
    margin-left: 10px;
  }

  .t3::before {
    content: "";
    display: inline-block;
    margin-left: 20px;
  }

  .t4::before {
    content: "";
    display: inline-block;
    margin-left: 30px;
  }

  .t5::before {
    content: "";
    display: inline-block;
    margin-left: 40px;
  }

  .t6::before {
    content: "";
    display: inline-block;
    margin-left: 50px;
  }
}
</style>
