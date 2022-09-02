<script setup>
    import { RouterLink, RouterView } from "vue-router";
    import navigationBarVue from "../components/navigationBar.vue";
    </script>
    
    <template>
      <div id="page">
        <navigationBarVue />
        <div id="rightBox">
          <div id="logo">
            <img src="../assets/logo.svg" width="150" alt="" />
            <a href="https://github.com/yangclnb"><img src="../assets/github.svg" width="100" alt=""/></a>
          </div>
          <RouterView id="content" />
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
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    </style>
    