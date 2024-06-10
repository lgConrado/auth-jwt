const { Router } = require("express");
const authController = require("../controllers/authController");
const routes = Router();

routes.post("/login" ,authController.logar)

module.exports = routes;