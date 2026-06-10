# 🔍 Pokefinder

## 📖 Proposta e Escopo
O **Pokefinder** é um jogo mobile onde você deve advinhar o pokemon com base em sua silhueta, desbloqueando-o em uma lista na Pokedex.  
O público-alvo abrange desde fãs casuais e veteranos da franquia Pokémon até usuários em busca de jogos rápidos de memória. 
O projeto também serve como uma aplicação prática de conceitos de Engenharia de Software Mobile, incluindo consumo assíncrono de APIs, navegação híbrida, gerenciamento de estados locais e globais (Context API) e persistência de dados.

## 🚀 Funcionalidades Principais
* **Modo Jogo (Adivinhação):** Sorteio aleatório de Pokémon utilizando renderização de silhuetas interativas.
* **Sistema de Desbloqueio e Progressão:** Validação de palpites de texto (ignorando *case sensitivity*). Acertos liberam o Pokémon de forma permanente.
* **Gerenciamento de Regras de Negócio:** Algoritmo que garante que Pokémon já descobertos não sejam sorteados novamente nas rodadas futuras.
* **Pokédex Dinâmica:** Listagem completa (1-151), separando visualmente os Pokémon bloqueados (???) dos já descobertos.
* **Detalhamento de Informações:** Tela dedicada para Pokémon desbloqueados, exibindo a arte oficial, número (id) na pokedex, tipagem e descrição.
* **Armazenamento Persistente:** Uso do `AsyncStorage` para salvar o progresso do jogador na memória do dispositivo para que os dados não sejam perdidos ao fechar o app.

## 🔌 API Utilizada
O aplicativo consome os dados da **PokeAPI**, uma API RESTful pública e gratuita que fornece dados enciclopédicos sobre o universo Pokémon.
* **Documentação Oficial:** [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)

## 💻 Instruções de Execução
Siga o passo a passo abaixo para clonar e executar o projeto localmente em sua máquina.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) instalado.
* Aplicativo **Expo Go** instalado no seu dispositivo móvel (Android/iOS) ou um Emulador configurado na sua máquina.

**Passo a passo:**

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/lucasjdutra/pokefinder-app.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd pokefinder
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   ```

5. **Execute no dispositivo:**
    - Abra o aplicativo da câmera no seu celular e escaneie o QR Code exibido no terminal (ou no navegador) para abrir via Expo Go.
<<<<<<< HEAD
    - Pressione a no terminal para rodar em um emulador Android ou i para um simulador iOS, caso os tenha configurados.
=======
    - Pressione a no terminal para rodar em um emulador Android ou i para um simulador iOS, caso os tenha configurados.
>>>>>>> 0975255797b1a627733d0c80ccfbac7badaff59c
