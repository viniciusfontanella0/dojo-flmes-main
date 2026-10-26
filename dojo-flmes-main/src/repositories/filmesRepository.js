import { readFileSync, writeFileSync } from "node:fs";

const ARQUIVO = new URL("../../data/filmes.json", import.meta.url);

function ler() {
  return JSON.parse(readFileSync(ARQUIVO, "utf-8"));
}

function gravar(filmes) {
  writeFileSync(ARQUIVO, JSON.stringify(filmes, null, 2));
}

export function listar() {
  return ler();
}

export function buscarPorId(id) {
  return ler().find((f) => f.id === id);
}

export function criar({ titulo, ano, genero }) {
  const filmes = ler();
  const id = filmes.reduce((max, f) => Math.max(max, f.id), 0) + 1;
  const filme = { id, titulo, ano, genero };
  filmes.push(filme);
  gravar(filmes);
  return filme;
}

export function remover(id) {
  const filmes = ler();
  const indice = filmes.findIndex((f) => f.id === id);
  if (indice === -1) return false;
  filmes.splice(indice, 1);
  gravar(filmes);
  return true;
}
