import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dado from "./Dado";
import BotaoJogar from "./BotaoJogar";
import ResultadoRodada from "./ResultadoRodada";
import colors from "../styles/colors";

/**
 * Painel de um jogador: nome, seus dois dados, soma,
 * botão de jogar e pontuação geral da partida.
 *
 * @param {string} nome - nome exibido do jogador.
 * @param {number[]} dados - array com os dois valores dos dados (ou vazios).
 * @param {number} soma - soma atual dos dados do jogador na rodada.
 * @param {number} pontuacao - pontuação geral (rodadas vencidas) na partida.
 * @param {boolean} habilitado - se o botão de jogar está habilitado.
 * @param {boolean} jaJogou - se o jogador já jogou nesta rodada.
 * @param {function} onJogar - callback ao pressionar o botão de jogar.
 * @param {"jogador1"|"jogador2"} tipo - define o esquema de cor do painel.
 * @param {"Ganhou"|"Perdeu"|"Empatou"|null} resultado - resultado da rodada para este jogador.
 */
export default function Jogador({
  nome,
  dados = [],
  soma = 0,
  pontuacao = 0,
  habilitado,
  jaJogou,
  onJogar,
  tipo = "jogador1",
  resultado = null,
}) {
  const corPrincipal = tipo === "jogador1" ? colors.jogador1 : colors.jogador2;

  return (
    <View style={[styles.card, { borderColor: corPrincipal }]}>
      <View style={[styles.cabecalho, { backgroundColor: corPrincipal }]}>
        <Text style={styles.nome}>{nome}</Text>
        <View style={styles.pontuacaoPill}>
          <Text style={styles.pontuacaoTexto}>{pontuacao} pt</Text>
        </View>
      </View>

      <View style={styles.corpo}>
        <View style={styles.linhaDados}>
          <Dado valor={dados[0]} />
          <Dado valor={dados[1]} />
        </View>

        <Text style={styles.somaLabel}>Soma</Text>
        <Text style={[styles.somaValor, { color: corPrincipal }]}>
          {jaJogou ? soma : "--"}
        </Text>

        <BotaoJogar
          label={jaJogou ? "Jogado" : "Jogar dados"}
          cor={corPrincipal}
          habilitado={habilitado}
          onPress={onJogar}
        />

        <ResultadoRodada resultado={resultado} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: colors.fundoCard,
  },
  cabecalho: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nome: {
    color: colors.branco,
    fontWeight: "700",
    fontSize: 15,
  },
  pontuacaoPill: {
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  pontuacaoTexto: {
    color: colors.branco,
    fontSize: 12,
    fontWeight: "600",
  },
  corpo: {
    padding: 14,
    alignItems: "center",
  },
  linhaDados: {
    flexDirection: "row",
    marginBottom: 10,
  },
  somaLabel: {
    color: colors.textoSecundario,
    fontSize: 12,
    marginBottom: 2,
  },
  somaValor: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },
});
