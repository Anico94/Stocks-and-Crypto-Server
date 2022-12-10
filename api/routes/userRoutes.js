const userBuilder = require("../controllers/userController");

module.exports = (app) => {
  app.route("/user").get(userBuilder.readUsers).post(userBuilder.createUser);

  app
    .route("/user/:userId")
    .get(userBuilder.readUser)
    .put(userBuilder.updateUser)
    .delete(userBuilder.destroyUser);
};
