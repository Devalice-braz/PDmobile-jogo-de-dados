import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import Jogador from "../components/Jogador";
import CabecalhoRodada from "../components/CabecalhoRodada";
import BotaoJogar from "../components/BotaoJogar";
import ModalFimDeJogo from "../components/ModalFimDeJogo";
import colors from "../styles/colors";

import {
  TOTAL_RODADAS,
  jogarDados,
  somarDados,
  calcularResultadoRodada,
  calcularPontosDaRodada,
  calcularVencedorPartida,
} from "../game/gameLogic";

// Estado inicial de uma rodada "zerada" (nenhum jogador jogou ainda).
const estadoInicialRodada = {
  rodadaAtual: 1,
  dadosJogador1: [],
  dadosJogador2: [],
  resultadoRodada: null,
};

export default function JogoDados() {
  const [rodadaAtual, setRodadaAtual] = useState(estadoInicialRodada.rodadaAtual);
  const [dadosJogador1, setDadosJogador1] = useState(estadoInicialRodada.dadosJogador1);
  const [dadosJogador2, setDadosJogador2] = useState(estadoInicialRodada.dadosJogador2);
  const [resultadoRodada, setResultadoRodada] = useState(estadoInicialRodada.resultadoRodada);

  const [pontuacaoJogador1, setPontuacaoJogador1] = useState(0);
  const [pontuacaoJogador2, setPontuacaoJogador2] = useState(0);

  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [vencedorFinal, setVencedorFinal] = useState(null);

  const jogador1JaJogou = dadosJogador1.length > 0;
  const jogador2JaJogou = dadosJogador2.length > 0;
  const rodadaCompleta = jogador1JaJogou && jogador2JaJogou;

  // Regras de habilitação: só um botão ativo por vez.
  // Jogador 1 joga primeiro; Jogador 2 só pode jogar depois do Jogador 1.
  const podeJogador1Jogar = !jogador1JaJogou && !jogoFinalizado;
  const podeJogador2Jogar = jogador1JaJogou && !jogador2JaJogou && !jogoFinalizado;

  const somaJogador1 = somarDados(dadosJogador1);
  const somaJogador2 = somarDados(dadosJogador2);

  // Resultado da rodada do ponto de vista de cada jogador.
  const resultadoJogador2 =
    resultadoRodada === "Ganhou"
      ? "Perdeu"
      : resultadoRodada === "Perdeu"
      ? "Ganhou"
      : resultadoRodada === "Empatou"
      ? "Empatou"
      : null;

  function handleJogarJogador1() {
    setDadosJogador1(jogarDados());
  }

  function handleJogarJogador2() {
    const novosDadosJogador2 = jogarDados();
    setDadosJogador2(novosDadosJogador2);

    // Ambos já jogaram: calcula o resultado automaticamente.
    const soma1 = somarDados(dadosJogador1);
    const soma2 = somarDados(novosDadosJogador2);
    const resultado = calcularResultadoRodada(soma1, soma2);
    const pontos = calcularPontosDaRodada(resultado);

    setResultadoRodada(resultado);
    setPontuacaoJogador1((atual) => atual + pontos.pontosJogador1);
    setPontuacaoJogador2((atual) => atual + pontos.pontosJogador2);
  }

  function handleProximaRodada() {
    if (rodadaAtual >= TOTAL_RODADAS) {
      // Última rodada concluída: encerra a partida.
      const vencedor = calcularVencedorPartida(pontuacaoJogador1, pontuacaoJogador2);
      setVencedorFinal(vencedor);
      setJogoFinalizado(true);
      return;
    }

    setRodadaAtual((atual) => atual + 1);
    setDadosJogador1([]);
    setDadosJogador2([]);
    setResultadoRodada(null);
  }

  function handleJogarNovamente() {
    setRodadaAtual(1);
    setDadosJogador1([]);
    setDadosJogador2([]);
    setResultadoRodada(null);
    setPontuacaoJogador1(0);
    setPontuacaoJogador2(0);
    setJogoFinalizado(false);
    setVencedorFinal(null);
  }

  const ultimaRodada = rodadaAtual >= TOTAL_RODADAS;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.fundo} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoRodada rodadaAtual={rodadaAtual} />

        <View style={styles.linhaJogadores}>
          <Jogador
            nome="Jogador 1"
            tipo="jogador1"
            dados={dadosJogador1}
            soma={somaJogador1}
            pontuacao={pontuacaoJogador1}
            habilitado={podeJogador1Jogar}
            jaJogou={jogador1JaJogou}
            onJogar={handleJogarJogador1}
            resultado={resultadoRodada}
          />

          <View style={styles.espacador} />

          <Jogador
            nome="Jogador 2"
            tipo="jogador2"
            dados={dadosJogador2}
            soma={somaJogador2}
            pontuacao={pontuacaoJogador2}
            habilitado={podeJogador2Jogar}
            jaJogou={jogador2JaJogou}
            onJogar={handleJogarJogador2}
            resultado={resultadoJogador2}
          />
        </View>

        {rodadaCompleta && !jogoFinalizado && (
          <View style={styles.areaProximaRodada}>
            <BotaoJogar
              label={ultimaRodada ? "Ver Resultado Final" : "Próxima Rodada"}
              cor={colors.empate}
              habilitado
              onPress={handleProximaRodada}
            />
          </View>
        )}

        {!rodadaCompleta && (
          <Text style={styles.dica}>
            {podeJogador1Jogar
              ? "Vez do Jogador 1 jogar os dados."
              : "Vez do Jogador 2 jogar os dados."}
          </Text>
        )}
      </ScrollView>

      <ModalFimDeJogo
        visivel={jogoFinalizado}
        pontuacaoJogador1={pontuacaoJogador1}
        pontuacaoJogador2={pontuacaoJogador2}
        vencedor={vencedorFinal}
        onJogarNovamente={handleJogarNovamente}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 24,
  },
  linhaJogadores: {
    flexDirection: "row",
  },
  espacador: {
    width: 14,
  },
  areaProximaRodada: {
    marginTop: 22,
    alignItems: "center",
  },
  dica: {
    marginTop: 18,
    textAlign: "center",
    color: colors.textoSecundario,
    fontSize: 13,
  },
});
