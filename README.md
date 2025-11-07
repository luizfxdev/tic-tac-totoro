# 🌳 Tic-Tac-Totoro! 🍃

<div align="center">
  <img src="assets/icons8-totoro.svg" alt="Totoro Icon" width="120" height="120">
</div>

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Studio Ghibli](https://img.shields.io/badge/Studio_Ghibli-Inspired-66bb6a?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Minimax-4a7c59?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

## 📖 Sobre o Projeto

**Tic-Tac-Totoro!** é uma reimaginação encantadora do clássico jogo da velha, ambientada no universo mágico de Studio Ghibli. Neste projeto, você enfrenta Totoro, o espírito da floresta, que utiliza inteligência artificial avançada para nunca perder uma partida!

### 🎮 Descrição do Desafio

> Em Tic-Tac-Totoro!, o clássico jogo da velha ganha um toque mágico de Ghibli! Totoro protege a floresta da derrota, usando toda sua sabedoria para nunca perder. Você pode arriscar ganhar do espírito da floresta? Entre na trilha chuvosa, enfrente Totoro e tente impedir que ele vença ou empate todas as partidas!

O visual do jogo remete à floresta vibrante de Totoro, com clima aconchegante de chuva e elementos naturais. Os jogadores são representados por 🍃 (folhas) enquanto Totoro joga com 🥚 (ovos/nozes), criando uma experiência temática única.

### 🎯 Objetivos do Desafio

- ✅ Criar um jogo da velha funcional e interativo
- ✅ Implementar IA imbatível usando o algoritmo Minimax
- ✅ Design responsivo inspirado em Studio Ghibli
- ✅ Sistema de feedback visual com animações
- ✅ Integração multimídia (vídeo background e áudio tema)
- ✅ Experiência de usuário imersiva e envolvente

---

## 🚀 Aplicações em Projetos Reais

Este projeto demonstra conceitos valiosos que podem ser aplicados em diversos cenários profissionais:

### 1. **Sistemas de Recomendação e Decisão**
O algoritmo Minimax pode ser adaptado para:
- Sistemas de previsão de movimentos em jogos estratégicos
- Engines de análise de partidas (xadrez, damas, etc.)
- Simuladores de tomada de decisão em ambientes competitivos

### 2. **Portfólios Interativos**
- Showcase de habilidades em desenvolvimento web
- Demonstração de conhecimento em algoritmos
- Design temático e storytelling visual

### 3. **Plataformas Educacionais**
- Ensino de algoritmos de busca e otimização
- Introdução à inteligência artificial
- Gamificação de conteúdo educacional

### 4. **E-commerce Gamificado**
- Mini-games para engajamento de usuários
- Sistemas de recompensa interativos
- Experiências de marca memoráveis

### 5. **Aplicações de IA Avançadas**
- Base para desenvolvimento de bots mais complexos
- Estudo de teoria dos jogos
- Algoritmos de otimização e busca adversarial

---

## 🧠 Função Principal: Algoritmo Minimax

A função central que torna Totoro imbatível é o **algoritmo Minimax**, uma técnica clássica de IA para jogos de soma zero:

```javascript
function minimax(board, depth, isMaximizing) {
    const winner = checkWinner();
    
    // Casos base: vitória, derrota ou empate
    if (winner) {
        if (winner.player === aiPlayer) {
            return 10 - depth; // IA vence (quanto mais rápido, melhor)
        } else {
            return depth - 10; // Jogador vence (penalidade)
        }
    }

    if (!board.includes('')) {
        return 0; // Empate
    }

    // Turno da IA (maximizar pontuação)
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } 
    // Turno do jogador (minimizar pontuação)
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    // Testa todas as jogadas possíveis
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = aiPlayer;
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}
```

---

## 🔍 Lógica Técnica do Algoritmo Minimax

### **Conceito Fundamental**

O Minimax é um algoritmo de **busca recursiva adversarial** que explora toda a árvore de possibilidades de um jogo, assumindo que ambos os jogadores jogam de forma otimizada.

### **Componentes Principais**

#### 1. **Função de Avaliação**
```javascript
if (winner.player === aiPlayer) {
    return 10 - depth; // Vitória: pontuação alta, favorece vitórias rápidas
}
return depth - 10; // Derrota: pontuação negativa, penaliza perdas
```

- **10 - depth**: Incentiva vitórias em menos movimentos
- **depth - 10**: Penaliza derrotas, mas prefere perder tarde do que cedo
- **0**: Empate é neutro

#### 2. **Recursão e Árvore de Decisão**

O algoritmo explora todas as possibilidades:

```
Profundidade 0: Estado atual do jogo
    │
    ├─ Profundidade 1: Todas as jogadas possíveis da IA
    │   │
    │   ├─ Profundidade 2: Todas as respostas do jogador
    │   │   │
    │   │   └─ Profundidade 3: Novas jogadas da IA
    │   │       └─ ... até o fim do jogo
```

#### 3. **Maximização e Minimização**

```javascript
// Turno da IA (MAX): Escolhe a MAIOR pontuação
if (isMaximizing) {
    bestScore = Math.max(score, bestScore);
}

// Turno do Jogador (MIN): IA assume que jogador escolhe a MENOR pontuação para IA
else {
    bestScore = Math.min(score, bestScore);
}
```

### **Complexidade Computacional**

- **Espaço de estados**: 9! = 362.880 possibilidades máximas
- **Complexidade temporal**: O(b^d) onde:
  - `b` = fator de ramificação (máx 9, diminui a cada jogada)
  - `d` = profundidade máxima (9 movimentos)
- **Otimizações possíveis**: 
  - Alpha-Beta Pruning (reduz exploração desnecessária)
  - Tabela de transposição (memorização de estados)
  - Ordenação de movimentos

### **Garantia de Imbatibilidade**

O algoritmo garante que Totoro **nunca perde** porque:

1. **Explora todos os cenários**: Cada jogada é avaliada até o fim do jogo
2. **Jogo perfeito**: Sempre escolhe a jogada com melhor resultado possível
3. **Jogo da velha é resolvido**: Com jogo perfeito de ambos os lados, o resultado é sempre empate

### **Fluxo de Execução**

```javascript
Jogador clica em célula
    ↓
makeMove(index, currentPlayer)
    ↓
checkGameOver() → não acabou
    ↓
getBestMove()
    ├─ Para cada célula vazia:
    │   ├─ Simula jogada da IA
    │   ├─ Chama minimax(board, 0, false)
    │   │   └─ Explora recursivamente até fim do jogo
    │   ├─ Desfaz simulação
    │   └─ Armazena melhor pontuação
    └─ Retorna melhor jogada
    ↓
makeMove(bestMove, aiPlayer)
    ↓
checkGameOver() → verifica vitória/empate
```

### **Exemplo Prático**

Tabuleiro:
```
❌ | 🟢 | 
-----------
  | ❌ | 
-----------
  |   | 🟢�
```

O Minimax avalia:
- Se IA jogar em [0,0]: Jogador pode bloquear → Empate
- Se IA jogar em [2,0]: Ameaça vitória diagonal → **Melhor jogada!**
- Se IA jogar em [2,1]: Jogador ganha em [0,0] → Péssima jogada

**Resultado**: IA escolhe [2,0] para maximizar chances de vitória.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Animações, gradientes, flexbox/grid, responsividade
- **JavaScript (ES6+)**: Lógica do jogo, algoritmo Minimax, manipulação DOM
- **Web APIs**: Audio API, Video API

---

## 📦 Estrutura do Projeto

```
tic-tac-totoro/
│
├── index.html          # Estrutura principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do jogo e IA
│
└── assets/
    ├── favicon.ico     # Ícone da página
    ├── logo.png        # Logo do jogo
    ├── background.mp4  # Vídeo de fundo
    ├── theme.mp3       # Música tema
    ├── win.png         # Imagem de vitória
    ├── lose.png        # Imagem de derrota
    └── draw.png        # Imagem de empate
```

---

## 🎨 Características do Design

- **Paleta de cores**: Tons de verde florestal (#2d5f3f, #4a7c59, #8db596)
- **Tipografia**: 
  - Cormorant Garamond (títulos)
  - Lato (corpo de texto)
- **Animações**:
  - Pulse (painel de status)
  - Bounce (imagens de resultado)
  - SlideIn (novos resultados)
  - Celebrate (células vencedoras)
- **Responsividade**: Mobile-first, breakpoints em 768px e 480px

---

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/tic-tac-totoro.git
```

2. Adicione os assets necessários na pasta `assets/`:
   - favicon.ico
   - logo.png
   - background.mp4
   - theme.mp3
   - win.png, lose.png, draw.png

3. Abra `index.html` em seu navegador



---

## 🎮 Como Jogar

1. Clique em **INICIAR** para começar uma nova partida
2. Você joga com ❌ , clique em qualquer célula vazia
3. Totoro (🟢) responderá automaticamente
4. Tente vencer ou empatar contra a IA imbatível!
5. Use **REINICIAR** para começar do zero

---

## 📚 Aprendizados

Este projeto explora:
- ✅ Algoritmos de inteligência artificial (Minimax)
- ✅ Teoria dos jogos e estratégias ótimas
- ✅ Manipulação avançada do DOM
- ✅ Design responsivo e mobile-first
- ✅ Animações CSS e transições
- ✅ Integração multimídia (áudio/vídeo)
- ✅ Experiência do usuário (UX) imersiva

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## 🙏 Agradecimentos

- Studio Ghibli pela inspiração mágica
- Comunidade de desenvolvedores por recursos e apoio
- Dedico este game ao meu filho Dom, que descobriu a magia do filme Totoro e não cansa de assistir! ❤️
- Você, por jogar e aprender! 🌳✨

---

<div align="center">

***Vamos todos rir. Assim os nossos medos vão embora.*** 💚

</div>
