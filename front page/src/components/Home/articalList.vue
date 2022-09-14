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



<script>
import { getArtical } from "@/api/artical.js";
import IconDate from "../icons/IconDate.vue";
import { ElNotification } from "element-plus";
import { getBlogList } from "../../cache/cache.js";

export default {
  data() {
    return {
      currentCount: 0,
      currentArticalList: [],
    };
  },
  components: { IconDate },

  beforeMount() {
    // 项目组件加载时 读取本地 4 条数据用于展示，若为空则请求服务器数据用于展示
    this.currentArticalList = getBlogList(this.currentCount, 4);

    if (this.currentArticalList.length === 0) {
      getArtical(4, this.currentCount).then((data) => {
        this.currentArticalList = data.data;
        this.currentCount += this.currentArticalList.length;
        console.log("fetch data :>> ", data.data);
      });
    } else {
      // 下次需要从服务器或是缓存中获取的第一条数据的索引
      this.currentCount += this.currentArticalList.length;
    }
  },
  methods: {
    /**
     * @function loadingNewArtical
     * @description: 加载文章并且拼接进入已经加载完成的Array中
     * @author: Banana
     */
    loadingNewArtical() {
      let currentCatchData = getBlogList(this.currentCount, 4);
      console.log("cacheData :>> ", currentCatchData);

      currentCatchData.length === 0 && this.onMore();

      for (const item of currentCatchData) {
        this.currentArticalList.push(item);
      }

      this.currentCount += currentCatchData.length;

      // getArtical(4, this.currentCount).then((data) => {
      //   let currentFetchData = data.data;

      //   if (currentFetchData.length === 0) {
      //     this.onMore();
      //   }
      //   // console.log("data :>> ", currentFetchData);

      //   for (const item of currentFetchData) {
      //     this.currentArticalList.push(item);
      //   }
      //   this.currentCount += currentFetchData.length;
      //   // console.log("currentCount :>> ", this.currentCount);
      // });
    },
    onMore() {
      ElNotification({
        title: "Warning",
        message: "没有更多文章了捏...",
        type: "warning",
      });
    },
  },
};
</script>

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