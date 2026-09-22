import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

/**
 * Exibe o resultado da rodada para um jogador específico:
 * "Ganhou", "Perdeu" ou "Empatou", com cor correspondente.
 *
 * @param {"Ganhou"|"Perdeu"|"Empatou"|null} resultado - resultado a exibir.
 */
export default function ResultadoRodada({ resultado }) {
  if (!resultado) return null;

  const estilos = {
    Ganhou: { cor: colors.sucesso, texto: "Ganhou" },
    Perdeu: { cor: colors.erro, texto: "Perdeu" },
    Empatou: { cor: colors.empate, texto: "Empatou" },
  };

  const config = estilos[resultado];

  return (
    <View style={[styles.badge, { backgroundColor: config.cor }]}>
      <Text style={styles.texto}>{config.texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignSelf: "center",
  },
  texto: {
    color: "#1E1B2E",
    fontWeight: "800",
    fontSize: 12,
  },
});
