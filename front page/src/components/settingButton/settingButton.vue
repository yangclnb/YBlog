<script setup>
import { ref } from "@vue/reactivity";
import { ElIcon, ElColorPicker, ElMessage } from "element-plus";
import { computed } from "vue";

const color = ref(localStorage.getItem("currentColor") || "#06a6ff");
const predefineColors = ref([
  "#06a6ff",
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#c71585",
]);
let currentSteeingState = true;

document.documentElement.style.setProperty("--themeColor", color.value);

/**
 * @function: changeColor
 * @description: 改变主题颜色
 * @author: Banana
 */
function changeColor() {
  color.value = color.value || "#06a6ff"; // 防止用户输入为空
  document.documentElement.style.setProperty("--themeColor", color.value);
  localStorage.setItem("currentColor", color.value);
}

/**
 * @function: backTop
 * @description: 返回顶部
 * @author: Banana
 */
function backTop() {
  document.documentElement.scrollTop = 0;

  //   scrollToptimer = setInterval(function () {
  //     console.log("定时循环回到顶部");
  //     var top = document.body.scrollTop || document.documentElement.scrollTop;
  //     var speed = top / 4;
  //     if (document.body.scrollTop != 0) {
  //       document.body.scrollTop -= speed;
  //     } else {
  //       document.documentElement.scrollTop -= speed;
  //     }
  //     if (top == 0) {
  //       clearInterval(scrollToptimer);
  //     }
  //   }, 30);
}

/**
 * @function:
 * @description: 切换 白天/夜间 模式
 * @return {*}
 * @author: Banana
 */
function changeDisplayModle() {
  // document.body.style.filter = "invert(1)";
  document.documentElement.style.setProperty("--backGroundColor", "black");
  ElMessage.error("Features are still under development");
}

/**
 * @function:
 * @description: 向下滚动展示按钮框
 * @return {*}
 * @author: Banana
 */
// window.addEventListener("scroll",()=>{
//     console.warn("hellow")
// })

/**
 * @function: settingOperation
 * @description: 点击setting按钮 向上弹出 改变主题色和切换模式按钮
 * @return {*}
 * @author: Banana
 */
function settingOperation() {
  let dom = document.querySelectorAll(".setting_operation");
  for (const node of dom) {
    node.classList.toggle("showAnimation");
    node.classList.toggle("hiddenAnimation");

    if (currentSteeingState) node.style.visibility = "visible";
    else setTimeout(() => {
      node.style.visibility = "hidden";
    }, 300); // 等待三毫秒 执行完动画后再隐藏元素
  }
  currentSteeingState = !currentSteeingState;
}
</script>

<template>
  <div id="right_side_button_box">
    <div
      id="change_modle"
      @click="changeDisplayModle"
      class="setting_operation hiddenAnimation"
    >
      <el-icon :size="25" color="white"><Sunny /></el-icon>
      <el-icon :size="25" color="white" class="hidden"><Moon /></el-icon>
    </div>
    <div id="change_theme" class="setting_operation hiddenAnimation">
      <el-color-picker
        v-model="color"
        size="small"
        :predefine="predefineColors"
        @change="changeColor"
      />
    </div>
    <div id="seting_button" @click="settingOperation">
      <el-icon :size="25" color="white" class="is-loading"><Setting /></el-icon>
    </div>
    <div id="back_top" @click="backTop">
      <el-icon :size="25" color="white"><CaretTop /></el-icon>
    </div>
  </div>
</template>

<style>
.hidden {
  display: none;
}

.setting_operation {
  visibility: hidden;
  /* visibility: visible; */
}

.showAnimation {
  animation: show_right_button 0.5s;
}
.hiddenAnimation {
  animation: hidden_right_button 0.5s;
}

#right_side_button_box {
  position: fixed;
  right: 20px;
  bottom: 100px;

  animation: show_right_button 0.5s;
  /* translate: 1s; */
}

#right_side_button_box > div {
  background-color: var(--themeColor);
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
}

@keyframes show_right_button {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes hidden_right_button {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(100px);
  }
}
</style>