export type UserModel = {
  userId: string;
  userEmail: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  collegeEmail?: string;
  userPhone?: string;
  userAge?: number;
  gender?: string;
  college?: string;
  major?: string;
  race?: string;
  distanceFromCollege?: string;
  havePet?: boolean;
  smoking?: boolean;
  countryOfOrigin?: string;
  availabilityDate?: string;
  haveHousing?: boolean;
  lookingForRoommates?: boolean;
};

export type UserResponseModel = {
  error: boolean;
  data?: UserModel;
  message?: string;
};
