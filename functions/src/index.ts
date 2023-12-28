/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
const functions = require("firebase-functions");
import { Express } from "express";
const express = require("express");
// import dotenv from "dotenv";
const cors = require("cors");
const bodyParser = require("body-parser");

// dotenv.config();
const app: Express = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
require("./routes/v1/routes")(app);

// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`[server]: Server --- running at http://localhost:${port}`);
// });

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

exports.app = functions.https.onRequest(app);
