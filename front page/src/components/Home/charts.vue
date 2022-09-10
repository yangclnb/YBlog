<script setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { onMounted, onUpdated } from "vue";
import { mcy } from "markdown-it/lib/common/entities";

echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition]);
let option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};

let myChart;

onMounted(() => {
  let chartDom = document.getElementById("chart");
  myChart = echarts.init(chartDom, null, { renderer: "svg" });
  option && myChart.setOption(option);
});

// 改变页面大小时重新渲染chart && 页面防抖
let time = null;
window.addEventListener("resize", () => {
  if (time !== null) clearTimeout(time);
  time = setTimeout(() => {


    myChart.resize()

  }, 500);
});
</script>

<template>
  <div id="chartBox">
    <div id="chart"></div>
  </div>
</template>

<style lang="less">
#chartBox {
  display: block;
  min-width: 20vw;
  box-shadow: var(--el-box-shadow);
  height: 300px;
  #chart {
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>