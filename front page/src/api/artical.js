import { apiAddress } from "./apiConfig";

export async function getAllArtical() {
  let respone = await fetch(
    `${apiAddress}/api/article/getAllArticle`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );

  let data = respone.json();

  return data;
}

export async function getArticalNums() {
  let respone = await fetch(
    `${apiAddress}/api/article/getArticalNums`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );

  let data = respone.json();

  return data;
}

export async function getArtical(num, deviation) {
  let respone = await fetch(
    `${apiAddress}/api/article/getArticle/${num}/${deviation}`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );

  let data = respone.json();

  return data;
}

export async function getArticleByID(userID) {
  let respone = await fetch(
    `${apiAddress}/api/article/getArticle/${userID}`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );

  let data = respone.json();

  return data;
}

export async function getArticleTimeLine() {
  let respone = await fetch(`${apiAddress}/api/article/timeline`, {
    headers: {
      "user-agent": "PostmanRuntime/7.29.2",
      "content-type": "application/json",
    },
    method: "get",
  });
  let data = respone.json();
  return data;
}

export async function addVisitorInfo(articleID) {
  let respone = await fetch(
    `${apiAddress}/api/article/addVisitorInfo/${articleID}`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );
  let data = respone.json();
  return data;
}


export async function getRecommendList(articleID) {
  let respone = await fetch(
    `${apiAddress}/api/article/recommendList`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );
  let data = respone.json();
  return data;
}


export async function getVisitorData(){
  let respone = await fetch(
    `${apiAddress}/api/article/visitorData`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );
  let data = respone.json();
  return data;
}

export async function getAllVisitorAmount(){
  let respone = await fetch(
    `${apiAddress}/api/article/getAllVisitorAmount`,
    {
      headers: {
        "user-agent": "PostmanRuntime/7.29.2",
        "content-type": "application/json",
      },
      method: "get",
    }
  );
  let data = respone.json();
  return data;
}