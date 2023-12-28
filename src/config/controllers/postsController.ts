import { Response, Request } from "express";
import { TABLE_ROOMATE_POSTS } from "../utils/constants";
import { PostModel } from "../models/postModels";
const { getDbObject } = require("../utils/firestoreHelper");
import { getUserDetail } from "./usersController";
import { UserResponseModel } from "../models/userModels";

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

export async function listRoomatePost(res: Response): Promise<any> {
  const snapshot = await db.collection(TABLE_ROOMATE_POSTS).get();
  try {
    var posts: PostModel[] = [];
    await snapshot.forEach((doc: any) => {
      posts.push({
        message: doc.data().message,
        title: doc.data().title,
        userid: doc.data().userid,
      });
    });
    for (var i = 0; i < posts.length; i++) {
      const user: UserResponseModel = await getUserDetail(posts[i].userid);
      posts[i].userdata = user.data;
    }
    // todo: make the map function async
    // posts.map((post) => {
    //   getUserDetail(post.userid).then((user) => {
    //     post.userdata = user.data;
    //   });
    // });
    return posts;
  } catch (ex) {
    res.send("Error");
  }
}
