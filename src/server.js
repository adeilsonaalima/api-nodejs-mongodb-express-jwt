const express = require('express');
const AuthController = require("./controllers/AuthController")
const AdminController = require("./controllers/AdminController")
const app = express();
const port = 3000;

const authenticateMiddleware = require("./middlewares/authenticate");

app.use(express.json());

app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware, AdminController);

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port} -> http://localhost:3000\n`)
});