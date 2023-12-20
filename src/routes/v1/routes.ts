import express, { Express, Request, Response } from "express";
const {
  putData,
  createRoomatePost,
  listRoomatePost,
} = require("../../controllers/postsController");
const { createUser } = require("../../controllers/usersController");

module.exports = function (app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.post("/v1/createPost", (req: Request, res: Response) => {
    createRoomatePost(req.body, res);
  });

  app.get("/v1/allPost", (req: Request, res: Response) => {
    listRoomatePost(res);
  });

  app.post("/v1/createUser", (req: Request, res: Response) => {
    createUser(req.body, res);
  });
};
