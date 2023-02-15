<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "vue";

let titleArr = ref([]);

// 由于使用了节流导致直接 清除事件 throttle() 会因为闭包导致出现无法清除事件的情况 
let theScorllFunction = throttle();

onMounted(() => {
  setTimeout(() => {
    // 格式化 h 标签，并且存入数组中
    let contentBox = document.querySelector("#contentBox").children;
    let index = 0; //文章内节点的索引
    let id = 0; //摘要中的索引
    for (const node of contentBox) {
      if (node.tagName.indexOf("H") != -1 && node.tagName != "HR") {
        titleArr.value.push({
          id,
          index,
          tag: "t" + node.tagName[1],
          text: node.textContent,
          active: id == 0 ? true : false, // 初始化时高亮第一条数据
        });
        id++;
      }
      index++;
    }

    // 若是 摘要列表中存在内容 则添加滚动高亮摘要的事件
    if (titleArr.value.length > 0) {
      window.addEventListener("scroll", theScorllFunction);
    } else {
      // 没有标签关闭标签栏
      document.querySelector("#digest").style.display = "none";
    }
  }, 200);
});

// 关闭页面时清除绑定的scroll事件
onUnmounted(() => {
  console.log('解绑滚动效果');
  window.removeEventListener("scroll", theScorllFunction);
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
  let content = document.querySelector("#contentBox").children;
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

/**
 * @function DigestHighLightByScroll
 * @description: 当页面内容滚动到指定位置时高亮对应的摘要
 * @return {void}
 * @author: Banana
 */
function DigestHighLightByScroll() {
  let content = document.querySelector("#contentBox").children;
  clearDigestHighLight();
  for (const item of titleArr.value) {
    const currentNodePosition = content[item.index].getBoundingClientRect();
    if (currentNodePosition.bottom > 0) {
      navigateToDigestNode(item);
      return;
    }
  }
  // 若是遍历完之后没有标题在屏幕中，则高亮最后一条摘要
  navigateToDigestNode(titleArr.value[titleArr.value.length - 1]);
}

/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 */
function throttle() {
  //记录上一次函数触发的时间
  var lastTime = 0;
  console.log('scoll ~');
  return function () {
    //记录当前函数触发的时间
    var nowTime = Date.now();
    if (nowTime - lastTime > 100) {
      console.log('update ~');
      //高亮摘要
      DigestHighLightByScroll();
      //同步执行结束时间
      lastTime = nowTime;
    }
  };
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
    border-left: 1.5px solid transparent;
    // border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s;
  }

  .active {
    color: var(--themeColor);
    border-left: 4px solid var(--themeColor);
  }

  .t1 {
    padding-left: 5px;
  }

  .t2 {
    padding-left: 10px;
  }

  .t3 {
    padding-left: 20px;
  }

  .t4 {
    padding-left: 30px;
  }

  .t5 {
    padding-left: 40px;
  }

  .t6 {
    padding-left: 50px;
  }
}

@keyframes displayDigest {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
