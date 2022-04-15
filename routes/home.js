const express = require("express");
const router = express.Router();
const api = require("../public/api");

router.get("/", async (req, res) => {
    res.render("index");
});

module.exports = router;