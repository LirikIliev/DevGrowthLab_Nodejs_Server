const paths = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/registration',
  GET_CATEGORIES: '/public/list-of-categories',
  GET_CATEGORY: '/public/:categoryId/category',
  ADD_CATEGORY: '/private/add-new-category',
  UPDATE_CATEGORY: '/private/:categoryId/update-category',
  REMOVE_CATEGORY: '/private/:categoryId/remove-category',
  GET_PRODUCTS: '/public/list-of-products',
  GET_PRODUCT: '/public/:productId/product-info',
  ADD_PRODUCT: '/private/:productId/add-new-product',
  UPDATE_PRODUCT: '/private/:productId/update-product',
  REMOVE_PRODUCT: '/private/:productId/remove-product',
};

export default paths;
