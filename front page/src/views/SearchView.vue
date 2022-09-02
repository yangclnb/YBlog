<template>
  <div></div>
  <div id="searchBox"><searchBoxVue /></div>
</template>

<script setup>
import searchBoxVue from "../components/Search/searchBox.vue";
</script>

<style scoped>
#searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>