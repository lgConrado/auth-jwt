import gerarToken from "../token/gerarToken";

const logar = async (req) => {
  const user = req;
  console.log("Payload: ", user);

  try {
    const usuario = await Usuario.findOne({
        where: { usuario: user.user }
      });
  
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      const { id, nome, email } = usuario.toJSON();
    
      const token = gerarToken({ id, nome, email });
      console.log("Token gerado:", token);

    return { token };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  logar,
};
