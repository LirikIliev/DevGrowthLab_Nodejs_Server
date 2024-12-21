export type MongooseSearchingType = { [key: string | number]: string | number };

export type UserModelDataType = {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type UserLoginDataType = {
  email: string;
  password: string;
};

export type ProductModelDataType = {
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: string;
  admin: string;
};

export type CategoryModelDataType = {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  admin: string;
};
