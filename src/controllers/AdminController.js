const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    return res.json({
        error: false,
        message: "App -> Users",
    });
});

module.exports = router;
