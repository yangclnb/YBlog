<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { computed } from "@vue/reactivity";
import router from "../router";
import { getArticleByID, addVisitorInfo } from "../api/artical.js"; // 读取文章信息
import { getBlogByCache } from "../cache/cache.js"; // 从缓存中获取文章内容

import MarkdownIt from "markdown-it"; // 引入 markdown 模块
import hljs from "highlight.js"; // 引入高亮模块
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/atom-one-light.css"; //引入一种语法的高亮

let currentID = router.currentRoute.value.params.articleID; // 从路由中获取文章id
let md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 得到经过highlight.js之后的html代码
    const code = hljs.highlight(str, {
      language: lang,
      ignoreIllegals: true,
    }).value;
    return code;
  },
}); // 文章内容 markdown 格式化  | 代码高亮
let articleInfo = ref([]);
let titleArr = ref([]);

// 记录访客信息
addVisitorInfo(currentID);
// 从缓存中获取数据
let BlogData = getBlogByCache(currentID);
if (BlogData == null) {
  // 从服务器中获取文章数据
  getArticleByID(currentID).then((data) => {
    let result = md.render(data.data[0].content);
    data.data[0].content = result;
    // 替换更改后的内容
    articleInfo.value = data.data[0];
    console.log("fetchData :>> ", data.data[0]);
  });
} else {
  // 直接返回缓存中的数据
  BlogData.content = md.render(BlogData.content);
  articleInfo.value = BlogData;
  console.log("cacheData :>> ", BlogData);
}

onMounted(() => {
  setTimeout(() => {
    // 格式化 h 标签，并且存入数组中
    let contentBox = document.querySelector("#articleContent").children;
    let index = 0; //文章内节点的索引
    let id = 0; //摘要中的索引
    for (const node of contentBox) {
      if (node.tagName.indexOf("H") != -1) {
        titleArr.value.push({
          id,
          index,
          tag: "title" + node.tagName,
          text: node.textContent,
          active: id == 0 ? true : false, // 初始化时高亮第一条数据
        });
        id++;
      }
      index++;
    }

    // 若是 摘要列表中存在内容 则添加滚动事件
    if (titleArr.value.length > 0) {
      window.addEventListener("scroll", DigestHighLightByScroll);
    }
  }, 200);
});

// 关闭页面时清楚绑定的scroll事件
onUnmounted(() => {
  window.removeEventListener("scroll", DigestHighLightByScroll);
});

/**
 * @description: 格式化发布时间事件
 * @param {*} computed
 * @return {*}
 * @author: Banana
 */
let articleReleaseTime = computed(() => {
  return articleInfo.value.pubtime.split("T")[0];
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
  // console.log('digestList[currentDigest.id] :>> ', digestList[currentDigest.id]);
  // digestList[currentDigest.id].scrollIntoView({ behavior: "smooth" });
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
      if (currentNodePosition.bottom > 55) {
        navigateToDigestNode(item);
        return;
      }
    }
    // 若是遍历完之后没有标题在屏幕中，则高亮最后一条摘要
    navigateToDigestNode(titleArr.value[titleArr.value.length - 1]);
  }, 100);
}
</script>


<template>
  <div id="articleContentViewBox">
    <div id="pageTitle">
      <div>
        <router-link to="/home">
          <img id="backButton" src="../assets/back.svg" width="30" alt="" />
        </router-link>
        <div id="articleInfo">
          <p id="articleTitle">{{ articleInfo.title }}</p>
          <div>
            <span id="articleReleaseTime">{{ articleReleaseTime }}</span>
            <span class="typeBox">每日一题</span>
            <span class="typeBox">算法</span>
          </div>
        </div>
      </div>

      <img src="../assets/logo.svg" width="120" alt="" />
    </div>
    <div id="articlebox">
      <div id="digest">
        <ul id="digestList">
          <li
            v-for="item in titleArr"
            :key="item.id"
            @click="navigateToArticleNode(item.index, item.id)"
            :class="{ active: item.active }"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div id="articlePart">
        <img v-if="articleInfo.titleImg" :src="articleInfo.titleImg" alt="" />
        <div id="articleContent" v-html="articleInfo.content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#articleContentViewBox {
  display: flex;
  flex-direction: column;

  #pageTitle {
    height: 55px;
    border-bottom: 1px solid var(--secondaryFontColor);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--backGroundColor);
    z-index: 9;
    position: sticky;
    top: 0;

    div {
      display: flex;
      align-items: center;

      #backButton {
        padding: 10px;
        // background-color: rgb(238, 238, 238);
        border-radius: 10px;
        margin-right: 20px;
      }

      #articleInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        #articleTitle {
          font-size: 20px;
        }

        div {
          font-size: 15px;
          color: var(--secondaryFontColor);
        }
      }
    }
  }

  #articlebox {
    margin: 0 auto;
    max-width: 1600px;
    display: flex;
    flex-direction: row;

    #digest {
      min-width: 300px;

      .dispalyBar(@name) {
        @keyframes @name {
          0% {
            transform: translateX(-400px);
          }
          100% {
            transform: translateX(0px);
          }
        }
      }

      .dispalyBar(testDisplayBar);

      .animation(@animation-name,@animation-duration) {
        animation: @arguments;
      }

      .animation(testDisplayBar,1s);

      ul {
        height: calc(~"100vh - 70px");
        display: block;
        padding: 0 10px;
        border-right: 1px solid var(--secondaryFontColor);
        overflow: auto;
        // background-color: #ececec;
        position: sticky;
        top: 55px;

        li {
          margin-bottom: 10px;
          padding: 5px 0 5px 5px;
          border-left: 3px solid var(--backGroundColor);
          transition: 0.5s all;
          cursor: pointer;
        }

        .active {
          border-left: 3px solid var(--themeColor);
          color: var(--themeColor);
        }
      }

      @media (max-width: 1000px) {
        display: none;
      }
    }

    #articlePart {
      img:nth-child(1) {
        width: 100%;
      }

      #articleContent {
        max-width: calc(~"100vw - 350px");
        padding: 10px;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;

        .dispalyArticle(@name) {
          @keyframes @name {
            0% {
              transform: translateY(400px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        }

        .dispalyArticle(testDisplayArticle);

        .animation(@animation-name,@animation-duration) {
          animation: @arguments;
        }

        .animation(testDisplayArticle,1s);

        @media screen and (max-width: 1000px) {
          max-width: 90vw;
        }

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

        pre {
          font-size: 16px;
          padding: 10px;
          width: 90%;
          margin: 0 auto;
          background-color: #f6f6f6;
          text-overflow: ellipsis;
          overflow-x: auto;
        }
      }
    }
  }
}
</style>
