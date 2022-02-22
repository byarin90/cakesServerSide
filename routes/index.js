const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "Welcome to my API " });
})

module.exports = router;