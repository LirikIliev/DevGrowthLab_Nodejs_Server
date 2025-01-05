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
  GET_BANNERS: '/public/banners',
  ADD_BANNER: '/private/add-new-banner/',
  REMOVE_BANNER: '/private/:bannerId/remove-banner',
  GET_BRANDS: '/public/brands',
  ADD_BRAND: '/private/add-new-brand',
  REMOVE_BRAND: '/private/:brandId/remove-brand',
  GET_BLOG_POSTS: '/public/blog-posts',
  ADD_BLOG_POST: '/private/add-new-blog-post',
  REMOVE_BLOG_POST: '/private/:postId/remove-blog-post',
};

export default paths;
