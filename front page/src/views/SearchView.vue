<script setup>
import searchBoxVue from "../components/Search/searchBox.vue";
import articalListVue from "../components/Home/articalList.vue";
</script>

<template>
  <div id="container">
    <div id="searchBox">
      <searchBoxVue />
    </div>
    <articalListVue />
  </div>
  <div></div>
</template>


<style scoped>
#container {
  margin: 0 auto;
  padding: 10px;
  max-width: 1200px;

  display: flex;
  flex-direction: column;
}

#searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>