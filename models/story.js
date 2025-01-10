const { populate } = require('dotenv');
const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    stroy: {
        type: String,
        required: true,
    },
    translation:{
        type: String,
        default: "", 
    },
    likes:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Story', StorySchema);