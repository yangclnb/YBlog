export async function getAbout() {
    let respone = await fetch(
      `http://127.0.0.1:3085/api/about`,
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