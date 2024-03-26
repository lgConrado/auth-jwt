const {Router} = require ('express')
const pessoaController = require('../controllers/pessoaController')
const routes = Router()

routes.get("pessoas", pessoaController.listaPessoas)
routes.get("pessoas/:id", pessoaController.selecionaPessoa)
routes.post("pessoas", pessoaController.adicionaPessoa)
routes.put("pessoas/:id", pessoaController.editaPessoa)
routes.delete("pessoas/:id", pessoaController.deletaPessoa)

module.exports = routes;