const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();

const generateToken = (User = {}) => {
    return jwt.sign({
        id: User.id,
        name: User.name
    }, authConfig.secret, {
        expiresIn: 86400
    });
}

router.post("/register", async (req, res) => {
    const { email } = req.body;

    if(await UserModel.findOne({ email })) {
        return res.status(400).json({
            error: true,
            message: "App -> Já existe uma conta com esse e-mail"
        })
    }

    const User = await UserModel.create(req.body);

    User.password = undefined;

    return res.json({
        User,
        token: generateToken(User)
    });
});

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;

    const User = await UserModel.findOne({ email }).select("+password");

    if(!User) {
        return res.status(400).json({
            error: true,
            message: "App -> Usuário não encontrado."
        });
    }

    if(!await bcryptjs.compare(password, User.password)) {
        return res.status(400).json({
            error: true,
            message: "App -> Senha incorreta."
        });
    }

    return res.json(User);
})

module.exports = router;