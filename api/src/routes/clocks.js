import express from 'express';

var router = express.Router();

router.get('/:clockId', (req, res) => {
    res.send(req.params);
});

export default router;