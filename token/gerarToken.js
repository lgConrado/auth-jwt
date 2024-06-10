import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const gerarToken = (usuario) => {
  dotenv.config();

  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    process.env.CHAVE_JWT,
    { expiresIn: "12h" }
  );
};

export default gerarToken
