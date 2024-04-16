const getApiResult = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos/");
};
const m1 = () => {
  return getApiResult();
};
const m2 = () => {
  return m1();
};
function main() {
  const jieguo = m2();
  console.log(jieguo, "-----jieguo");
}
// main();
// 处理异步函数的传染
// 正常执行函数，将函数的结果进行缓存
function run(fun) {
  const result = {
    status: "pending",
    data: "",
    errMessage: "",
  };
  const _originFetch = window.fetch;
  window.fetch = (...arg) => {
    if (result.status === "fulfilled") {
      return result.data;
    } else if (result.status === "rejected") return result.errMessage;
    const prom = _originFetch(...arg)
      .then((resp) => resp.json())
      .then(
        (res) => {
          result.status = "fulfilled";
          result.data = res;
        },
        (err) => {
          result.status = "rejected";
          result.errMessage = err;
        }
      );
    throw prom;
  };
  try {
    fun();
  } catch (err) {
    if (err instanceof Promise) {
      err.then(
        () => {
          console.log("promis 成功了");
          fun();
        },
        () => {
          console.log("promis 失败了");

          fun();
        }
      );
    }
  }
}
run(main);
// main();
