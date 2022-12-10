const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.readUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

exports.createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.readUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) res.send(err);
    res.json(user);
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

exports.destroyUser = (res, res) => {
  User.deleteOne({ _id: req.params, userId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Word sccessfully deleted",
      _id: req.params.wordId,
    });
  });
};
