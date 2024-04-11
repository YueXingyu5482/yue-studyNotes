#! /user/bin/env node
const { URL } = require("url");
const url = new URL(
  "https://cn.bing.com/search?q=%23+%2fusr%2fbin%2fenv+node&qs=SC&pq=%23!+%2fuser%2fbin%2fenv+node&sc=10-21&cvid=61746547593E4092A1B52E7D7DA68B4B&FORM=QBRE&sp=1&lq=0"
);
console.log(url);
