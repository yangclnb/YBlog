<script setup>
import { ref } from "@vue/reactivity";
import { encode } from "../utils/articleEncoding";
import { getAllBlog, addArticleCache } from "../cache/cache.js";
import title from "../utils/changeTitle";
import { getAllArtical } from "../api/artical";
import { onMounted } from "vue";

let typeData = ref([]);

// 滚动到顶部
onMounted(() => {
  document.documentElement.scrollTop = 0;
  title("分类");
});

// 更新本地存储
addArticleCache();

// 从缓存中读取数据
let cacheData = getAllBlog();
// 读取为空则表示缓存中没数据 开始请求服务器数据
if (cacheData.length === 0) {
  getAllArtical().then((results) => {
    cacheData = results.data;
    console.log("fetch data =>", results.data);
    typeData.value = handleData(cacheData);
  });
} else {
  typeData.value = handleData(cacheData);
}

/**
 * @function handleData
 * @description: 处理文章数据，提取关键信息并分类
 * @return {Object} 返回处理好的对象
 * @author: Banana
 */
function handleData(data) {
  let typeObject = {};
  for (const item of data) {
    if (typeObject[item.typeId]) {
      // 获取map中先前存放的列表，并且添加当前项
      let currentList = typeObject[item.typeId].list;
      currentList.push({ name: item.title, id: item.blogId });

      typeObject[item.typeId].list = currentList;
    } else {
      typeObject[item.typeId] = {};
      typeObject[item.typeId].className = item.typeName;
      typeObject[item.typeId].displayMore = false;
      typeObject[item.typeId].list = [{ name: item.title, id: item.blogId }];
    }
  }
  console.log("typeObject :>> ", typeObject);
  return typeObject;
}
</script>

<template>
  <div id="content">
    <div class="classBox" v-for="(item, i) of typeData" :key="i">
      <div class="classTitle">
        <div class="classTitle_badge">
          <h3>{{ item.className }}</h3>
          <span>{{ item.list.length }}</span>
        </div>
      </div>
      <ul>
        <template v-for="(list, j) of item.list" :key="j">
          <router-link
            :to="{ name: 'articleContent', params: { articleID: encode(list.id) } }"
            v-if="j < 4 || item.displayMore"
          >
            <li>
              <ArrowRightBold
                style="width: 1em; height: 1em; margin-right: 8px"
              />{{ list.name }}
            </li>
          </router-link>
        </template>
        <li
          v-if="item.list.length > 4 && !item.displayMore"
          @click="item.displayMore = !item.displayMore"
          style="justify-content: center"
        >
          <Plus style="width: 1em; height: 1em; margin-right: 8px" />展示更多
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
#content {
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;

  // animation ----------------------------
  .dispalyFriendChain(@name) {
    @keyframes @name {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }

      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }

  .dispalyFriendChain(testDisplayFriendChain);

  .animation(@animation-name, @animation-duration) {
    animation: @arguments;
  }

  .animation(testDisplayFriendChain, 0.75s);

  // animation ----------------------------

  .classBox {
    width: 45%;
    min-height: 220px;
    margin: 10px;
    // box-shadow: var(--el-box-shadow);
    background-color: var(--contentGroundColor);
    border-radius: 5px;
    color: var(--fontColor);

    .classTitle {
      margin: 0 10px;
      padding: 10px 0;

      .classTitle_badge {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-bottom: 2px solid var(--backGroundColor);

        span::before {
          content: "";
          padding: 2px;
        }

        span {
          display: inline-block;
          transform: translateY(-10px);
        }
      }
    }

    ul {
      li {
        transition: 0.5s all;
        padding: 5px 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--fontColor);

        &:hover {
          color: var(--themeColor);
        }
      }
    }

    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
}
</style>
