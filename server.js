const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

global.Login = require("./api/models/loginModel");
const routes = require("./api/routes/loginRoutes");

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://user:${process.env.MONGOPW}@stockscrypto.rgbsjxm.mongodb.net/?retryWrites=true&w=majority`
);

const app = express();
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
