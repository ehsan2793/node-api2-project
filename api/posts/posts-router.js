// implement your posts router here

const router = require('express').Router();
const { find, findById } = require('./posts-model');

router.get('/', async (req, res) => {
    const allPost = await find();
    res.status(200).json(allPost);
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const onePost = await findById(id);
        if (!onePost) {
            res
                .status(404)
                .json({ message: 'The post with the specified ID does not exist' });
        } else {
            res.status(200).json(onePost);
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: 'The post information could not be retrieved' });
    }
});

module.exports = router;
