<script setup>
import { ref, toRefs } from "@vue/reactivity";
import { onMounted } from "vue";

let props = defineProps({
  text: String,
  tagName: String,
});

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
let outputTitle = ref("");
let alreadyOutput = "";
let randomChar = "";

onMounted(() => {
  const newArr = props.text.split("");
  for (let i = 0; i < newArr.length; i++) {
    setTimeout(() => {
      alreadyOutput += newArr[i];
      outputTitle.value = alreadyOutput + getRandomChar(newArr.length - i);
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
  <div id="text_tag_container">
    <h1 v-if="props.tagName == 'h1'" v-html="outputTitle"></h1>
    <h2 v-if="props.tagName == 'h2'" v-html="outputTitle"></h2>
    <h3 v-if="props.tagName == 'h3'" v-html="outputTitle"></h3>
    <h4 v-if="props.tagName == 'h4'" v-html="outputTitle"></h4>
    <h5 v-if="props.tagName == 'h5'" v-html="outputTitle"></h5>
    <p v-if="props.tagName == 'p'" v-html="outputTitle"></p>
    <span v-if="props.tagName == 'span'" v-html="outputTitle"></span>
  </div>
</template>

<style>
#text_tag_container {
  display: inline;
  overflow: hidden;
}
</style>