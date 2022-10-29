import { getAllArtical, getArticalNums } from "../api/artical.js";

/**
 * @function addCache
 * @description:
 * @param {*} cacheName 要添加的缓存名
 * @param {*} data 要缓存的内容
 * @return {*}
 * @author: Banana
 */
function addCache(cacheName, data) {
  let localData = localStorage.getItem(cacheName);
  if (localData == null) {
    localStorage.setItem(cacheName, data);
  } else {
    for (const item of data) {
      // 缓存中不存在该元素则添加进入缓存中
      !localData.includes(data) && data.push(item);
    }
  }
}

/**
 * @function getCache
 * @description: 读取缓存的信息
 * @param {*} cacheName
 * @return {*}
 * @author: Banana
 */
function getCache(cacheName) {
  return localStorage.getItem(cacheName);
}

/**
 * @function addArticleCache
 * @description: 判断本地数据与服务器数据数量是否一致，若不一致将请求服务器将最新的所有的文章放入缓存中
 * @return {void}
 * @author: Banana
 */
export function addArticleCache() {
  // 缓存中不存在 blogData 则直接添加
  if (localStorage.getItem("blogData") === null) {
    getAllArtical().then((results) => {
      // console.log(JSON.stringify(results.data));
      let newArr = results.data;
      newArr.sort((a, b) => a.blogId - b.blogId);

      localStorage.setItem("blogData", JSON.stringify(newArr));
    });
    return;
  }

  getArticalNums().then((results) => {
    // 存在则向服务器中查询文章的数量 与本地的数量对比
    const currentNums = JSON.parse(localStorage.getItem("blogData")).length;
    const blogNums = results.data[0].nums;
    // console.log("currentNums,blogNums :>> ", currentNums, blogNums);
    if (currentNums != blogNums) {
      console.log("更新博客缓存");
      getAllArtical().then((results) => {
        // console.log(JSON.stringify(results.data));
        let newArr = results.data;
        newArr.sort((a, b) => a.blogId - b.blogId);
        localStorage.setItem("blogData", JSON.stringify(newArr));
      });
    } else {
      console.log("当前缓存为最新状态");
    }
  });
}

/**
 * @function getBlogList
 * @description: 获取博客列表，读取到数据返回当前范围内的数据，否则返回null
 * @param {*} start 起始列表索引
 * @param {*} step 返回的博客数量
 * @return {Array}
 * @author: Banana
 */
export function getBlogList(start, step) {
  // 页面首次加载时，获取缓存的请求几乎都会优先于写入数据到缓存，若缓存无数据直接返回空数组
  let blogCatch = JSON.parse(localStorage.getItem("blogData"))?.reverse() || [];
  let currentStep = 0;
  let newArr = [];

  for (let i = start; i < blogCatch.length; i++) {
    if (step == currentStep) break;
    newArr[currentStep] = blogCatch[i];
    currentStep++;
  }
  return newArr;
}

/**
 * @function getAllBlog
 * @description: 返回所有的博客
 * @return {Array} blogCache 若缓存中没数据返回空列表
 * @author: Banana
 */
export function getAllBlog() {
  // 页面首次加载时，获取缓存的请求几乎都会优先于写入数据到缓存，若缓存无数据直接返回空数组
  let blogCatch = JSON.parse(localStorage.getItem("blogData"))?.reverse() || [];
  return blogCatch;
}

/**
 * @function getBlogById
 * @description: 根据博客ID返回当前博客内容
 * @param {*} blogID 需要读取的博客ID
 * @return {Object} 返回读取到的对象，若如无数据返回null
 * @author: Banana
 */
export function getBlogByCache(blogID) {
  let blogCatch = JSON.parse(localStorage.getItem("blogData")) || [];

  for (let item of blogCatch) {
    if (item.blogId == blogID) return item;
  }

  return null;
}
