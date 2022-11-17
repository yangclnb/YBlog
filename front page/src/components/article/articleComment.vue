<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "vue";
import router from "../../router/index.js";
import { getCurrentArticalComment } from "../../api/comment.js";
import { decode } from "../../utils/articleEncoding";
let currentID = decode(router.currentRoute.value.params.articleID);
let commentList = ref([]);

// 请求评论 api
getCurrentArticalComment(currentID).then((results) => {
  commentList.value = results.data;
  // console.log(commentList.value);
});

/**
 * @function: eraseStringSign
 * @description: 格式化输出的字符串 'yan' => yan
 * @param {*} string
 * @return {*}
 * @author: Banana
 */
const eraseStringSign = (string) => {
  return string.slice(1, string.length - 1);
};

/**
 * @function: getTime
 * @description: 格式化当前时间
 * @param {*} time
 * @return {*}
 * @author: Banana
 */
let getTime = function computed(time) {
  let releaseTime = new Date(Date.parse(time));
  return `${releaseTime.getFullYear()}-${
    releaseTime.getMonth() + 1
  }-${releaseTime.getDate()}`;
};
</script>


<template>
  <div>
    <div class="comment" v-for="(item, i) of commentList" :key="i">
      <h3 class="comment_title">{{ eraseStringSign(item.userName) }}</h3>
      <p class="comment_content">
        {{ eraseStringSign(item.content) }}
      </p>
      <span class="comment_time">{{ getTime(item.pubtime) }}</span>
    </div>
    <div id="commentInfo" v-if="!commentList.length">
      暂无评论<br />你不考虑占个一楼吗?
    </div>
  </div>
</template>


<style lang="less" scoped>
/* 评论模块 */
.comment {
  margin: 10px;
  padding: 10px;
  background-color: var(--contentGroundColor);
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  animation: displayComment 1s;

  .comment_title {
    font-size: large;
    font-style: italic;
    font-weight: 600;
    padding-bottom: 5px;
  }

  .comment_content {
    font-size: medium;
    font-weight: 300;
    padding-bottom: 5px;
  }

  .comment_time {
    font-size: 10px;
    font-weight: 300;
    align-self: flex-end;
  }
}

#commentInfo {
  text-align: center;
  animation: displayComment 1s;
}

@keyframes displayComment {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>