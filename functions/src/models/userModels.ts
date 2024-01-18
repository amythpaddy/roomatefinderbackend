export type UserModel = {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  collegeEmail: string;
  userEmail: string;
  userPhone: string | undefined;
  hasHousing?: boolean;
  lookingForRoommates?: boolean;
};

export type UserResponseModel = {
  error: boolean;
  data?: UserModel;
  message?: string;
};
