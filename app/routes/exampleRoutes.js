const exampleController = require("../controllers/exampleController");
// const { default: axios } = require("axios");
const verify = require("../middleware/exampleMiddleware");
const router = require("express").Router();

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/login', exampleController.login)
  
  app.use(verify.exampleMiddlewareFunction)
  app.get("/getSurvey", verify.authentication, exampleController.refactoreMe1);
  app.post('/postSurvey', exampleController.refactoreMe2)

  app.get('/webSocket', exampleController.callmeWebSocket)
  app.get('/webSocketattacks', exampleController.getData)

  // router.get("/data", exampleController.refactoreMe1);

  // router.get(
  //   "/",
  //   [exampleMiddleware.exampleMiddleware],
  //   exampleController.exampleFunction
  // );

  // router.get(
  //   "/",
  //   [exampleMiddleware.exampleMiddleware],
  //   exampleController.exampleFunction
  // );

  app.use("/api/data", router);
};
