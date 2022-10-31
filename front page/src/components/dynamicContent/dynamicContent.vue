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
  let newArr = props.text.split("");
  for (let i = 0; i < newArr.length; i++) {
    setTimeout(() => {
      alreadyOutput += newArr[i];
      outputTitle.value = alreadyOutput + getRandomChar(newArr.length - i);
    }, (i + 1) * 200);
  }
});

const getRandomChar = (length) => {
  let string = "";
  for (let i = 1; i < length; i++) {
    let randomChar = String.fromCharCode((Math.random() * 100).toFixed(0));
    string += getRandomColorSpan(randomChar);
  }
  //   console.log(string);
  return string;
};

const getRandomColorSpan = (char) => {
  let randomColorIndex = (Math.random() * colors.length).toFixed(0);
  return `<span style='color:${colors[randomColorIndex]}'>${char}</span>`
};


</script>

<template>
  <h1 v-html="outputTitle"></h1>
</template>

<style>
</style>