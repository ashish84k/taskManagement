const express = require("express");
const authRouter = require("./routers/authRouter");
const TaskRouter = require("./routers/TaskRouter");
const UserRouter = require("./routers/UserRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Sequelize = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const { authenticate, recreateToken } = require("./middleware/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173","https://taskmanagement-production-ec54.up.railway.app", "https://task-management-olive-six.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await Sequelize.sync({ force: false });
    console.log("Database synced successfully");

    app.use("/auth", recreateToken, authRouter);
    app.use("/api/task", recreateToken, TaskRouter);
    app.use("/api/users", recreateToken, UserRouter);

    app.get("/", (req, res) => {
      res.send("Backend is working 🚀");
    });

    app.get("/verify", authenticate(), (req, res) => {
      const user = req?.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          user: null,
          message: "Profile access denied: unauthorized access",
        });
      }

      res.status(200).json({ success: true, user });
    });

    app.all(/.*/, (req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
      });
    });

    app.use(errorHandler);

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Server start failed:", err);
  }
}

startServer();
