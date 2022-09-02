<template>
  <div id="content">
    <articalListVue />
    <div id="homeRightBar">
      <recommendVue />
    </div>
  </div>
</template>


<script>
import articalListVue from "../components/Home/articalList.vue";
import recommendVue from "../components/Home/recommend.vue";
export default {
  data() {
    return {};
  },
  components: {
    articalListVue,
    recommendVue,
  },
};
</script>

<style scoped>
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