<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";

let colors = [
  "rgb(110,64,170)",
  "rgb(150,61,179)",
  "rgb(191,60,175)",
  "rgb(228,65,157)",
  "rgb(254,75,131)",
  "rgb(255,94,99)",
  "rgb(255,120,71)",
  "rgb(251,150,51)",
  "rgb(226,183,47)",
  "rgb(198,214,60)",
  "rgb(175,240,91)",
  "rgb(127,246,88)",
  "rgb(82,246,103)",
  "rgb(48,239,130)",
  "rgb(29,223,163)",
  "rgb(26,199,194)",
  "rgb(35,171,216)",
  "rgb(54,140,225)",
  "rgb(76,110,219)",
  "rgb(96,84,200)",
];

const dynamicBox = ref();
let alreadyOutput = "";

onMounted(() => {
  const dynamicElement = dynamicBox.value.firstElementChild;
  const currentContent = dynamicElement.innerHTML;
  for (let i = 0; i < currentContent.length; i++) {
    setTimeout(() => {
      alreadyOutput += currentContent[i];
      dynamicElement.innerHTML = alreadyOutput + getRandomChar(currentContent.length - i);
    }, (i + 1) * 100);
  }
});

const getRandomChar = (length) => {
  let string = "";
  for (let i = 1; i < length; i++) {
    const randomNum = 33 + parseInt((Math.random() * 10));
    const randomChar = String.fromCharCode(randomNum);
    string += getRandomColorSpan(randomChar);
  }
  return string;
};

const getRandomColorSpan = (char) => {
  const randomColorIndex = (Math.random() * colors.length).toFixed(0);
  return `<span style='color:${colors[randomColorIndex]}'>${char}</span>`;
};
</script>

<template>
  <div id="text_tag_container" ref="dynamicBox">
    <slot></slot>
  </div>
</template>

<style>
#text_tag_container {
  display: inline;
  overflow: hidden;
}
</style>