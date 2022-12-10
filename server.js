const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

global.Login = require("./api/models/userModel");
const routesUser = require("./api/routes/userRoutes");

routesUser(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://user:${process.env.MONGOPW}@stockscrypto.rgbsjxm.mongodb.net/?retryWrites=true&w=majority`
);

const app = express();
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
