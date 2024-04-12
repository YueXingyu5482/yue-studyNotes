const http = require("http");
const request = http.request(
  "http://jsonplaceholder.typicode.com/todos/1",
  {
    method: "GET",
  },
  (res) => {
    res.on("data", (chunk) => {
      console.log(chunk.toString());
    });
  }
);
// request.write("");
request.end();
