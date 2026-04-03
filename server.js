const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes"); 
const userRoutes = require("./routes/userRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/financeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});