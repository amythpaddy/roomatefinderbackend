import { Response } from "express";
import { UserModel, UserResponseModel } from "../models/userModels";
import { TABLE_USER_DETAIL } from "../utils/constants";
const { getDbObject } = require("../utils/firestoreHelper");

export async function createUser(
  postBody: UserModel,
  res: Response
): Promise<void> {
  const db = getDbObject();
  const docRef = db.collection(TABLE_USER_DETAIL).doc(postBody.userid);
  try {
    await docRef.set({
      username: postBody.username,
      useremail: postBody.useremail,
      userid: postBody.userid,
      userphone: postBody.userphone ?? "",
      lookingForRoommates: postBody.lookingForRoommates ?? true,
      hasHousing: postBody.hasHousing ?? false,
    });
    res.send({ message: "User created Successfully", code: 200 });
  } catch (ex) {
    res.send({ message: "Error creating user", code: 500 });
  }
}

export async function getUserDetail(
  userid: string
): Promise<UserResponseModel> {
  const userdetail: UserResponseModel = {
    error: true,
    message: "no user data found",
  };

  const db = getDbObject();
  const snapshot = await db.collection(TABLE_USER_DETAIL).doc(userid).get();
  try {
    if (snapshot.exists) {
      userdetail.error = false;
      userdetail.message = "";
      userdetail.data = {
        useremail: snapshot.data().useremail,
        userphone: snapshot.data().userphone,
        userid: snapshot.data().userid,
        username: snapshot.data().username,
        lookingForRoommates: snapshot.data().lookingForRoommates ?? true,
        hasHousing: snapshot.data().hasHousing ?? false,
      };
    }
  } catch (ex) {
    userdetail.message = "error fetching userdata";
  }
  return userdetail;
}

export async function updateUser(postBody: UserModel): Promise<any> {
  const db = getDbObject();
  const docRef = db.collection(TABLE_USER_DETAIL).doc(postBody.userid);
  try {
    await docRef.update({
      username: postBody.username,
      userphone: postBody.userphone ?? "",
      lookingForRoommates: postBody.lookingForRoommates ?? true,
      hasHousing: postBody.hasHousing ?? false,
    });
  } catch (ex) {
    return { message: "Error updating detail", code: 500 };
  }
  return { message: "User Detail Updated", code: 200 };
}
