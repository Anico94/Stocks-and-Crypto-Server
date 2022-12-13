const userBuilder = require("../controllers/userController");

module.exports = (app) => {
  app.route("/users").post(userBuilder.createUser);

  app.route("/login").post(userBuilder.checkForUser);

  app.route("/users").get(userBuilder.getUser);

  app.route("/users").put(userBuilder.updateWatchlists);

  app
    .route("/users/:userId")
    .put(userBuilder.updateUser)
    .delete(userBuilder.destroyUser);
};
