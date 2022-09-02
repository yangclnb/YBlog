export async function getArtical(num, deviation) {
  let respone = await fetch(
    `http://127.0.0.1:3085/api/article/${num}/${deviation}`,
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

export async function getArticleByID(userID){
  let respone = await fetch(
    `http://127.0.0.1:3085/api/article/${userID}`,
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
