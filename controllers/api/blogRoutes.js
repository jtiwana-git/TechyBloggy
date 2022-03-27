const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
    const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
  });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
    const blogDel = await Blog.destroy({
        where: {
            id: req.params.session.user_id,
            user_id: req.session.user_id,
        },
    });

    if(!blogDel) {
        res.status(404).json({ message: 'No blog found with this ID!' });
        return;
    }
    
    res.status(404).json(blogDel);
    } catch (err) {
        
    res.status(500).json(err);
  
    }
});

module.exports = router;

