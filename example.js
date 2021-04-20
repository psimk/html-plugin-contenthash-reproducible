const { add } = require("./add.js");
var h1 = document.createElement("h1");
h1.innerHTML = `1 + 2 is ${add(1, 2)}`;
document.body.appendChild(h1);
