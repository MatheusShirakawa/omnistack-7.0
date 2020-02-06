const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const CommentController = require('./controllers/CommentController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.get('/comments/:id/', CommentController.index);
// routes.get('/comments/', CommentController.index);
routes.post('/comments/:id/post', CommentController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;