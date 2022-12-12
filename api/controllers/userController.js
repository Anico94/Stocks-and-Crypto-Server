const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.readUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    watchlists: req.body.watchlists,
  });
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.checkForUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send(err);
    if (!user) {
      return res.json({
        title: "user not found",
        error: "invalid credentials",
      });
    }
    // check for invalid password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({
        title: "login failed",
        error: "invalid credentials",
      });
    }
    //user is valid send web token
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.json({
      title: "Login Successful",
      token: token,
    });
  });
};

exports.getUser = (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.json({
        title: "unauthorised",
      });
    User.findById(decoded.userId, (err, user) => {
      if (err) return res.send(err);
      res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          watchlists: user.watchlists,
        },
      });
    });
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.wordId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.destroyUser = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Word successfully deleted",
      _id: req.params.userId,
    });
  });
};
