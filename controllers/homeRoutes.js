const router = require('express').Router();

const { Users, Posts, Comments } = require('../models');

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












module.exports = router;