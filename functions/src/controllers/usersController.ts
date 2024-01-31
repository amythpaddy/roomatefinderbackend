import { Response } from "express";
import { UserModel, UserResponseModel } from "../models/userModels";
import { TABLE_USER_DETAIL } from "../utils/constants";
const { getDbObject } = require("../utils/firestoreHelper");

export async function createUser(
  postBody: UserModel,
  res: Response
): Promise<void> {
  const db = getDbObject();
  const docRef = db.collection(TABLE_USER_DETAIL).doc(postBody.userId);
  try {
    await docRef.set({
      firstName: postBody.firstName,
      middleName: postBody.middleName ?? "",
      lastName: postBody.lastName,
      collegeEmail: postBody.collegeEmail,
      userEmail: postBody.userEmail,
      userId: postBody.userId,
      userPhone: postBody.userPhone ?? "",
      lookingForRoommates: postBody.lookingForRoommates ?? true,
      haveHousing: postBody.haveHousing ?? false,
    });
    res.send({
      message: "User created Successfully",
      code: 200,
    });
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
        userEmail: snapshot.data().userEmail,
        userPhone: snapshot.data().userPhone,
        userId: snapshot.data().userId ?? snapshot.data().userid,
        firstName: snapshot.data().firstName,
        middleName: snapshot.data().middleName ?? "",
        lastName: snapshot.data().lastName,
        collegeEmail: snapshot.data().collegeEmail,
        lookingForRoommates: snapshot.data().lookingForRoommates ?? true,
        haveHousing: snapshot.data().hasHousing ?? false,
      };
    }
  } catch (ex) {
    userdetail.message = "error fetching userdata";
  }
  return userdetail;
}

export async function updateUser(postBody: UserModel): Promise<any> {
  const db = getDbObject();
  const docRef = db.collection(TABLE_USER_DETAIL).doc(postBody.userId);
  try {
    await docRef.update({
      firstName: postBody.firstName,
      middleName: postBody.middleName,
      lastName: postBody.lastName,
      userphone: postBody.userPhone ?? "",
      lookingForRoommates: postBody.lookingForRoommates ?? true,
      haveHousing: postBody.haveHousing ?? false,
    });
  } catch (ex) {
    return { message: "Error updating detail", code: 500 };
  }
  return { message: "User Detail Updated", code: 200 };
}

export async function getUserProfile(
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
        userEmail: snapshot.data().userEmail,
        userPhone: snapshot.data().userPhone,
        userId: snapshot.data().userId ?? snapshot.data().userid,
        firstName: snapshot.data().firstName,
        middleName: snapshot.data().middleName ?? "",
        lastName: snapshot.data().lastName,
        collegeEmail: snapshot.data().collegeEmail,
        lookingForRoommates: snapshot.data().lookingForRoommates ?? true,
        haveHousing: snapshot.data().hasHousing ?? false,
        availabilityDate: snapshot.data().availabilityDate,
        college: snapshot.data().college,
        countryOfOrigin: snapshot.data().countryOfOrigin,
        distanceFromCollege: snapshot.data().distanceFromCollege,
        gender: snapshot.data().gender,
        havePet: snapshot.data().havePet,
        major: snapshot.data().major,
        race: snapshot.data().race,
        smoking: snapshot.data().smoking,
        userAge: snapshot.data().userAge,
      };
    }
  } catch (ex) {
    userdetail.message = "error fetching userdata";
  }
  return userdetail;
}
