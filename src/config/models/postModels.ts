import { UserModel } from "./userModels";

export type PostModel = {
  userdata?: UserModel;
  userid: string;
  title: string;
  message: string;
};
