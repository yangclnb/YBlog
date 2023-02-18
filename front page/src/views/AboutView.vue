<script setup>
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { getAbout } from "@/api/about.js";
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "vue";
import title from "../utils/changeTitle";
import MarkdownIt from "markdown-it"; // 引入 markdown 模块

let content = ref("");
let loading = ref(true);



// 滚动到顶部
onMounted(() => {
  document.documentElement.scrollTop = 0;
  title("关于");
});

getAbout().then((results) => {
  let data = results.data[0].PersonalIntroduction;
  let md = new MarkdownIt();
  content.value = md.render(data);
  loading.value = false;
});
</script>

<template>
  <div class="about">
    <el-skeleton
      :rows="10"
      :loading="loading"
      animated
      :count="5"
      :throttle="500"
    >
      <template #default>
        <div id="aboutBox" v-html="content"></div>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="less">
.about {
  min-height: 100vh;
  padding: 40px;
  animation: displayAbout 0.75s;

  #aboutBox {
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    color:var(--fontColor);

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

    a{
      color:var(--fontColor);
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
      background-color: #ececec;
      text-overflow: ellipsis;
      overflow-x: auto;
      border-radius: 10px;
    }
  }
}

@keyframes displayAbout {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
