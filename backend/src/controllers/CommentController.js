const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports ={

    async index(req, res){

        const comments = await Comment.find().sort('-createdAt');
        return res.json(comments);

    },

    async store(req, res){
       
        const post = await Post.findById(req.params.id);
        // console.log(post);
        let postId = post._id;
        
        const { description } = req.body;
        
        const comment = await Comment.create({
            description,
            foreign_key:postId
        });

        req.io.emit('comment', comment);
        return res.json(comment);
    }
};