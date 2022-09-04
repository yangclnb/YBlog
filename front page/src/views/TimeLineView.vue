<script setup>
import { ElTimeline, ElTimelineItem, ElCard } from "element-plus";
import { getArticleTimeLine } from "@/api/artical.js";
import { computed, onBeforeMount, ref } from "vue";

let timeline = ref([]);

onBeforeMount(() => {
  getArticleTimeLine().then((result) => {
    timeline.value = result.data;
    console.log("result.data :>> ", timeline);
  });
});

let getTime = function computed(time) {
  return time.split("T")[0];
};
</script>


<template>
  <div>
    <div id="timelinebox">
      <el-timeline>
        <el-timeline-item
          v-for="item in timeline"
          :key="item"
          :timestamp="getTime(item.pubtime)"
          placement="top"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ getTime(item.pubtime) }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>




<style>
#timelinebox {
  max-width: 600px;
  /* margin: 0 50px; */
  margin: 0 auto;
}

@media screen and (max-width: 576px) {
  #timelinebox {
    margin: 0 20px;
  }
}
</style>