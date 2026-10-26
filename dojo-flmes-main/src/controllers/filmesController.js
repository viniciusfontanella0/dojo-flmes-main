import * as logic from "../logic/filmesLogic.js";

export function listar(request, response) {
  response.json(logic.listarFilmes(request.query.genero));
}

export function buscarPorId(request, response) {
  const { filme, erro, mensagem } = logic.buscarFilme(request.params.id);
  if (erro) return response.status(erro).json({ mensagem });
  response.json(filme);
}

export function criar(request, response) {
  const { filme, erro, mensagem } = logic.criarFilme(request.body);
  if (erro) return response.status(erro).json({ mensagem });
  response.status(201).json(filme);
}

export function remover(request, response) {
  const { erro, mensagem } = logic.removerFilme(request.params.id);
  if (erro) return response.status(erro).json({ mensagem });
  response.status(204).end();
}
