import { Response } from "express";
import { createUserModel } from "../models/userModels";
const { getDbObject } = require("../utils/firestoreHelper");

export async function createUser(
  postBody: createUserModel,
  res: Response
): Promise<void> {
  const db = getDbObject();
  const docRef = db.collection("user_detail").doc(postBody.userid);
  try {
    await docRef.set({
      name: postBody.username,
      email: postBody.useremail,
      userid: postBody.userid,
      phone: postBody.userphone ?? "",
    });
    res.send({ message: "User created Successfully", code: 200 });
  } catch (ex) {
    res.send({ message: "Error creating user", code: 500 });
  }
}
