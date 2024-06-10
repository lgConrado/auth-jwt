const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./infrastructure/database");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuarioRoutes");
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", usuarioRoutes);

db.sync();

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});