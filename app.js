const express = require("express");
const app = express();

const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`server is running on ${port}`);
});
