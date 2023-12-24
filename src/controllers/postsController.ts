import { Response, Request } from "express";
import { TABLE_ROOMATE_POSTS } from "../utils/constants";
import { PostModel } from "../models/postModels";
const { getDbObject } = require("../utils/firestoreHelper");

const db = getDbObject();

export async function createRoomatePost(
  req: Request,
  res: Response
): Promise<void> {
  const docRef = db.collection(TABLE_ROOMATE_POSTS).doc("" + Date.now());

  try {
    await docRef.set({
      message: req.body!.message,
      title: req.body!.title,
      userid: req.headers.authorization,
    });
    res.send({ message: "Post created Successfully..." });
  } catch (ex) {
    res.send("Error");
  }
}

export async function listRoomatePost(res: Response): Promise<void> {
  const snapshot = await db.collection(TABLE_ROOMATE_POSTS).get();
  try {
    var posts: PostModel[] = [];
    snapshot.forEach((doc: any) => {
      // getUserData(doc.data().userid);
      posts.push({
        message: doc.data().message,
        title: doc.data().title,
        userid: doc.data().userid,
      });
      console.log(doc.id, "=>", doc.data());
    });
    res.send(posts);
  } catch (ex) {
    res.send("Error");
  }
}
