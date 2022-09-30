import { apiAddress } from "./apiConfig";

export async function getCurrentArticalComment(blogID) {
    let respone = await fetch(
      `${apiAddress}/api/comment/${blogID}`,
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