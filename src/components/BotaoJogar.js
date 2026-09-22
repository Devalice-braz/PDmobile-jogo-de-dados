import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

/**
 * Botão reutilizável usado para "jogar os dados" e também
 * para "Jogar Novamente" ao final da partida.
 *
 * @param {string} label - texto exibido no botão.
 * @param {string} cor - cor principal do botão quando habilitado.
 * @param {boolean} habilitado - controla se o botão pode ser pressionado.
 * @param {function} onPress - callback ao pressionar.
 */
export default function BotaoJogar({ label, cor = colors.jogador1, habilitado = true, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        { backgroundColor: habilitado ? cor : colors.desabilitado },
      ]}
      onPress={onPress}
      disabled={!habilitado}
      activeOpacity={0.75}
    >
      <Text style={styles.texto}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  texto: {
    color: colors.branco,
    fontWeight: "700",
    fontSize: 13,
  },
});
