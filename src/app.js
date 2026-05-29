const express = require("express");
const cors = require("cors");

const errorMiddleware =
  require("./middlewares/error.middleware");

const authRoutes =
  require("./routes/auth.routes");

const walletRoutes =
  require("./routes/wallet.routes");

const transactionRoutes =
  require("./routes/transaction.routes");
  const {
  swaggerUi,
  specs
} = require("./config/swagger");
const insightRoutes =
require("./routes/insight.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running"
  });
});

app.use("/api", authRoutes);
app.use("/api", walletRoutes);
app.use("/api", transactionRoutes);
app.use("/api", insightRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use(errorMiddleware);

module.exports = app;