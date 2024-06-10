const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController");
const routes = Router();

routes.get("/usuarios", usuarioController.listaUsuarios);
routes.get("/usuarios/:id", usuarioController.selecionaUsuario);
routes.post("/usuarios", usuarioController.adicionaUsuario);
routes.put("/usuarios/:id", usuarioController.editaUsuario);
routes.delete("/usuarios/:id", usuarioController.deletaUsuario);

module.exports = routes;