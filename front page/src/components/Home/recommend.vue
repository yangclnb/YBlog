<template>
  <div id="recommend" style="box-shadow: var(--el-box-shadow);">
    <div id="title">推荐阅读</div>
    <ul>
      <li>asdasdasdasd</li>
      <li>正圆方程</li>
      <li>asdasdasdasd</li>
      <li>各类间断点的区别</li>
      <li>常数项级数笔记</li>
      <li>test123</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#recommend {
  min-width: 20vw;
}

#title {
  text-align: center;
  background-color: #aab5cb;
  color: white;
  padding: 5px 0;
  font-size: 20px;
}

ul {
  list-style: none;
}

ul > li {
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.5s linear;
}

ul > li:hover {
  background-color: #e7eaf0;
}
</style>