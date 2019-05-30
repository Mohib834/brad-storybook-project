const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helpers/auth');
const Story = require('../model/Story');

router.get('/', async(req, res) => {
    //Show the public one only
    try{
        const storiesPublic = await Story.find({
            status:'public'
        }).populate('owner');
        
        res.render('stories/index', { stories: storiesPublic });


    } catch(e){
        console.log(e);
    }
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('stories/new');
})

router.get('/:id/edit', async (req, res) => {
    const _id = req.params.id;
    const story = await Story.findOne({ _id });
    
    res.render('stories/edit', { story });
})

router.put('/:id', async(req, res) => {
    const story = await Story.findOne({ _id:req.params.id })
    let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    } else{
        allowComments = false;
    }

    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;

    await story.save();
    res.redirect(`/stories/${story.id}`)
})

router.get('/:id', async (req, res) => {
    try{
        const story = await Story.findOne({ _id: req.params.id }).populate('owner');
        res.render('stories/show', { story });
    } catch(e){
        console.log(e);
    }
})

//Process add story
router.post('/', async(req, res) => {
    let allowComments;

    if(req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }

    try{
        const story = new Story({
            title:req.body.title,
            body:req.body.body,
            status:req.body.status,
            allowComments,
            owner:req.user.id
        })

        await story.save();
        res.redirect(`/stories/${story._id}`);

    } catch(e){
        console.log(e);
    }
})

router.delete('/:id', async (req, res) => {
    await Story.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/dashboard');
})

module.exports = router;