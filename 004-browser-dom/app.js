/*eslint no-undef: 0 */

/* GAME RULES:
 * - The game has 2 players, playing in rounds
 * - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 * - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 * - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 * - The first player to reach 100 points on GLOBAL score wins the game
 */

// player is index based to match the scores array

const rollDiceBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');

const players = (() => {
  let activePlayer = 0;

  const switchCurrentPlayerClass = activePlayer => {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('active');
    document
      .querySelector(`.player-${activePlayer === 0 ? 1 : 0}-panel`)
      .classList.remove('active');
  };

  return {
    next(player) {
      activePlayer = player === 0 ? 1 : 0;
      switchCurrentPlayerClass(activePlayer);
      return activePlayer;
    },
    current() {
      return activePlayer;
    },
    reset() {
      activePlayer = 0;
      switchCurrentPlayerClass(activePlayer);
    },
  };
})();

const overallScore = (() => {
  let scores = [0, 0];
  return {
    setPlayerScore(val, index) {
      return (scores[index] += val);
    },
    getPlayerScore(index) {
      return scores[index];
    },
    getScores() {
      return scores;
    },
    reset() {
      scores = [0, 0];
    },
  };
})();

const roundScore = (() => {
  let roundScore = 0;
  return {
    set(score) {
      return score === 1 ? 0 : parseInt((roundScore += score));
    },
    get() {
      return parseInt(roundScore);
    },
    reset() {
      roundScore = 0;
    },
  };
})();

/**
 * dice helpers
 */
const diceHelpers = (() => {
  const dice = document.querySelector('.dice');
  let value;

  return {
    hide() {
      dice.style.display = 'none';
    },
    show() {
      dice.style.display = 'block';
    },
    spin() {
      return (value = Math.floor(Math.random() * 6) + 1);
    },
    setImg(value) {
      dice.src = `dice-${value}.png`;
    },
    value() {
      return value;
    },
  };
})();

const UIHelpers = (() => {
  return {
    scoreEl(index) {
      return document.querySelector(`#score-${index}`);
    },
    currentEl(index) {
      return document.querySelector(`#current-${index}`);
    },
    playerPanelEl(index) {
      return document.querySelector(`.player-${index}-panel`);
    },
    nameEl(index) {
      return document.querySelector(`#name-${index}`);
    },
    reset() {
      UIHelpers.scoreEl(0).textContent = 0;
      UIHelpers.scoreEl(1).textContent = 0;
      UIHelpers.nameEl(0).textContent = 'Player 1';
      UIHelpers.nameEl(1).textContent = 'Player 2';
      UIHelpers.playerPanelEl(0).classList.remove('winner');
      UIHelpers.playerPanelEl(1).classList.remove('winner');
    },
  };
})();

const init = () => {
  players.reset();
  overallScore.reset();
  roundScore.reset();
  UIHelpers.reset();
};

// initialise game on start
init();

/**
 * roll dice event
 */
const roll = () => {
  const activePlayer = players.current();

  const currentEl = UIHelpers.currentEl(activePlayer);

  const value = diceHelpers.spin();
  diceHelpers.setImg(value);
  diceHelpers.show();

  currentEl.textContent = roundScore.set(value);

  if (value === 1) {
    roundScore.reset();
    players.next(activePlayer);
  }
};

/**
 * hold event
 */
const hold = () => {
  // get active player
  const activePlayer = players.current();

  // get score elements
  const scoreEl = UIHelpers.scoreEl(activePlayer);
  const currentEl = UIHelpers.currentEl(activePlayer);

  const score = overallScore.setPlayerScore(roundScore.get(), activePlayer);

  // set UI elements
  scoreEl.textContent = score;

  // reset current rendered score
  currentEl.textContent = 0;

  // hide dice
  diceHelpers.hide();

  // reset round score
  roundScore.reset();

  if (overallScore.getPlayerScore(activePlayer) >= 10) {
    const nameEl = UIHelpers.nameEl(activePlayer);
    const playerPanelElWinner = UIHelpers.playerPanelEl(activePlayer);
    const playerPanelElLoser = UIHelpers.playerPanelEl(
      activePlayer === 0 ? 1 : 0,
    );

    nameEl.textContent = 'Winner!';
    diceHelpers.hide();
    playerPanelElWinner.classList.add('winner');
    playerPanelElLoser.classList.remove('active');
    playerPanelElWinner.classList.add('active');

    rollDiceBtn.removeEventListener('click', roll);
    holdBtn.removeEventListener('click', hold);
  } else {
    players.next(activePlayer);
  }
};

rollDiceBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', init);
