<script setup>
import { ElButtonGroup, ElButton, ElIcon } from "element-plus";
import { onMounted, ref } from "vue";
import { getAllVisitorAmount } from "../../api/artical";
import DynamicContent from "../dynamicContent/dynamicContent.vue";
import scrollingNumberVue from "../dynamicContent/scrollingNumber.vue";
import { ElSkeleton, ElSkeletonItem, ElMessage } from "element-plus";

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
function addFavorite() {
  ElMessage.warning("功能开发中...");
}

function sendMessage() {
  ElMessage.warning("功能开发中...");
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
        <DynamicContent>
          <h3>yancdrag</h3>
        </DynamicContent>
        <!-- <h3>yancdrag</h3> -->
        <p>The world is mine oyster.</p>
      </div>
      <!-- 头像 介绍 -->
    </div>
    <div id="buttonBox">
      <!-- 关注我 发消息  -->
      <el-button-group>
        <el-button type="primary" color="var(--themeColor)" @click="addFavorite"
          >关注我</el-button
        >
        <el-button @click="sendMessage">发消息</el-button>
      </el-button-group>
    </div>
    <div id="infoBox">
      <el-icon :size="20" color="var(--themeColor)"><StarFilled /></el-icon>
      <p>
        文章被浏览 :
        <el-skeleton
          style="width: 20px; display: inline"
          :loading="loading"
          animated
        >
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
  background-color: var(--contentGroundColor);
  color: var(--fontColor);

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