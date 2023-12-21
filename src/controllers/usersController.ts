import { Response } from "express";
import { UserModel, UserResponseModel } from "../models/userModels";
const { getDbObject } = require("../utils/firestoreHelper");

export async function createUser(
  postBody: UserModel,
  res: Response
): Promise<void> {
  const db = getDbObject();
  const docRef = db.collection("user_detail").doc(postBody.userid);
  try {
    await docRef.set({
      username: postBody.username,
      useremail: postBody.useremail,
      userid: postBody.userid,
      userphone: postBody.userphone ?? "",
    });
    res.send({ message: "User created Successfully", code: 200 });
  } catch (ex) {
    res.send({ message: "Error creating user", code: 500 });
  }
}

export async function getUserDetail(
  postBody: UserModel,
  res: Response
): Promise<void> {
  const db = getDbObject();
  const snapshot = await db
    .collection("user_detail")
    .doc(postBody.userid)
    .get();
  try {
    var userdetail: UserResponseModel = {
      error: true,
      message: "no user data found",
    };
    if (snapshot.exists) {
      userdetail = {
        error: false,
        message: "",
        data: {
          useremail: snapshot.data().useremail,
          userphone: snapshot.data().userphone,
          userid: snapshot.data().userid,
          username: snapshot.data().username,
        },
      };
    }
    res.send(userdetail);
  } catch (ex) {
    res.send("Error");
  }
}
