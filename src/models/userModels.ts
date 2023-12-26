export type UserModel = {
  userid: string;
  username: string;
  useremail: string;
  userphone: string | undefined;
  hasHousing?: boolean;
  lookingForRoommates?: boolean;
};

export type UserResponseModel = {
  error: boolean;
  data?: UserModel;
  message?: string;
};
