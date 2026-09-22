import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import BotaoJogar from "./BotaoJogar";

const MENSAGENS = {
  jogador1: "🏆 Jogador 1 venceu a partida!",
  jogador2: "🏆 Jogador 2 venceu a partida!",
  empate: "🤝 Empate geral!",
};

/**
 * Modal exibido ao final da 5ª rodada, com a pontuação final,
 * o vencedor da partida e o botão para jogar novamente.
 *
 * @param {boolean} visivel - controla a exibição do modal.
 * @param {number} pontuacaoJogador1 - pontuação final do Jogador 1.
 * @param {number} pontuacaoJogador2 - pontuação final do Jogador 2.
 * @param {"jogador1"|"jogador2"|"empate"} vencedor - resultado final da partida.
 * @param {function} onJogarNovamente - callback para resetar o jogo.
 */
export default function ModalFimDeJogo({
  visivel,
  pontuacaoJogador1,
  pontuacaoJogador2,
  vencedor,
  onJogarNovamente,
}) {
  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Fim de Jogo</Text>

          <View style={styles.linhaPontuacao}>
            <View style={styles.blocoJogador}>
              <Text style={[styles.nomeJogador, { color: colors.jogador1 }]}>
                Jogador 1
              </Text>
              <Text style={styles.pontuacaoFinal}>{pontuacaoJogador1}</Text>
            </View>

            <Text style={styles.vs}>x</Text>

            <View style={styles.blocoJogador}>
              <Text style={[styles.nomeJogador, { color: colors.jogador2 }]}>
                Jogador 2
              </Text>
              <Text style={styles.pontuacaoFinal}>{pontuacaoJogador2}</Text>
            </View>
          </View>

          <Text style={styles.mensagemVencedor}>{MENSAGENS[vencedor]}</Text>

          <BotaoJogar
            label="Jogar Novamente"
            cor={colors.jogador1}
            habilitado
            onPress={onJogarNovamente}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: colors.fundoCard,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  titulo: {
    color: colors.texto,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 18,
  },
  linhaPontuacao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  blocoJogador: {
    alignItems: "center",
    width: 100,
  },
  nomeJogador: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  pontuacaoFinal: {
    color: colors.texto,
    fontSize: 36,
    fontWeight: "800",
  },
  vs: {
    color: colors.textoSecundario,
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  mensagemVencedor: {
    color: colors.texto,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
  },
});
