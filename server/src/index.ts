// initialization dotenv
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import authRoute from "./routes/auth.route";
import connect from "./utils/db";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import docs from "./docs/route";
import path from "path";

async function initializeDB() {
  try {
    // connect
    const db = await connect();

    // cek db
    console.log(db);

    // initialization express
    const app = express();

    // cors
    app.use(cors());

    // initialization port
    const port = process.env.PORT || 3001;

    // cookie parser
    app.use(cookieParser());

    // initialization body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, "../public")));

    // test
    app.get("/", (_req, res) => {
      res.send("Hello World!");
    });

    // auth route
    app.use("/api", authRoute);

    // docs
    docs(app);

    // initialize error middleware
    app.use(errorMiddleware);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    // error
    console.log(error);
  }
}

// initialize
initializeDB();
