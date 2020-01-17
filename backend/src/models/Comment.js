const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    description:String,
    likes:{
        type:Number,
        default:0
    },
    foreign_key:String
},{
    timestamps:true
});

module.exports = mongoose.model('Comment', CommentSchema);