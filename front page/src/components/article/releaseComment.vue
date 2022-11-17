<script setup>
import { reactive, ref } from "@vue/reactivity";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { releaseComment } from "../../api/comment.js";
import { decode } from "../../utils/articleEncoding";
import router from "../../router/index.js";

let currentID = decode(router.currentRoute.value.params.articleID);

const form = reactive({
  name: "",
  blogURL: "",
  comment: "",
});
const commentContainer = ref();
const props = defineProps({
  displayComment: Function,
});
let lodaing = ref(false);

// console.log('props :>> ', props.displayComment());

/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function throttle(delay) {
  //记录上一次函数触发的时间
  var lastTime = 0;
  return function () {
    //记录当前函数触发的时间
    var nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      submitData();
      //同步执行结束时间
      lastTime = nowTime;
    }
  };
}

const submitData = () => {
  if (form.name != "" && form.comment != "") {
    lodaing.value = true;
    releaseComment(currentID, form.name, form.blogURL, form.comment).then(
      (data) => {
        console.log("data :>> ", data);
        if (data.code === 200) {
          commentContainer.value.style.display = "none";
          props.displayComment();
          ElMessage.success("评论发布成功~");
          form.blogURL = "";
          form.comment = "";
          form.name = "";
        } else ElMessage.error("评论发布失败，请稍后重试");
        lodaing.value = false;
      }
    );
  } else {
    ElMessage.error("请确保您的输入昵称和评论内容不为空");
  }
};

const temp = throttle(2000);
const onSubmit = () => {
  temp();
};

const cancelBox = () => {
  commentContainer.value.style.display = "none";
};
</script>

<template>
  <div id="containerBox" ref="commentContainer">
    <el-form id="commentBox" :model="form">
      <el-form-item>
        <el-input v-model="form.name" placeholder="您的昵称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.blogURL" placeholder="您的博客地址（非必填）">
          <template #prepend>http://</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="form.comment"
          type="textarea"
          placeholder="您评论的内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          color="var(--themeColor)"
          type="primary"
          @click="onSubmit"
          :loading="lodaing"
          >发布评论</el-button
        >
        <el-button @click="cancelBox">取消</el-button>
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