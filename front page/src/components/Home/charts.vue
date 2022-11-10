<script setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { onMounted } from "vue";
import { getVisitorData } from "../../api/artical.js";
import { mcy } from "markdown-it/lib/common/entities";

echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition]);

let option = {
  xAxis: {
    type: "category",
    data: ["date"],
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
let chartDom;
let myChart;

onMounted(() => {
  chartDom = document.getElementById("chart");
  myChart = echarts.init(chartDom, null, { renderer: "svg" });
});

getVisitorData().then((results) => {
  let fetchData = results.data;

  let date = [];
  let data = [];

  for (const item of fetchData) {
    let timeData = item.time.split("-");
    data.push(item.count);
    date.push(timeData[1] + "-" + timeData[2]);
  }

  option.xAxis.data = date;
  option.series[0].data = data;

  option && myChart.setOption(option);

  // console.log("option :>> ", option);
});

// 改变页面大小时重新渲染chart && 页面防抖
let time = null;
window.addEventListener("resize", () => {
  if (time !== null) clearTimeout(time);
  time = setTimeout(() => {
    myChart.resize();
  }, 500);
});
</script>

<template>
  <div id="chartBox">
    <p>近期访问数据</p>
    <div id="chart"></div>
  </div>
</template>

<style lang="less">
#chartBox {
  display: block;
  min-width: 20vw;
  background-color: var(--contentGroundColor);
  border-radius: 5px;
  // box-shadow: var(--el-box-shadow);
  height: 300px;
  #chart {
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }

  p {
    padding-top: 20px;
    padding-left: 20px;
    color:var(--fontColor);
  }
}
</style>