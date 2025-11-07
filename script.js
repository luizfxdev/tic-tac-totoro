// Elementos do DOM
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusPanel = document.getElementById('status-panel');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Variáveis do jogo
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '🟢'; // Jogador (folha)
let aiPlayer = '❌'; // Totoro (ovo/noz)
let gameActive = false;
let gameHistory = [];

// Combinações vencedoras
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Linhas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Colunas
  [0, 4, 8],
  [2, 4, 6] // Diagonais
];

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
  playAudioBtn.style.opacity = '0.5';
  pauseAudioBtn.style.opacity = '1';
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
  pauseAudioBtn.style.opacity = '0.5';
  playAudioBtn.style.opacity = '1';
});

// Inicialização
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function startGame() {
  gameActive = true;
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winner');
  });
  statusPanel.textContent = 'Sua vez! Faça sua jogada!';
  statusPanel.style.background = 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)';
}

function resetGame() {
  startGame();
  resultContent.innerHTML = '<p class="result-placeholder">O resultado aparecerá aqui após o jogo...</p>';
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameBoard[index] !== '' || e.target.classList.contains('taken')) {
    return;
  }

  // Jogada do jogador
  makeMove(index, currentPlayer);

  if (!checkGameOver()) {
    // Jogada da IA após pequeno delay
    setTimeout(() => {
      if (gameActive) {
        const aiMove = getBestMove();
        makeMove(aiMove, aiPlayer);
        checkGameOver();
      }
    }, 500);
  }
}

function makeMove(index, player) {
  gameBoard[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add('taken');
}

function checkGameOver() {
  // Verificar vitória
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    highlightWinningCells(winner);

    if (winner.player === currentPlayer) {
      statusPanel.textContent = '🎉 Incrível! Você venceu Totoro! 🎉';
      statusPanel.style.background = 'linear-gradient(135deg, #81c784 0%, #66bb6a 100%)';
      addResult('win', 'Vitória!', 'Você conseguiu vencer o espírito da floresta!');
    } else {
      statusPanel.textContent = '🌳 Totoro venceu! A floresta está protegida! 🌳';
      statusPanel.style.background = 'linear-gradient(135deg, #ffb74d 0%, #ffa726 100%)';
      addResult('lose', 'Derrota', 'Totoro protegeu a floresta com maestria!');
    }
    return true;
  }

  // Verificar empate
  if (!gameBoard.includes('')) {
    gameActive = false;
    statusPanel.textContent = '🤝 Empate! Totoro respeita sua habilidade! 🤝';
    statusPanel.style.background = 'linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)';
    addResult('draw', 'Empate!', 'Uma batalha equilibrada na floresta!');
    return true;
  }

  return false;
}

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return { player: gameBoard[a], combination: combo };
    }
  }
  return null;
}

function highlightWinningCells(winner) {
  winner.combination.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function addResult(type, title, description) {
  const images = {
    win: 'assets/win.png',
    lose: 'assets/lose.png',
    draw: 'assets/draw.png'
  };

  const resultItem = document.createElement('div');
  resultItem.className = 'result-item';
  resultItem.innerHTML = `
        <img src="${images[type]}" alt="${title}">
        <div class="result-text">
            <h4>${title}</h4>
            <p>${description}</p>
        </div>
    `;

  if (resultContent.querySelector('.result-placeholder')) {
    resultContent.innerHTML = '';
  }

  resultContent.appendChild(resultItem);

  // Scroll suave para o resultado
  setTimeout(() => {
    resultContent.parentElement.scrollTop = resultContent.parentElement.scrollHeight;
  }, 100);
}

// Algoritmo Minimax para IA imbatível
function getBestMove() {
  let bestScore = -Infinity;
  let bestMove;

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

function minimax(board, depth, isMaximizing) {
  const winner = checkWinner();

  if (winner) {
    if (winner.player === aiPlayer) {
      return 10 - depth;
    } else {
      return depth - 10;
    }
  }

  if (!board.includes('')) {
    return 0;
  }

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
  } else {
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

// Inicializar estado dos botões de áudio
pauseAudioBtn.style.opacity = '0.5';
