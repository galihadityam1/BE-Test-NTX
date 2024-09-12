const db = require("../models");
const axios = require("axios");
const WebSocket = require("ws");
const { signToken } = require("../helpers/jwt");
// const redis = require("../config/redis");
// const Model = db.Model;
// const { Op } = require("sequelize");

exports.refactoreMe1 = async (req, res) => {
  try {
    const [data] = await db.sequelize.query('SELECT values FROM "Surveys"');

    const result = data.map((item) =>
      item.values.reduce((acc, value) => acc + value / item.values.length, 0)
    );

    res.status(200).send({
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      success: false,
      message: "Failed to retrieve survey data.",
    });
  }
};

exports.refactoreMe2 = async (req, res) => {
  let { values } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    // Insert new survey using raw query
    const userId = req.user.id;
    values = JSON.parse(values);
    const formattedValues = `{${values.join(",")}}`;
    const currentTime = new Date().toISOString();

    await db.sequelize.query(
      `INSERT INTO "Surveys" ("userId", "values", "createdAt", "updatedAt") VALUES ('${userId}', '${formattedValues}', '${currentTime}', '${currentTime}')`,
      {
        replacements: { userId, values: formattedValues },
        transaction,
      }
    );

    await db.sequelize.query(
      `UPDATE "Users" SET dosurvey = true, "updatedAt" = '${currentTime}' WHERE id = ${userId}`,
      {
        replacements: { userId },
        transaction,
      }
    );

    let data = await transaction.commit();

    res.status(201).send({
      statusCode: 201,
      message: "Survey sent successfully!",
      success: true,
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: "Cannot post survey.",
      success: false,
    });
  }
};

exports.callmeWebSocket = (req, res) => {
  const fetchData = () => {
    axios
      .get("https://livethreatmap.radware.com/api/map/attacks?limit=10")
      .then((response) => {
        const data = response.data;
        // Process and send the data over WebSocket
        res.status(200).json({ success: true, data });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Error fetching data" });
      });
  };

  fetchData();
  setInterval(fetchData, 180000);
};

exports.getData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://livethreatmap.radware.com/api/map/attacks?limit=10"
    );
    const data = response.data;

    const countriesData = data[0].map((attack) => ({
      destination: attack.destinationCountry,
      source: attack.sourceCountry,
    }));

    const currentTime = new Date().toISOString();

    for (const country of countriesData) {
      await db.sequelize.query(
        `INSERT INTO "Attacks" ("destinationCountry", "sourceCountry","createdAt", "updatedAt") VALUES ('${country.destination}', '${country.source}', '${currentTime}', '${currentTime}')`,
        {
          replacements: {
            destination: country.destination,
            source: country.source,
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        label: countriesData.map((c) => c.source),
        total: countriesData.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
};

exports.login = async (req, res) => {
  const { digits } = req.body;
  try {
    if (!digits) {
      throw "Digits required";
    }

    const user = await db.user.findOne({
      where: { digits },
    });

    const payload = {
      id: user.id,
    };

    const token = signToken(payload);

    await db.user.update(
      {
        isLogin: true,
        updatedAt: new Date().toISOString,
      },
      {
        where: { id: user.id },
      }
    );

    res.status(200).send({
      message: "login success",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      success: false,
      message: "Failed to login.",
    });
  }
};
