// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER_NAME,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: process.env.DIALECT || "mysql",
//     logging: false,
//   }
  
// );

// (async () => {
//   try {
//     await sequelize.authenticate(); 
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// module.exports = sequelize;





const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // DB ka naam
  process.env.DB_USER,       // DB user
  process.env.DB_PASS,       // DB password
  {
    host: process.env.DB_HOST,  // DB host
    port: process.env.DB_PORT,  // DB port
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

