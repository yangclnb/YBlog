<script setup>
import { reactive } from "@vue/reactivity";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

const form = reactive({
  name: "",
  blogURL: "",
  comment: "",
});

const onSubmit = () => {
  console.log("submit~");
};

const cancelBox = () => {
  document.querySelector("#containerBox").style.display = "none";
};
</script>

<template>
  <div id="containerBox">
    <el-form id="commentBox" :model="form">
      <el-form-item label="Your name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Your blog">
        <el-input v-model="form.blogURL" placeholder="Please input">
          <template #prepend>Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Comment">
        <el-input v-model="form.comment" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button color="var(--themeColor)" type="primary" @click="onSubmit"
          >Create</el-button
        >
        <el-button @click="cancelBox">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
#containerBox {
  // 默认隐藏发布评论框

  position: fixed;
  width: 100vw;
  height: 100vh;

  display: none;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(2, 2, 2, 0.5);
    backdrop-filter: blur(15px);
    z-index: -1;
  }

  #commentBox {
    width: 400px;
    padding: 20px;
    min-height: 200px;
    border-radius: 10px;
    background-color: var(--contentGroundColor);

    animation: showBox 0.5s;

    @media screen and (max-width: 576px) {
      width: 85vw;
    }
  }
}

@keyframes showBox {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>