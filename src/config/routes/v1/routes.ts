import express, { Express, Request, Response } from "express";
import { getUserDetail, updateUser } from "../../controllers/usersController";
import { auth } from "../../middlewares/auth";
import {
  createRoomatePost,
  listRoomatePost,
} from "../../controllers/postsController";
import { createUser } from "../../controllers/usersController";

module.exports = function (app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("All Okay");
  });

  app.post("/v1/createPost", auth, (req: Request, res: Response) => {
    createRoomatePost(req, res);
  });

  app.get("/v1/allPost", (req: Request, res: Response) => {
    listRoomatePost(res).then((val) => {
      res.send(val);
    });
  });

  app.post("/v1/createUser", (req: Request, res: Response) => {
    createUser(req.body, res);
  });

  app.post("/v1/getUserDetail", (req: Request, res: Response) => {
    getUserDetail(req.body.userid).then((value) => {
      res.send(value);
    });
  });

  app.put("/v1/updateUserDetail", auth, (req: Request, res: Response) => {
    updateUser(req.body).then((value) => {
      res.send(value);
    });
  });
};
