// implement your posts router here

const router = require('express').Router();
const { find, findById, insert, update, remove } = require('./posts-model');

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

router.post('/', async (req, res) => {
    try {
        const newPost = req.body;
        if (!newPost.title || !newPost.contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post',
            });
        } else {
            const post = await insert(newPost);
            const newlyMadePost = await findById(post.id);
            res.status(201).json(newlyMadePost);
        }
    } catch (error) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const change = req.body;
    const found = await findById(id);

    try {
        if (!found) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist',
            });
        } else if (!change.title || !change.contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post',
            });
        } else {
            const updatedPost = await update(id, change);
            const newlyUpdataedPost = await findById(updatedPost);
            res.status(200).json(newlyUpdataedPost);
        }
    } catch (error) {
        res.status(500).json({
            message: 'The post information could not be modified',
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const found = await findById(id);
    try {
        if (!found) {
            res
                .status(404)
                .json({ message: 'The post with the specified ID does not exist' });
        } else {
            const deletedpost = await remove(id);
            if (deletedpost) {
                res.status(201).json(found);
            }
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: 'The comments information could not be retrieved' });
    }
});

module.exports = router;
