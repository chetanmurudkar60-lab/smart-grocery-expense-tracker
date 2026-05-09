const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const groceryRoutes = require("./routes/groceryRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));