const express = require('express');
const router = express.Router();
const Story = require('./models/story.js');


router.post('./create', async (req, res) => {
    try{
        const {story} = req.body;
        if(!story){
            return res.status(400).json(({message: 'inavlid Story'}));
        }
        const newStory = new Story({story});
        await newStory.save();

        res.status.apply(201).json({id: newStory._id, message:'Story created success fully'});
    }
    catch{(err)}{
        return res.status(500).json(({message: 'server error'}));
    }
});

router.get('./getStory', async (req, res) => {
    try{
        const stories = await Story.find().sort({likes: -1});
        res.json({stories});
    }
    catch{(err)}{
        return res.status(500).json(({message: 'server error'}));
    }
});


router.post('./translate', async (req, res) => {
    try{
        const {story} = req.body;
        const emojiToText = {"😊":"happy", "❤": "love", "🧑": "person"};
        const translation = story.split('').map(e => emojiToText[e].json || e).join(' ');
        res.json({translation});
    }
    catch{(err)}{
        return res.status(500).json(({message: 'server error'}));
    }
});


router.post('./:id/likes', async (req, res) => {
    try{
        const story = await Story.findById(req.params.id);
        if(!story){
            return res.status(400).json(({message: 'inavlid Story'}));
        }

        story.likes += 1;
        await story.save();
        res.json({likes:Story.likes});
    }
    catch{(err)}{
        return res.status(500).json(({message: 'server error'}));
    }
});

module.exports = router;