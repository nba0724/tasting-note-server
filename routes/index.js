const express = require("express");
const app = express();
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log(req.params);
    return res.json();
});

module.exports = router;