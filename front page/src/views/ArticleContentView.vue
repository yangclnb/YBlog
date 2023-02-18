<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import router from "../router";
import { computed } from "@vue/reactivity";
import { ElDescriptions, ElDescriptionsItem } from "element-plus";
import { getBlogByCache } from "../cache/cache.js"; // 从缓存中获取文章内容
import { getArticleByID, addVisitorInfo } from "../api/artical.js"; // 读取文章信息

import { getTime, setTime } from "@/utils/recordReadTime.js";

import articleDigestVue from "../components/article/articleDigest.vue"; // 引入文章摘要模块
import articleCommentVue from "../components/article/articleComment.vue"; // 引入文章评论模块
import releaseCommentVue from "../components/article/releaseComment.vue"; // 发表评论模块
import settingButtonVue from "../components/settingButton/settingButton.vue"; // 引入侧边按钮框
import DynamicContent from "../components/dynamicContent/dynamicContent.vue";
import title from "../utils/changeTitle";

import MarkdownIt from "markdown-it"; // 引入 markdown 模块
import hljs from "highlight.js"; // 引入高亮模块
import "highlight.js/styles/atom-one-dark-reasonable.css";

import { decode } from "../utils/articleEncoding";
let currentID = decode(router.currentRoute.value.params.articleID);

let md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (e) {
        console.error(e);
      }
    }

    return ""; // 使用额外的默认转义
  },
}); // 文章内容 markdown 格式化  | 代码高亮
let articleInfo = ref([]);
let currentSider = ref("digest");
let originArticle = "";
// 记录阅读时间
let readingTime = 0;

// TODO 读取 https://whois.pconline.com.cn/ipJson.jsp 中的城市信息并传入访客数据
// 记录访客信息
addVisitorInfo(currentID);

onMounted(() => {
  // 记录开始时间
  readingTime = Date.now();
  // 滚动至顶部
  window.scrollTo(0, 0);
});



onBeforeUnmount(() => {
  let id = currentID;
  // 记录结束时间
  readingTime = Date.now() - readingTime;
  console.log('readingTime: ', readingTime);
  console.log(this);
  setTime(id, readingTime);
});

// 从缓存中获取文章数据
let BlogData = getBlogByCache(currentID);
if (isNaN(currentID)) {
  toErrorPage();
} else if (BlogData == null) {
  // 从服务器中获取文章数据
  getArticleByID(currentID).then((data) => {
    if (data.data.length == 0) toErrorPage();
    const articleData = data.data[0];
    originArticle = articleData.content;
    let result = md.render(articleData.content);
    articleData.content = result;
    // 替换更改后的内容
    articleInfo.value = articleData;
    console.log("fetchData :>> ", articleData);
    title(articleInfo.value.title);
  });
} else {
  // 直接返回缓存中的数据
  originArticle = BlogData.content;
  BlogData.content = md.render(BlogData.content);
  articleInfo.value = BlogData;
  console.log("cacheData :>> ", BlogData);
  title(articleInfo.value.title);
}

const currentReadingTime = computed(() => {
  const date = new Date(getTime(currentID));
  return `${date.getMinutes()}分钟` ;
});

/**
 * @function: changeSiderContent
 * @description: 切换侧边栏的内容 摘要 | 评论
 * @return {*}
 * @author: Banana
 */
function changeSiderContent() {
  // 清除所有active类的样式
  document.querySelector("#siderBar_title").childNodes.forEach((node) => {
    node.classList.toggle("active");
  });

  if (currentSider.value === "comment") currentSider.value = "digest";
  else currentSider.value = "comment";
}

/**
 * @description: 格式化发布时间事件
 * @return {*}
 * @author: Banana
 */
let articleReleaseTime = computed(() => {
  let dateParse = Date.parse(articleInfo.value.pubtime);
  let date = new Date(dateParse);

  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
});

/**
 * @function: 格式化文章字数
 * @return {*}
 * @author: Banana
 */
let articleWordNums = () => {
  let wordNums = originArticle.length;

  function toThousands(num) {
    var result = "",
      counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = "," + result;
      }
    }
    return result;
  }
  // alert(wordNums)
  // if (wordNums > 1000) {
  //   return (wordNums / 1000).toFixed(0) + "k";
  // }
  return toThousands(wordNums);
};

/**
 * @function: displayComment
 * @description: 子组件发布了评论后，切换侧边栏显示为评论
 * @return {*}
 * @author: Banana
 */
function displayComment() {
  document
    .querySelector("#siderBar_title")
    .childNodes[0].classList.remove("active");
  document
    .querySelector("#siderBar_title")
    .childNodes[1].classList.add("active");
  currentSider.value = "comment";
}

/**
 * @function: getCommentData
 * @description: 从子组件中获取评论的数据
 * @return {*}
 * @author: Banana
 */
function getCommentData() {}

/**
 * @function: 在用户添加评论成功后，在DOM中添加用户刚才的评论
 * @description:
 * @return {*}
 * @author: Banana
 */
function addComment() {}

/**
 * @function: toErrorPage
 * @description: 跳转到错误页面
 * @return {*}
 * @author: Banana
 */
function toErrorPage() {
  router.push({
    name: "home",
  });
  // alert("toErrorPage");
}
</script>


<template>
  <div id="container">
    <div id="sideBar" class="displaySideBar">
      <div id="siderBar_title">
        <div class="active" @click="changeSiderContent">大纲</div>
        <div @click="changeSiderContent">评论</div>
      </div>
      <!-- 摘要模块 -->
      <articleDigestVue v-show="currentSider == 'digest'" />
      <!-- 评论模块 -->
      <articleCommentVue v-show="currentSider == 'comment'" />
    </div>
    <div id="rightContent">
      <img
        v-if="articleInfo.titleImg"
        style="width: 100%"
        :src="articleInfo.titleImg"
        alt=""
      />
      <div id="articleContent">
        <DynamicContent>
          <h1>{{ articleInfo.title }}</h1>
        </DynamicContent>
        <div id="articleInfoBox">
          <div>
            <Calendar style="width: 1em; height: 1em; margin-right: 8px" />
            发布于：{{ articleReleaseTime }}
          </div>
          <div>
            <Paperclip style="width: 1em; height: 1em; margin-right: 8px" />
            字数总计：{{ articleWordNums() }}
          </div>
          <div>
            <Clock style="width: 1em; height: 1em; margin-right: 8px" />
            阅读时长：{{ currentReadingTime }}
          </div>
          <div>
            <CollectionTag style="width: 1em; height: 1em; margin-right: 8px" />
            {{ articleInfo.typeName }}
          </div>
          <!-- <p>
            <Magnet style="width: 1em; height: 1em; margin-right: 8px" />
            阅读量:001
          </p> -->
        </div>

        <div id="contentBox" v-html="articleInfo.content"></div>
      </div>
    </div>
    <settingButtonVue />
    <releaseCommentVue :displayComment="displayComment" />
  </div>
</template>

<style lang="less">
#container {
  display: flex;
  color: var(--fontColor);
  background-color: var(--contentGroundColor);
  /* 侧边栏 */

  #sideBar {
    min-width: 250px;
    width: 250px;
    height: 100vh;
    // box-shadow: var(--el-box-shadow);
    background-color: var(--backGroundColor);
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 9;

    position: sticky;
    top: 0;

    @media screen and (max-width: 789px) {
      display: none;
      position: fixed;
      left: 0;
    }

    /* 侧边栏标题 大纲|评论 */

    #siderBar_title {
      display: flex;
      padding: 20px;
      justify-content: space-around;
    }

    #siderBar_title div {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }

    #siderBar_title .active::after {
      content: "";
      display: block;
      width: 100%;
      height: 3px;
      margin-top: 3px;
      background-color: var(--themeColor);
    }
  }

  /* 右侧整体 */

  #rightContent {
    width: 100%;
    background: url("../assets/foreground.webp") repeat-x bottom;

    /* 文章展示 */
    #articleContent {
      padding: 10px 10px 200px 10px;
      max-width: 800px;
      /* border-left: 1px solid rgb(160, 160, 160);
            border-right: 1px solid rgb(160, 160, 160); */
      margin: 0 auto;

      // background-image: linear-gradient(
      //     90deg,
      //     rgba(60, 10, 30, 0.04) 5%,
      //     transparent 0
      //   ),
      //   linear-gradient(1turn, rgba(60, 10, 30, 0.04) 5%, transparent 0);
      // background-size: 20px 20px;
      // background-position: 50%;

      h1 {
        padding: 0 0 10px 0;
        // border-bottom: var(--secondaryFontColor) 1px solid;
      }

      #articleInfoBox {
        padding-top: 10px;
        // padding-bottom: 20px;
        display: flex;

        div {
          padding-right: 15px;
          display: flex;
          align-items: center;

          @media screen and (max-width: 576px) {
            padding-bottom: 5px;
          }
        }

        @media screen and (max-width: 576px) {
          flex-direction: column;
        }
      }

      animation: displayArticleContent 0.75s;

      #contentBox {
        .md-image {
          margin: 24px auto;
          border-radius: 4px;
        }

        .md-image img {
          border-radius: 4px;
          border-top: 1px solid #ccc;
          border-right: 1px solid #666;
          border-bottom: 2px solid #999;
          border-left: 1px solid #ccc;
          padding: 7px;
        }

        /* 当 “![shadow-随便写]()”写时，会有阴影 */

        .md-image img[alt|="shadow"] {
          box-shadow: #84a1a8 0px 10px 15px;
        }

        img {
          width: 100%;
        }

        a {
          color: var(--fontColor);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          position: relative;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-weight: bold;
          line-height: 1.4;
          cursor: text;
        }

        h1:hover a.anchor,
        h2:hover a.anchor,
        h3:hover a.anchor,
        h4:hover a.anchor,
        h5:hover a.anchor,
        h6:hover a.anchor {
          text-decoration: none;
        }

        h1 tt,
        h1 code {
          font-size: inherit !important;
        }

        h2 tt,
        h2 code {
          font-size: inherit !important;
        }

        h3 tt,
        h3 code {
          font-size: inherit !important;
        }

        h4 tt,
        h4 code {
          font-size: inherit !important;
        }

        h5 tt,
        h5 code {
          font-size: inherit !important;
        }

        h6 tt,
        h6 code {
          font-size: inherit !important;
        }

        h2 a,
        h3 a {
          color: #34495e;
        }

        h1 {
          padding-bottom: 0.3em;
          font-size: 2.2em;
          line-height: 1.2;
          margin: 2.4em auto 1.2em;
          color: var(--main-10);

          // h1标签下划线
          // &:after {
          //   content: "";
          //   display: block;
          //   margin: 0.2em auto 0;
          //   width: 1200px;
          //   height: 2px;
          //   border-bottom: 2px solid var(--themeColor);
          // }
        }

        h2 {
          margin: 2em auto 1.4em;
          line-height: 1.4;
          font-size: 1.8em;
          // border-bottom: 1px solid var(--themeColor);

          &::before {
            content: "# " !important;
            color: var(--themeColor);
          }
        }

        h3 {
          font-size: 1.4em;
          line-height: 1.43;
          margin: 1.6em auto 1.2em;
          padding-left: 9px;
          border-left: 5px solid var(--themeColor);
        }

        h4 {
          margin-top: 1.3em;
          font-size: 1.2em;
          padding-left: 6px;
          padding-right: 6px;
          display: inline-block;
          border: 1px solid var(--themeColor);
          border-top: 4px solid var(--themeColor);
        }

        p,
        blockquote,
        ul,
        ol,
        dl,
        table {
          margin: 0.8em 0;
        }

        blockquote {
          margin-left: 1.75px;
          margin-right: 0px;
          border-left: 4px solid var(--themeColor);
          padding: 10px 14px 7px 22px;
        }

        ul {
          list-style: circle;
          margin-left: 1.75px;
          margin-right: 0px;
          padding: 10px 14px 7px 22px;
        }

        ol {
          margin-left: 1.75px;
          margin-right: 0px;
          padding: 10px 14px 7px 22px;
        }

        ul > li {
          margin: 0.8em 0;
        }

        ol > li {
          margin: 0.8em 0;
        }

        li > ol,
        li > ul {
          margin: 0 0;
        }

        table {
          padding: 0;
          word-break: initial;
          border-collapse: collapse;
          border-top: 1px solid var(--themeColor);

          tr {
            margin: 0;
            padding: 0;
          }

          tr:nth-child(2n),
          thead {
            background-color: #fafafa;
          }
        }

        table tr th {
          font-weight: bold;
          border: 1px solid var(--themeColor);
          border-bottom: 0;
          text-align: left;
          margin: 0;
          padding: 6px 13px;
        }

        table tr td {
          border: 1px solid var(--themeColor);
          text-align: left;
          margin: 0;
          padding: 6px 13px;
        }

        table tr th:first-child,
        table tr td:first-child {
          margin-top: 0;
        }

        table tr th:last-child,
        table tr td:last-child {
          margin-bottom: 0;
        }

        @media print {
          html {
            font-size: 12px;
          }

          table,
          pre {
            page-break-inside: avoid;
          }

          pre {
            word-wrap: break-word;
          }
        }

        code {
          padding: 2px 0.4em;
          margin: 0 4px;
          overflow-x: auto;
          color: var(--themeColor);
          font-weight: 700;
          word-break: break-word;
          font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
          background-color: var(--contentGroundColor);
          border-radius: 5px;
        }

        pre {
          font-size: 16px;
          // padding: 10px;
          width: 100%;
          margin: 0 auto;
          // background-color: #f6f6f6;
          overflow-x: auto;

          code {
            display: block;
            padding: 1.5em;
            word-break: normal;
            font-size: 0.9em;
            font-style: normal;
            font-weight: 400;
            font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
            line-height: 20px;
            color: #f1f1f1;
            background-color: #343434;
            border-radius: 2px;
            scroll-behavior: smooth;
            border-radius: 5px;
          }
        }
      }
    }
  }
}

.displaySideBar {
  animation: displayBar 0.3s linear;
}

.hiddenSideBar {
  animation: hiddenBar 0.3s linear;
}

@keyframes displayArticleContent {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes displayBar {
  0% {
    opacity: 0;
    transform: translateX(-400px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes hiddenBar {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }

  100% {
    opacity: 0;
    width: 0px;
    transform: translateX(-400px);
    display: none;
  }
}
</style>
