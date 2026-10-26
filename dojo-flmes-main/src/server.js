import express from "express";
import * as filmes from "./controllers/filmesController.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de filmes no ar");
});

app.get("/filmes", filmes.listar);
app.get("/filmes/:id", filmes.buscarPorId);
app.post("/filmes", filmes.criar);
app.delete("/filmes/:id", filmes.remover);

app.listen(PORTA, () => {
  console.log(`API disponível em http://localhost:${PORTA}`);
});