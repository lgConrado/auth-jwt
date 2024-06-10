import dotenv from "dotenv"

const {verify} = require("jsonwebtoken")

const verifyToken = async (req, res) => {
    dotenv.config();
  
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).send("Access token nao informado");
    }
  
    const [, accessToken] = token.split(" ");
  
    try {
      verify(accessToken, process.env.CHAVE_JWT);
      res.status(200).send(true);
    } catch (error) {
      res.status(401).send(false);
    }
  };
  
  export default verifyToken;