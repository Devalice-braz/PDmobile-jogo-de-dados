// Lógica do jogo, isolada dos componentes visuais.
// Manter essas funções puras facilita testes e reaproveitamento.

export const TOTAL_RODADAS = 5;

/**
 * Sorteia um valor de dado entre 1 e 6.
 */
export function sortearDado() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Sorteia os dois dados de um jogador.
 * Retorna um array [dado1, dado2].
 */
export function jogarDados() {
  return [sortearDado(), sortearDado()];
}

/**
 * Soma os valores dos dois dados de um jogador.
 */
export function somarDados(dados) {
  if (!dados || dados.length === 0) return 0;
  return dados.reduce((total, valor) => total + valor, 0);
}

/**
 * Compara a soma dos dois jogadores em uma rodada e
 * retorna o resultado do ponto de vista do Jogador 1.
 * Valores possíveis: "Ganhou", "Perdeu", "Empatou".
 */
export function calcularResultadoRodada(somaJogador1, somaJogador2) {
  if (somaJogador1 > somaJogador2) return "Ganhou";
  if (somaJogador1 < somaJogador2) return "Perdeu";
  return "Empatou";
}

/**
 * Dado o resultado da rodada (do ponto de vista do Jogador 1),
 * retorna quantos pontos de partida cada jogador ganha.
 * Vencer uma rodada vale 1 ponto na pontuação geral da partida.
 */
export function calcularPontosDaRodada(resultadoRodada) {
  if (resultadoRodada === "Ganhou") return { pontosJogador1: 1, pontosJogador2: 0 };
  if (resultadoRodada === "Perdeu") return { pontosJogador1: 0, pontosJogador2: 1 };
  return { pontosJogador1: 0, pontosJogador2: 0 };
}

/**
 * Determina o vencedor final da partida com base na pontuação geral.
 * Retorna "jogador1", "jogador2" ou "empate".
 */
export function calcularVencedorPartida(pontuacaoJogador1, pontuacaoJogador2) {
  if (pontuacaoJogador1 > pontuacaoJogador2) return "jogador1";
  if (pontuacaoJogador1 < pontuacaoJogador2) return "jogador2";
  return "empate";
}
