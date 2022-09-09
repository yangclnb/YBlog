<script setup>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { onMounted } from "vue";

echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition]);

onMounted(() => {
  var chartDom = document.getElementById("chart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
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

  option && myChart.setOption(option);
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