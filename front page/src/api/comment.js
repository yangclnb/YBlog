import { apiAddress } from "./apiConfig";

export async function getCurrentArticalComment(blogID) {
  let respone = await fetch(`${apiAddress}/api/comment/${blogID}`, {
    headers: {
      "user-agent": "PostmanRuntime/7.29.2",
      "content-type": "application/json",
    },
    method: "get",
  });

  let data = respone.json();

  return data;
}

export async function releaseComment(blogID, userName, userBlog, comment) {
  let respone = await fetch(`${apiAddress}/api/comment`, {
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    },
    body: `blogId=${blogID}&userName=${userName}&userBlog=${userBlog}&comment=${comment}`,
    method: "post",
  });

  let data = respone.json();

  return data;
}
