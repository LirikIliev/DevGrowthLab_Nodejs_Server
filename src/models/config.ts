export const ERROR_MESSAGES = {
  URL: (field: string) => `Please set correct url for your ${field}.`,
  EMAIL: 'Email address is incorrect!',
  CREATION_DATE: 'The creation date is required!',
  NAME: 'The name is required!',
  TITLE: 'Title is required',
  MIN_LENGTH: (minLength: string) => `Min length is ${minLength} symbols!`,
  PRICE: 'Price must be positive!',
  REQUIRE: (reqValue: string) => `${reqValue} is/are required!`,
};
