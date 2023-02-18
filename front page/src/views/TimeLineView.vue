<script setup>
import { ElTimeline, ElTimelineItem, ElCard } from "element-plus";
import { getArticleTimeLine } from "@/api/artical.js";
import { getAllBlog } from "../cache/cache.js";
import title from "../utils/changeTitle";
import { computed, onBeforeMount,onMounted, ref } from "vue";

let timeline = ref([]);

// 滚动到顶部
onMounted(()=>{
  document.documentElement.scrollTop = 0;
  title("归档");
})

onBeforeMount(() => {
  timeline.value = getAllBlog();
  if (timeline.value.length == 0) {
    getArticleTimeLine().then((result) => {
      timeline.value = result.data;
      console.log("fetch :>> ", timeline);
    });
  }
});

let getTime = function computed(time) {
  let releaseTime = new Date(Date.parse(time));
  return `${releaseTime.getFullYear()}-${
    releaseTime.getMonth() + 1
  }-${releaseTime.getDate()}`;
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
          color="var(--contentGroundColor)"
        >
          <el-card :body-style="{ 'background-color': 'var(--contentGroundColor)' }">
            <h4>{{ item.title }}</h4>
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
  animation: playTimeLine 0.75s;
}

h4{
  color:var(--fontColor);
}

@keyframes playTimeLine {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

@media screen and (max-width: 576px) {
  #timelinebox {
    margin: 0 20px;
  }
}
</style>