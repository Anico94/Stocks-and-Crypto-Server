const userBuilder = require("../controllers/userController");

module.exports = (app) => {
  app.route("/users").get(userBuilder.readUsers).post(userBuilder.createUser);

  app
    .route("/users/:userId")
    .get(userBuilder.readUser)
    .put(userBuilder.updateUser)
    .delete(userBuilder.destroyUser);
};
