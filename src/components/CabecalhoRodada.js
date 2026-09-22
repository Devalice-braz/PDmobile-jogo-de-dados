import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import { TOTAL_RODADAS } from "../game/gameLogic";

/**
 * Cabeçalho que mostra em qual rodada o jogo está (ex: "Rodada 2 de 5").
 *
 * @param {number} rodadaAtual - número da rodada atual (1 a 5).
 */
export default function CabecalhoRodada({ rodadaAtual }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎲 Jogo de Dados</Text>
      <View style={styles.pill}>
        <Text style={styles.textoPill}>
          Rodada {rodadaAtual} de {TOTAL_RODADAS}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 18,
  },
  titulo: {
    color: colors.texto,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  pill: {
    backgroundColor: colors.fundoCard,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoPill: {
    color: colors.textoSecundario,
    fontWeight: "600",
    fontSize: 13,
  },
});
