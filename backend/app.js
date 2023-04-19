require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING ON http://localhost:${process.env.PORT}`);
});
