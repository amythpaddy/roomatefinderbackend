import { Response } from "express";
const { getDbObject } = require("../utils/firestoreHelper");

const db = getDbObject();

async function createRoomatePost(postBody: any, res: Response): Promise<void> {
  const docRef = db.collection("roomate_listing").doc("" + Date.now());
  try {
    await docRef.set({
      post: postBody.post_title,
    });
    res.send({ message: "Post created Successfully..." });
  } catch (ex) {
    res.send("Error");
  }
}

async function listRoomatePost(res: Response): Promise<void> {
  const snapshot = await db.collection("roomate_listing").get();
  try {
    var posts: any = [];
    snapshot.forEach((doc: any) => {
      posts.push({ id: doc.id, data: doc.data().post });
      console.log(doc.id, "=>", doc.data());
    });
    res.send(posts);
  } catch (ex) {
    res.send("Error");
  }
}

module.exports = { listRoomatePost, createRoomatePost };
