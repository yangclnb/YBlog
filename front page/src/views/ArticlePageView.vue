<template>
  <div id="content">
    <div id="digest">
      <ul>
        <li>
          <a href="#articleInfo">{{ articleInfo.title }}</a>
        </li>
        <li :for="(item, i) in titleArr" :key="i">1</li>
      </ul>
    </div>
    <div id="articlePart">
      <img v-if="articleInfo.titleImg" :src="articleInfo.titleImg" alt="" />
      <div id="articleInfo">
        <h2>{{ articleInfo.title }}</h2>
        <br />
        <span>{{ articleInfo.pubtime }}</span>
        <span class="typeBox">每日一题</span> <span class="typeBox">算法</span>
        <br />
      </div>
      <hr />
      <div id="articleContent" v-html="articleInfo.content"></div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import router from "../router";
import MarkdownIt from "markdown-it"; // 引入 markdown 模块
import hljs from "highlight.js"; // 引入高亮模块
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/atom-one-light.css"; //引入一种语法的高亮
import { getArticleByID } from "../api/artical.js"; // 读取文章信息

let currentID = router.currentRoute.value.params.articleID; // 从路由中获取文章id
let articleInfo = ref([]);
let titleArr = ref([]);

// 请求文章信息并存入 articleInfo 中
onBeforeMount(() => {
  getArticleByID(currentID).then((data) => {
    // 文章内容 markdown 格式化  | 代码高亮
    let md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        // 得到经过highlight.js之后的html代码
        const code = hljs.highlight(lang, str, true).value;
        return code;
      },
    });
    let result = md.render(data.data[0].content);
    data.data[0].content = result;
    // 替换更改后的内容
    articleInfo.value = data.data[0];
    console.log("data.data[0] :>> ", data.data[0]);
  });
});

onMounted(() => {
  setTimeout(() => {
    // 格式化 h 标签，并且存入数组中
    let contentBox = document.querySelector("#articleContent").children;
    console.log("contentBox.children :>> ", contentBox.length);
    for (const node of contentBox) {
      if (node.tagName.indexOf("H") != -1) {
        titleArr.value.push(node);
      }
    }
    console.log("titleArr :>> ", titleArr.value);
  }, 100);
});
</script>
  
  <style lang="less">
#content {
  margin: 0 auto;
  padding: 10px;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  // background-color: bisque;
  #digest {
    min-width: 200px;

    ul {
      padding: 10px;
      border: 1px solid var(--secondaryFontColor);
      position: sticky;
      top: 0;
    }
  }

  #articlePart {
    img:nth-child(1) {
      width: 100%;
    }

    #articleInfo {
      padding: 10px;
      .typeBox {
        background-color: beige;
        padding: 4px 10px;
        border-radius: 20px;
      }
    }

    #articleContent {
      padding: 10px;
      max-width: 1000px;
      background-color: bisque;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;

      img {
        width: 50vw;
        margin: 0 auto;
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

      ul > li {
        margin: 0.8em 0;
      }

      pre {
        font-size: 16px;
        padding: 10px;
        margin: 0 auto;
        background-color: #ececec;
        text-overflow: ellipsis;
        overflow: scroll;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #digest {
    display: none;
  }
}
</style>