<template>
  <div></div>
  <div id="searchBox">
    <input type="text" name="searchInfo" id="" /> <button>YBlog一下</button>
  </div>
</template>

<script setup>
</script>

<style scoped>
input {
  width: 500px;
  height: 40px;
  border: 3px solid #06a6ff;
  border-right: none;
  font-size: 18px;
  padding-left: 10px;
  border-radius: 20px 0 0 20px;
}

input:focus-visible {
  outline: none;
}

button {
  background-color: #06a6ff;
  border-radius: 0 20px 20px 0;
  font-size: 16px;
  color: white;
  border: none;
  width: 110px;
  height: 46px;
}

button:hover {
  background-color: #008dda;
}

#searchBox {
  display: flex;
  align-content: center;
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