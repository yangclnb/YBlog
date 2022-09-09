<template>
  <div id="content">
    <articalListVue />
    <div id="homeRightBar">
      <recommendVue />
      <hr>
      <chartsVue />
    </div>
  </div>
</template>


<script>
import articalListVue from "../components/Home/articalList.vue";
import recommendVue from "../components/Home/recommend.vue";
import chartsVue from "../components/Home/charts.vue";
export default {
  data() {
    return {};
  },
  components: {
    articalListVue,
    recommendVue,
    chartsVue,
  },
};
</script>

<style scoped>
hr {
  margin: 15px 10px;
  border-top: none;
  background-color: rgb(201, 201, 201);
}

#content {
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
}

#homeRightBar {
  margin-left: 20px;
}

@media screen and (max-width: 768px) {
  #content {
    margin: 10px;
    padding: 0;
    flex-direction: column;
  }
  #homeRightBar {
    margin-left: 0;
  }
}
</style>