const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
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

exports.getHolding = (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        title: "unauthorised",
      });
    }
    User.findById(decoded.userId, (err, user) => {
      if (err) return res.send(err);
      res.json({
        user: {
          watchlists: user.watchlists[req.headers.index],
        },
      });
    });
  });
};

exports.addHolding = (req, res) => {
  let token = req.body.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        title: "unauthorised",
      });
    }
    User.findByIdAndUpdate(
      decoded.userId,
      { watchlists: [...req.body.currentWatchlists, req.body.stock] },
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        res.json(user);
      }
    );
  });
};

exports.updateHolding = (req, res) => {
  let token = req.body.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        title: "unauthorised",
      });
    }
    const current = req.body.headers.holdings;
    current[req.body.headers.index] = req.body.headers.holding;
    console.log(req.body.headers.holding);
    console.log(req.body.headers.holdings);
    console.log(req.body.headers.index);
    User.findByIdAndUpdate(
      decoded.userId,
      { watchlists: current },
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        res.json(user);
      }
    );
  });
};

exports.deleteHolding = (req, res) => {
  console.log(req);
  console.log(req.headers.index);
  console.log(req.headers.currentwatchlists);
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({
        title: "unauthorised",
      });
    }

    User.findByIdAndUpdate(
      decoded.userId,
      {
        watchlists: JSON.parse(req.headers.currentwatchlists).filter(
          (value, index, item) => index != req.headers.index
        ),
      },
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        res.json(user);
      }
    );
  });
};

// exports.requestNews = async (req, res) => {
//   const APIKEY = process.env.NODE_APP_API_KEY;
//   const stockCode = "AMZN";
//   console.log(APIKEY);
//   const URL = `https://api.marketaux.com/v1/news/all?symbols=${stockCode}&filter_entities=true&language=en&api_token=${APIKEY}`;
//   const response = await axios.get(URL);
//   res.json("response");
//   console.log(response);
// };

// exports.readUsers = (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) res.send(err);
//     res.json(users);
//   });
// };

// exports.updateUser = (req, res) => {
//   User.findOneAndUpdate(
//     { _id: req.params.userId },
//     req.body,
//     { new: true },
//     (err, user) => {
//       if (err) res.send(err);
//       res.json(user);
//     }
//   );
// };

// exports.destroyUser = (req, res) => {
//   User.deleteOne({ _id: req.params.userId }, (err) => {
//     if (err) res.send(err);
//     res.json({
//       message: "User successfully deleted",
//       _id: req.params.userId,
//     });
//   });
// };
