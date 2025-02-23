import { Router } from 'express';

import fetchingBlogs from '../controllers/blogServices';
import paths from './config';

const router = Router();

router.get(paths.GET_BLOG_POSTS, fetchingBlogs.getAllPosts);
router.get(paths.GET_BLOG_POST_BY_ID, fetchingBlogs.getPostById);
router.post(paths.ADD_BLOG_POST, fetchingBlogs.addNewPost);
router.get(paths.UPDATE_BLOG_POST, fetchingBlogs.updatePost);
router.get(paths.REMOVE_BLOG_POST, fetchingBlogs.removePost);

export default router;
