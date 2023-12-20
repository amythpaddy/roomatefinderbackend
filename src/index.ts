import express, { Express } from "express";
import dotenv from "dotenv";
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app: Express = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
require("./routes/v1/routes")(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[server]: Server --- running at http://localhost:${port}`);
});
