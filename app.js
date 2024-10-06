const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const fs = require("fs/promises");
// const dataFile = require("./data.json");

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const reqBody = req.body;
  if (
    !reqBody.email ||
    reqBody.email == "" ||
    !reqBody.password ||
    reqBody.password == ""
  ) {
    res.send({ message: "CREDENTIALS_NOT_FOUND" });
    return;
  }
  console.log(req.body);
  const data = JSON.parse(await fs.readFile("data.json", "utf8"));
  const users = data.users;
  if (users.length > 0) {
    const user = users.find(
      (el) => el.email == reqBody.email && el.password == reqBody.password
    );
    if (!user) {
      res.send({ message: "USER_NOT_FOUND" });
      return;
    }
    res.send({ message: "ACCESS_APPROVED" });
    return;
  } else {
    res.send({ message: "USER_NOT_FOUND" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
