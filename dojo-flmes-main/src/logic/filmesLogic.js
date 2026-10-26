import * as repository from "../repositories/filmesRepository.js";

const ANO_MINIMO = 1888;

function converterId(idTexto) {
  const id = Number(idTexto);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function listarFilmes(genero) {
  const filmes = repository.listar();
  if (!genero) return filmes;
  return filmes.filter((f) => f.genero.toLowerCase() === String(genero).toLowerCase());
}

export function buscarFilme(idTexto) {
  const id = converterId(idTexto);
  if (id === null) return { erro: 400, mensagem: "id inválido" };
  const filme = repository.buscarPorId(id);
  if (!filme) return { erro: 404, mensagem: "Filme não encontrado" };
  return { filme };
}

export function criarFilme(dados = {}) {
  const { titulo, ano, genero } = dados;
  if (typeof titulo !== "string" || titulo.trim() === "") {
    return { erro: 400, mensagem: "título é obrigatório" };
  }
  const anoAtual = new Date().getFullYear();
  if (!Number.isInteger(ano) || ano < ANO_MINIMO || ano > anoAtual) {
    return { erro: 400, mensagem: `ano deve ser um número entre ${ANO_MINIMO} e ${anoAtual}` };
  }
  if (typeof genero !== "string" || genero.trim() === "") {
    return { erro: 400, mensagem: "gênero é obrigatório" };
  }
  const filme = repository.criar({ titulo: titulo.trim(), ano, genero: genero.trim() });
  return { filme };
}

export function removerFilme(idTexto) {
  const id = converterId(idTexto);
  if (id === null) return { erro: 400, mensagem: "id inválido" };
  if (!repository.remover(id)) return { erro: 404, mensagem: "Filme não encontrado" };
  return {};
}
