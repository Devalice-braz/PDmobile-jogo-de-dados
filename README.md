# 🎲 Jogo de Dados — React Native + Expo

Aplicativo mobile do "Jogo de Dados", disputado entre 2 jogadores durante 5 rodadas.
Cada jogador possui 2 dados; a maior soma vence a rodada; quem vencer mais rodadas
vence a partida.

Construído com **React Native + Expo**, compatível com o **Expo Go**.

---

## 📁 Estrutura de pastas

```
dados-game/
├── App.js                      # Componente raiz, apenas monta a tela do jogo
├── app.json                    # Configuração do Expo
├── babel.config.js
├── package.json
├── assets/
│   └── dados/                  # Imagens (PNG) das faces dos dados, de 1 a 6
│       ├── dado1.png
│       ├── dado2.png
│       ├── dado3.png
│       ├── dado4.png
│       ├── dado5.png
│       └── dado6.png
└── src/
    ├── components/
    │   ├── Dado.js              # Exibe a imagem do dado a partir da prop `valor`
    │   ├── Jogador.js           # Painel de um jogador (dados, soma, botão, resultado)
    │   ├── BotaoJogar.js        # Botão reutilizável (jogar dados / jogar novamente)
    │   ├── ResultadoRodada.js   # Badge "Ganhou" / "Perdeu" / "Empatou"
    │   ├── CabecalhoRodada.js   # Título + indicador "Rodada X de 5"
    │   └── ModalFimDeJogo.js    # Tela/modal de resultado final da partida
    ├── screens/
    │   └── JogoDados.js         # Tela principal: estado e lógica de interface do jogo
    ├── game/
    │   └── gameLogic.js         # Funções puras: sortear dados, somar, comparar, etc.
    └── styles/
        └── colors.js            # Paleta de cores centralizada
```

### Por que essa organização?

- **`components/`** guarda apenas peças de UI reutilizáveis e "burras" (recebem props,
  disparam callbacks, não sabem de regras do jogo).
- **`screens/`** guarda telas completas, que orquestram os componentes e o estado
  (via hooks).
- **`game/`** isola a **lógica pura do jogo** (sortear dados, somar, decidir vencedor)
  sem nenhuma dependência do React Native — fica fácil de testar e reaproveitar.
- **`assets/dados/`** guarda as imagens dos dados dentro do próprio projeto, como pedido.
- **`styles/colors.js`** evita cores "soltas" espalhadas pelos componentes.

---

## 🎮 Como o jogo funciona

1. O jogo tem **5 rodadas**.
2. Em cada rodada, **primeiro o Jogador 1** pressiona "Jogar dados" (dois dados de 1 a 6
   são sorteados). Só depois disso o botão do **Jogador 2** é habilitado.
3. Após os dois jogarem, o app calcula automaticamente:
   - a soma dos dados de cada jogador;
   - o resultado da rodada (`Ganhou`, `Perdeu` ou `Empatou`) exibido no painel de
     **cada** jogador (do seu próprio ponto de vista);
   - quem venceu a rodada ganha 1 ponto na pontuação geral da partida.
4. Um botão **"Próxima Rodada"** aparece para avançar (na 5ª rodada, o botão vira
   **"Ver Resultado Final"**).
5. Ao final da 5ª rodada, um modal mostra a **pontuação final**, o **vencedor da
   partida** (ou `Empate geral`) e o botão **"Jogar Novamente"**, que reseta
   completamente o estado do jogo.

---

## ▶️ Como executar no Expo Go

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (LTS recomendado).
- App **Expo Go** instalado no seu celular:
  - [Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)

### Passo a passo

1. Extraia o projeto e entre na pasta:
   ```bash
   cd dados-game
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do Expo:
   ```bash
   npx expo start
   ```

4. Um QR code aparecerá no terminal (ou no navegador, se abrir automaticamente):
   - **Android**: abra o app **Expo Go** e escaneie o QR code diretamente por ele.
   - **iOS**: abra o app padrão de **Câmera** e aponte para o QR code; toque no
     aviso para abrir no Expo Go.

   > Certifique-se de que o celular esteja na **mesma rede Wi-Fi** do computador.

5. O app "Jogo de Dados" será carregado no seu celular. Pronto para jogar! 🎲

### Alternativas de execução

```bash
npx expo start --android   # abre direto em um emulador Android (se configurado)
npx expo start --ios       # abre direto em um simulador iOS (necessário macOS)
npx expo start --web       # abre uma versão web no navegador
```

---

## 🛠️ Tecnologias

- React Native
- Expo (SDK 51)
- React Hooks (`useState`) para todo o controle de estado (rodada, dados,
  pontuação e habilitação dos botões)
