import { Response, Request, NextFunction } from "express";
import { TABLE_ROOMATE_POSTS, TABLE_USER_DETAIL } from "../utils/constants";
const { getDbObject } = require("../utils/firestoreHelper");
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.name;
    const db = getDbObject();
    const authorization = req.headers.authorization;
    const snapshot = await db
      .collection(TABLE_USER_DETAIL)
      .doc(authorization ?? "")
      .get();
    if (snapshot.exists) {
      next();
    } else {
      res.status(401).json({
        error: new Error("Invalid user id in header"),
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: new Error("Server error try again later"),
    });
  }
};
