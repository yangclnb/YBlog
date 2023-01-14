<script setup>
import { ref } from "@vue/reactivity";
import { ElIcon, ElColorPicker, ElMessage } from "element-plus";
import { computed, onMounted } from "vue";

const color = ref(localStorage.getItem("currentColor") || "#eecfda");
const displayType = ref(localStorage.getItem("displayType") || "day"); // day || night
const model_icon_box = ref();
console.log(model_icon_box);
const predefineColors = ref([
  "#eecfda",
  "#e3cbd3",
  "#ecd0c5",
  "#e3d5da",
  "#f2e3fa",
  "#cbbfd1",

  "#06a6ff",
  "#0e6fc7",
  "#009fd6",
  "#08d1db",
  "#10ce9b",
  "#7dcb65",
  "#a8c54c",
]);
let currentSteeingState = true; // 点击设置弹出的按钮状态
let currentButtonGroupState = false; // 退回顶部按钮组的状态 true 显示
let hasSideBar = ref(null); // DOM中存在文章访问页面的侧边栏

// 启动时更改 主题色
document.documentElement.style.setProperty("--themeColor", color.value);

onMounted(() => {
  // dom加载完成后检测滚动的距离 判断是否显示放回顶部的按钮
  currentButtonGroupState =
    document.documentElement.scrollTop <= 2 ? false : true;
  if (!currentButtonGroupState)
    document.querySelector("#back_top").style.visibility = "hidden";

  // DOM是否存在 文章访问页面的侧边栏 有就位该元素 否则为空
  hasSideBar.value = document.querySelector("#sideBar") || null;

  if (displayType.value === "day") {
    becomeDayModel();
  } else {
    becomeNightModel();
  }
});

/**
 * @function: changeColor
 * @description: 改变主题颜色
 * @author: Banana
 */
function changeColor() {
  color.value = color.value || "#06a6ff"; // 防止用户输入为空
  document.documentElement.style.setProperty("--themeColor", color.value);
  localStorage.setItem("currentColor", color.value);

  ElMessage.success("主题色更改成功~");
}

/**
 * @function: backTop
 * @description: 返回顶部
 * @author: Banana
 */
function backTop() {
  document.documentElement.scrollTop = 0;
}

/**
 * @function:
 * @description: 切换 白天/夜间 模式
 * @return {*}
 * @author: Banana
 */
function changeDisplayModel() {
  // document.documentElement.style.setProperty("--backGroundColor", "black");
  // ElMessage.error("Features are still under development");

  if (displayType.value === "day") {
    becomeNightModel();
  } else {
    becomeDayModel();
  }
}


/**
 * @function: becomeDayModel
 * @description: 切换白天模式
 * @return {*}
 * @author: Banana
 */
function becomeDayModel() {
  model_icon_box.value.style.right = "0px";
  displayType.value = "day";
  localStorage.setItem("displayType", displayType.value);

  document.documentElement.style.setProperty("--backGroundColor", "#f4f5f5");
  document.documentElement.style.setProperty("--contentGroundColor", "white");
  document.documentElement.style.setProperty("--fontColor", "rgb(75, 75, 75)");
}



/**
 * @function: becomeNightModel
 * @description: 切换夜间模式
 * @return {*}
 * @author: Banana
 */
function becomeNightModel() {
  model_icon_box.value.style.right = "28px";
  displayType.value = "night";
  localStorage.setItem("displayType", displayType.value);

  document.documentElement.style.setProperty("--backGroundColor", "#3d3d3d");
  document.documentElement.style.setProperty("--contentGroundColor", "#535353");
  document.documentElement.style.setProperty("--fontColor", "white");
}

/**
 * @function:
 * @description: 向下滚动展示按钮框
 * @return {*}
 * @author: Banana
 */
window.addEventListener(
  "scroll",
  debounce(() => {
    let currentScrollNum = document.documentElement.scrollTop;
    // console.log("currentScrollNum :>> ", currentScrollNum);

    if (currentScrollNum <= 2 && currentButtonGroupState) {
      let buttonNode = document.querySelector("#back_top");

      buttonNode.classList.add("hiddenAnimation");
      buttonNode.classList.remove("showAnimation");

      currentButtonGroupState = false;

      setTimeout(() => {
        buttonNode.style.visibility = "hidden";
      }, 300); // 等待三毫秒 执行完动画后再隐藏元素
    } else if (currentScrollNum > 2 && !currentButtonGroupState) {
      let buttonNode = document.querySelector("#back_top");

      buttonNode.classList.add("showAnimation");
      buttonNode.classList.remove("hiddenAnimation");

      buttonNode.style.visibility = "visible";
      currentButtonGroupState = true;
    }
  }, 100)
);

/**
 * 防抖函数  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function debounce(fn, delay) {
  //记录上一次的延时器
  var timer = null;
  return function () {
    //清除上一次的演示器
    clearTimeout(timer);
    //重新设置新的延时器
    timer = setTimeout(function () {
      //修正this指向问题
      fn.apply(this);
    }, delay);
  };
}

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

    if (currentSteeingState) {
      node.style.visibility = "visible";
    } else
      setTimeout(() => {
        node.style.visibility = "hidden";
      }, 300); // 等待三毫秒 执行完动画后再隐藏元素
  }
  currentSteeingState = !currentSteeingState;
}

/**
 * @function: toggleSideBar
 * @description: 切换侧边栏的显示与隐藏
 * @return {*}
 * @author: Banana
 */
function toggleSideBar() {
  let buttonNode = document.querySelector("#display_side_bar > i");
  buttonNode.classList.toggle("showSideBarIcon");
  buttonNode.classList.toggle("hiddenSideBarIcon");

  let SideBar = hasSideBar.value;
  let currentIsDisplay = getComputedStyle(SideBar).display;

  if (currentIsDisplay === "block") {
    SideBar.classList.add("hiddenSideBar");
    SideBar.classList.remove("displaySideBar");
    setTimeout(() => {
      SideBar.style.display = "none";
    }, 200);
  } else {
    SideBar.classList.add("displaySideBar");
    SideBar.classList.remove("hiddenSideBar");
    setTimeout(() => {
      SideBar.style.display = "block";
    }, 200);
  }
}

/**
 * @function: showCommentBox
 * @description: 显示评论框
 * @return {*}
 * @author: Banana
 */
function showCommentBox() {
  const commentBox = document.querySelector("#containerBox");
  const currentCommentStatus = getComputedStyle(commentBox).display;
  commentBox.style.display = currentCommentStatus === "none" ? "flex" : "none";
}

// TODO 主题颜色
</script>

<template>
  <div id="right_side_button_box" class="showAnimation">
    <div
      id="change_modle"
      @click="changeDisplayModel"
      class="setting_operation hiddenAnimation"
    >
      <div id="model_icon_box" ref="model_icon_box">
        <el-icon :size="25" color="var(--contentGroundColor)">
          <Sunny />
        </el-icon>
        &nbsp;
        <el-icon :size="25" color="var(--contentGroundColor)">
          <Moon />
        </el-icon>
      </div>
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
      <el-icon :size="25" color="var(--contentGroundColor)" class="is-loading">
        <Setting />
      </el-icon>
    </div>
    <div
      id="display_side_bar"
      @click="toggleSideBar"
      v-show="hasSideBar != null"
    >
      <el-icon class="showSideBarIcon" :size="25" color="var(--contentGroundColor)">
        <Download />
      </el-icon>
    </div>
    <div id="commitComment" @click="showCommentBox" v-show="hasSideBar != null">
      <el-icon :size="25" color="var(--contentGroundColor)"><ChatLineSquare /></el-icon>
    </div>
    <div id="back_top" class="hiddenAnimation" @click="backTop">
      <el-icon :size="25" color="var(--contentGroundColor)">
        <CaretTop />
      </el-icon>
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

.showSideBarIcon {
  transform: rotate(-90deg);
}

.hiddenSideBarIcon {
  transform: rotate(90deg);
}

#right_side_button_box {
  position: fixed;
  right: 20px;
  bottom: 100px;

  z-index: 9;

  /* translate: 1s; */
}

#right_side_button_box > div {
  background-color: var(--themeColor);
  width: 25px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;

  overflow: hidden;
}

#display_side_bar > i {
  transition: all 0.5s;
}

#model_icon_box {
  display: flex;
  position: relative;
  /* right: 28px; */
  right: 0px;

  transition: all 0.5s;
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