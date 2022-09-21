<template>
  <div id="content">
    <div class="classBox">
      <div class="classTitle">
        <h4>算法</h4>
        <span>2</span>
      </div>
      <ul>
        <li>test1</li>
        <li>test2</li>
      </ul>
    </div>
    <div class="classBox">
      <div class="classTitle">
        <h4>算法</h4>
        <span>1</span>
      </div>
      <ul>
        <li>test1</li>
        <li>test2</li>
      </ul>
    </div>
    <div class="classBox">
      <div class="classTitle">
        <h4>算法</h4>
        <span>3</span>
      </div>
      <ul>
        <li>test1</li>
        <li>test2</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
#content {
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  // background-color: aqua;

  // animation ----------------------------
  .dispalyFriendChain(@name) {
    @keyframes @name {
      0% {
        transform: translateY(400px);
        opacity:0;
      }
      100% {
        transform: translateY(0px);
        opacity:1;
      }
    }
  }

  .dispalyFriendChain(testDisplayFriendChain);

  .animation(@animation-name,@animation-duration) {
    animation: @arguments;
  }

  .animation(testDisplayFriendChain,1s);

  // animation ----------------------------

  .classBox {
    width: 45%;
    margin: 10px;

    // background-color: antiquewhite;
    border: 1px solid var(--secondaryFontColor);
    border-radius: 10px;

    .classTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      border-bottom: 1px solid var(--secondaryFontColor);
      span {
        color: white;
        display: inline-block;
        background-color: var(--themeColor);
        border-radius: 10px;
        padding: 1px 5px;
      }
    }

    ul {
      li {
        transition: 0.5s all;
        padding: 5px 10px;
        &:hover {
          background-color: #e7eaf0;
        }
      }
    }

    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
}
</style>