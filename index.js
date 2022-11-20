const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT ? process.env.PORT : 3001;
const fs = require("fs");
const path = require("path");
const { renderFullEmail, fetchSearchFeed } = require("./email.service");
const cors = require("cors");
app.use(cors());

app.get("/v1/email/:template", async (req, res) => {
  let email;
  try {
    let css = fs.readFileSync(
      path.join(__dirname, "./templates/email.css"),
      "utf-8"
    );
    let html = fs.readFileSync(
      path.join(__dirname, `./templates/${req.params.template}.html`),
      "utf-8"
    );
    let data;
    let {
      searchFeedId,
      token,
      environment = "https://research.alpha-sense.com",
      json,
    } = req.query;

    if (searchFeedId && token) {
      data = await fetchSearchFeed({ searchFeedId, token, environment });

      // QUESTION : What exactly are these searchFeedId, token
    }

    if (json) {
      json = fs.readFileSync(path.join(__dirname, `./data/${json}`), "utf-8");

      json = JSON.parse(json);
      data = json;
      console.log("If json ke andar sab thik hai");
    }

    email = await renderFullEmail({
      html,
      css,
      data: data,
    });
    res.send(email);
  } catch (e) {
    console.log(e);
    console.log("Yaha se bol raha hu mai");
    res.status(500).json(e);
  }
});

app.post("/v1/email/:template", async (req, res) => {
  let email;
  try {
    let css = fs.readFileSync(
      path.join(__dirname, "./templates/email.css"),
      "utf-8"
    );
    let html = fs.readFileSync(
      path.join(__dirname, `./templates/${req.params.template}.html`),
      "utf-8"
    );
    let data;
    let json;
    let {
      searchFeedId,
      token,
      environment = "https://research.alpha-sense.com",
      // json,
      // customFile,
    } = req.query;

    json = req.body;

    data = json;

    console.log("Custom data le rahe apan, and the data is here, ", data);

    email = await renderFullEmail({
      html,
      css,
      data: data,
    });
    res.status(200).send(email);
  } catch (e) {
    console.log(e);
    console.log("Yaha se bol raha hu mai");
    res.status(500).json(e);
  }
});

if ("test" !== process.env.NODE_ENV) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}
