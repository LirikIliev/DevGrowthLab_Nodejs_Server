const paths = {
  LOGIN: '/public/auth/login',
  REGISTER: '/public/auth/registration',
  GET_CATEGORIES: '/public/list-of-categories',
  GET_CATEGORY: '/public/:categoryId/category',
  ADD_CATEGORY: '/private/add-new-category',
  UPDATE_CATEGORY: '/private/:categoryId/update-category',
  REMOVE_CATEGORY: '/private/:categoryId/remove-category',
  GET_PRODUCTS: '/public/list-of-products',
  GET_PRODUCT: '/public/:productId/product-info',
  GET_PRODUCT_BY_CATEGORY: '/public/products-by-category/:categoryId',
  GET_PRODUCT_BY_TYPE_NAME: '/public/products-by-type-name/:typeName',
  ADD_PRODUCT: '/private/add-new-product',
  UPDATE_PRODUCT: '/private/:productId/update-product',
  REMOVE_PRODUCT: '/private/:productId/remove-product',
  GET_BANNERS: '/public/banners',
  ADD_BANNER: '/private/add-new-banner/',
  UPDATE_BANNER: '/private/:bannerId/update-banner',
  REMOVE_BANNER: '/private/:bannerId/remove-banner',
  GET_BRANDS: '/public/brands',
  ADD_BRAND: '/private/add-new-brand',
  UPDATE_BRAND: '/private/:brandId/update-brand',
  REMOVE_BRAND: '/private/:brandId/remove-brand',
  GET_BLOG_POSTS: '/public/blog-posts',
  GET_BLOG_POST_BY_ID: '/public/blog-post/:postId',
  ADD_BLOG_POST: '/private/add-new-blog-post',
  UPDATE_BLOG_POST: '/private/:postId/update-blog-post',
  REMOVE_BLOG_POST: '/private/:postId/remove-blog-post',
};

export default paths;
