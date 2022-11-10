<script setup>
import { ElMessage } from 'element-plus'

const searchError = () => {
  ElMessage.error("Features are still under development");
};
</script>

<template>
  <div>
    <div></div>
    <div id="searchBox">
      <input type="text" name="searchInfo" id="" /> <button @click="searchError">YBlog一下</button>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 500px;
  height: 40px;
  border: 3px solid var(--themeColor);
  background-color: var(--backGroundColor);
  border-right: none;
  font-size: 18px;
  padding-left: 10px;
  border-radius: 20px 0 0 20px;
}

input:focus-visible {
  outline: none;
}

button {
  background-color: var(--themeColor);
  border-radius: 0 20px 20px 0;
  font-size: 16px;
  color: white;
  border: none;
  width: 110px;
  height: 46px;
}

button:hover {
  filter: contrast(120%);
}

#searchBox {
  display: flex;
  align-content: center;
  margin-bottom: 30px;
}

@media screen and (max-width: 768px) {
  input {
    width: 350px;
  }
}

@media screen and (max-width: 576px) {
  input {
    width: 200px;
  }
}
</style>