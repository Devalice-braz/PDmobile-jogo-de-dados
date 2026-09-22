import React from "react";
import { Image, StyleSheet, View } from "react-native";

// Mapa estático das imagens dos dados.
// O React Native/Metro exige que o require() seja "estático" (não dinâmico),
// por isso usamos um objeto de mapeamento em vez de montar o caminho em runtime.
const imagensDados = {
  1: require("../../assets/dados/dado1.png"),
  2: require("../../assets/dados/dado2.png"),
  3: require("../../assets/dados/dado3.png"),
  4: require("../../assets/dados/dado4.png"),
  5: require("../../assets/dados/dado5.png"),
  6: require("../../assets/dados/dado6.png"),
};

/**
 * Componente responsável apenas por exibir a face do dado
 * correspondente ao valor recebido via prop.
 *
 * @param {number} valor - valor do dado, de 1 a 6. Se null/undefined,
 *                          exibe um espaço reservado (dado ainda não jogado).
 * @param {number} tamanho - tamanho (largura/altura) do dado em pixels.
 */
export default function Dado({ valor, tamanho = 70 }) {
  const estiloTamanho = { width: tamanho, height: tamanho };

  if (!valor || valor < 1 || valor > 6) {
    return (
      <View style={[styles.placeholder, estiloTamanho]}>
        <View style={styles.placeholderInterno} />
      </View>
    );
  }

  return (
    <Image
      source={imagensDados[valor]}
      style={[styles.imagem, estiloTamanho]}
      resizeMode="contain"
      accessibilityLabel={`Dado com valor ${valor}`}
    />
  );
}

const styles = StyleSheet.create({
  imagem: {
    marginHorizontal: 4,
  },
  placeholder: {
    marginHorizontal: 4,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderInterno: {
    width: "35%",
    height: "35%",
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});
