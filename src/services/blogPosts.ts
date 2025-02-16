import BlogPost from '../models/blogPost';
import { BlogPostModelDataType, MongooseSearchingType } from '../types/types';

const getAllPosts = () => BlogPost.find();
const addNewPost = (data: BlogPostModelDataType) => new BlogPost(data).save();
const findById = (id: string) => BlogPost.findById(id);
const updatePost = (id: string, data: BlogPostModelDataType) =>
  BlogPost.findByIdAndUpdate(id, data);
const checkForPost = (data: MongooseSearchingType) =>
  BlogPost.IsPostExisting(data);
const rmvPost = (id: string) => BlogPost.findByIdAndDelete(id);

export default {
  getAllPosts,
  addNewPost,
  findById,
  updatePost,
  checkForPost,
  rmvPost,
};
