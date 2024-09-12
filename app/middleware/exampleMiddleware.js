const { verifyToken } = require("../helpers/jwt");
const db = require("../models");
// const model = db.model;

exampleMiddlewareFunction = async (req, res, next) => {
  // do something
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw "Login First";
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      throw "Login First";
    }

    const { id } = verifyToken(token);

    const user = await db.user.findByPk(id);
    if (!user) {
      throw "Login First";
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      success: false,
      message: "Login first",
    });
  }
};

authentication = async (req, res, next) => {
  try {
    if (req.user.workType === "WFH") {
      throw "Forbiden on WFH";
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

const verify = {
  exampleMiddlewareFunction: exampleMiddlewareFunction,
  authentication: authentication,
};

module.exports = verify;
