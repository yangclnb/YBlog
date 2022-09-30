<script setup>
import { onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import navigationBarVue from "../components/navigationBar.vue";

onMounted(() => {
  console.log("页面加载");
});
// TODO 在页面关闭时加载
onUnmounted(() => {
  console.log("页面关闭");
});
</script>
    
    <template>
  <div id="page">
    <navigationBarVue />
    <div id="rightBox">
      <div id="logo">
        <img src="../assets/logo.svg" width="120" alt="" />
        <a href="https://github.com/yangclnb"
          ><img src="../assets/github.svg" width="55" alt=""
        /></a>
      </div>
      <RouterView />
    </div>
  </div>
</template>
    
    <style scoped>
#page {
  display: flex;
}
#rightBox {
  flex: 3;
}
#logo {
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
    