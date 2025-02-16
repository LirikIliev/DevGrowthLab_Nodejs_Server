import { RequestHandler } from 'express';

import { hasEmptyFields } from '../routes/helpers/helpers';
import fetchBlogPost from '../services/blogPosts';
import { POST_FORM_KEYS } from './config';

const getAllPosts: RequestHandler = async (_, res) => {
  try {
    const posts = await fetchBlogPost.getAllPosts();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addNewPost: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const hasBodyEmptyFields = hasEmptyFields(POST_FORM_KEYS, body);

    if (hasBodyEmptyFields) {
      res.status(412).json('Form fields are not successfully fulfilled!');
      return;
    }
    try {
      const IsPostExisting = await fetchBlogPost.checkForPost({
        name: body.name,
      });
      console.log(IsPostExisting);

      if (IsPostExisting) {
        res.status(404).json('The post is already exist!');
        return;
      }

      await fetchBlogPost.addNewPost(body);

      res
        .status(201)
        .json({ message: 'New blog post was successfully created!' });
    } catch (error) {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updatePost: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const _id = req.params.postId;
    const hasBodyEmptyFields = hasEmptyFields(POST_FORM_KEYS, body);

    if (hasBodyEmptyFields) {
      res.status(412).json('Form fields are not successfully fulfilled!');
      return;
    }

    try {
      const IsPostExisting = await fetchBlogPost.findById(_id);

      if (!IsPostExisting) {
        res.status(404).json('The post is not exist!');
        return;
      }

      await fetchBlogPost.updatePost(_id, body);
      res.status(201).json({ message: 'Blog post was successfully updated!' });
    } catch (error) {
      res.status(404).json(error);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const removePost: RequestHandler = async (req, res) => {
  const _id = req.params.postId;

  try {
    await fetchBlogPost.rmvPost(_id);
    res.status(201).json({ message: 'Post was successfully removed!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

export default {
  getAllPosts,
  addNewPost,
  updatePost,
  removePost,
};
