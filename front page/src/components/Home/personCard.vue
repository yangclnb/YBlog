<script setup>
import { ElButtonGroup, ElButton, ElIcon } from "element-plus";
import { onMounted, ref } from "vue";
import { getAllVisitorAmount } from "../../api/artical";
import DynamicContent from "../dynamicContent/dynamicContent.vue";
import scrollingNumberVue from "../dynamicContent/scrollingNumber.vue";
import { ElSkeleton, ElSkeletonItem } from "element-plus";

let visitorAmount = ref(0);
let loading = ref(true);

onMounted(() => {
  getAllVisitorAmount().then((data) => {
    // console.log('data :>> ', data.data[0]);
    visitorAmount.value = data.data[0].amount;
    loading.value = false;
  });
});

// 收藏本站
function _addFavorite() {
  var url = window.location;
  var title = document.title;
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("360se") > -1) {
    alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
  } else if (ua.indexOf("msie 8") > -1) {
    window.external.AddToFavoritesBar(url, title); //IE8
  } else if (document.all) {
    //IE类浏览器
    try {
      window.external.addFavorite(url, title);
    } catch (e) {
      alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
    }
  } else if (window.sidebar) {
    //firfox等浏览器；
    window.sidebar.addPanel(title, url, "");
  } else {
    alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
  }
}
</script>


<template>
  <div id="personCard">
    <div id="headBox">
      <img
        src="..\..\assets\038cb8e1dd9931f597741c36efa393db69551829.png"
        alt=""
      />
      <div>
        <DynamicContent text="yancdrag" tagName="h3" />
        <!-- <h3>yancdrag</h3> -->
        <p>The world is mine oyster.</p>
      </div>
      <!-- 头像 介绍 -->
    </div>
    <div id="buttonBox">
      <!-- 关注我 发消息  -->
      <el-button-group>
        <el-button
          type="primary"
          color="var(--themeColor)"
          @click="_addFavorite"
          >关注我</el-button
        >
        <el-button>发消息</el-button>
      </el-button-group>
    </div>
    <div id="infoBox">
      <el-icon :size="20" color="var(--themeColor)"><StarFilled /></el-icon>
      <p>
        文章被浏览 :
        <el-skeleton style="width: 20px;display: inline;" :loading="loading" animated>
          <template #template>
            <el-skeleton-item variant="span" style="width: 40px" />
          </template>
          <template #default>
            <span>{{ visitorAmount }}</span>
          </template>
        </el-skeleton>
        次
      </p>
      <!-- <scrollingNumberVue i="6"/> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
#personCard {
  border-radius: 5px;
  padding: 20px;
  max-width: 280px;
  background-color: var(--contentGroundColor);

  @media screen and (max-width: 768px) {
    max-width: none;
  }

  #headBox {
    display: flex;
    // justify-content: space-between;
    align-items: center;

    white-space: nowrap;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis;

    img {
      border-radius: 50px;
      width: 50px;
      margin-right: 10px;
    }
  }

  #buttonBox {
    margin-top: 20px;
  }

  #infoBox {
    margin-top: 20px;
    display: flex;
  }
}
</style>