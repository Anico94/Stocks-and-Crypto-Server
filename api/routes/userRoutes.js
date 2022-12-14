const userBuilder = require("../controllers/userController");

module.exports = (app) => {
  app.route("/users").post(userBuilder.createUser);
  app.route("/login").post(userBuilder.checkForUser);
  app.route("/users").get(userBuilder.getUser);

  app.route("/users/watchlist").get(userBuilder.getHolding);
  app.route("/users/watchlist").put(userBuilder.updateHolding);
  app.route("/users/watchlist").post(userBuilder.addHolding);
  app.route("/users/watchlist").delete(userBuilder.deleteHolding);

  // app
  //   .route("/users/:userId")
  //   .put(userBuilder.updateUser)
  //   .delete(userBuilder.destroyUser);
};
