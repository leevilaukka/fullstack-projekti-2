const express = require("express");
const router = express.Router();
const api = require("../public/api");

router.get("/", (req, res) => {
    res.render("forecast");
});

module.exports = router;