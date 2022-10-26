const router = require('express').Router();

const { Users, Posts, Comments } = require('../models');

// Renders homepage
router.get('/', async (req, res) => {
    try {
        const currentPosts = await Users.findAll({
            attributes: {
                exclude: [
                    'password',
                ],
            },
            include: [{model: Posts}]
        });
        const posts = currentPosts.map((post) => post.get({ plain: true }))
        const loggedIn = req.session.logged_in
        res.render('home',{
            posts,
            loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});














// Renders login page
router.get('/login', (req,res)=> {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('login');
});





module.exports = router;