/* eslint-disable consistent-return */
const PostModel = require('../models/Post');

const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title, text, imageUrl, tags,
    } = req.body;
    const doc = new PostModel({
      title,
      text,
      imageUrl,
      tags,
      owner: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('owner').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

const getOnePost = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось получить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json(doc);
      },
    ).populate('owner');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

const deletePost = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      title, text, imageUrl, tags,
    } = req.body;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        imageUrl,
        owner: req.userId,
        tags,
      },
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

module.exports = {
  getTags,
  createPost,
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
};
