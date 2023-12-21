export type UserModel = {
  userid: string;
  username: string;
  useremail: string;
  userphone: string | undefined;
};

export type UserResponseModel = {
  error: boolean;
  data?: UserModel;
  message?: string;
};
