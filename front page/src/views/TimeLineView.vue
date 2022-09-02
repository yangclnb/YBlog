<template>
  <div>
    <div id="timelinebox">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>


<script setup>
import { ElTimeline, ElTimelineItem, ElCard } from "element-plus";
</script>


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