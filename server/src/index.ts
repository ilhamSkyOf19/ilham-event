// initialization dotenv
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import authRoute from "./routes/auth.route";

// initialization express
const app = express();

// initialization port
const port = process.env.PORT || 3001;

// initialization body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth route
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
