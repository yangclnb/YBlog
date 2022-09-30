<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentArticalComment } from "../../api/comment.js";
import router from "../../router/index.js";

let currentID = router.currentRoute.value.params.articleID; // 从路由中获取文章id
let commentList = ref([]);
getCurrentArticalComment(currentID).then((results) => {
  // console.log("results :>> ", results);
  commentList.value = results.data;
});
</script>


<template>
  <div>
    <div class="comment" v-for="(item, i) of commentList" :key="i">
      <h3 class="comment_title">{{ item.userName }}</h3>
      <p class="comment_content">
        {{ item.content }}
      </p>
      <span class="comment_time">{{ item.pubTime }}</span>
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
  background-color: rgb(241, 241, 241);
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
    font-size: medium;
    font-weight: 300;
    align-self: flex-end;
  }
}

#commentInfo {
  text-align: center;
}
</style>