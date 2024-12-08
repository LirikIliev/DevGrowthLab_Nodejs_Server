export type ProductQueryType = { productId: string };

export interface ProductInterface {
  id: string;
  type: string;
  name: string;
  price: Number;
}

export interface UserInterface {
  id: string;
  email: string;
  password: string;
}

export interface UserRequestInterface {
  email: string;
  password: string;
}
