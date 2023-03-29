// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api", function (req, res) {
  const unix = new Date().getTime();
  const utx = new Date(unix).toUTCString();

  res.json({ unix: unix, utc: utx });
});

app.get("/api/:date", (req, res) => {
  let timeInMill;

  if (new Date(+req.params.date).getTime()) {
    timeInMill = new Date(+req.params.date).getTime();
  } else if (new Date(req.params.date).getTime()) {
    timeInMill = new Date(req.params.date).getTime();
  }

  if (!timeInMill) {
    res.send({ error: "Invalid Date" });
  } else {
    res.send({ unix: timeInMill, utc: new Date(timeInMill).toUTCString() });
  }
});

// listen for requests :)
const port = process.env.PORT;
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
