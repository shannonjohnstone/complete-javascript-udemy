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
  let currentPlayer = 0;

  const switchCurrentPlayerClass = currentPlayer => {
    document
      .querySelector(`.player-${currentPlayer}-panel`)
      .classList.add('active');
    document
      .querySelector(`.player-${currentPlayer === 0 ? 1 : 0}-panel`)
      .classList.remove('active');
  };

  return {
    next(player) {
      currentPlayer = player === 0 ? 1 : 0;
      switchCurrentPlayerClass(currentPlayer);
      return currentPlayer;
    },
    current() {
      return currentPlayer;
    },
    reset() {
      currentPlayer = 0;
      switchCurrentPlayerClass(currentPlayer);
    },
  };
})();

/**
 * check weather the last 2 rolls are both 6
 * and belong to the same player
 */
const spinLog = (() => {
  let current;
  let log = [];

  return {
    check(value, _current) {
      // limit the array 2
      log = [value, ...log].slice(0, 2);

      // if more than 1 and is same player
      if (log.length > 1 && current === _current) {
        current = _current;

        // use Set to filter down to unquie values
        const unquie = new Set([...log]);

        // is the unquie array 1 value and matches
        return unquie.size === 1 && unquie.has(value);
      }

      current = _current;
      return false;
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
    totalScoreEl(index) {
      return document.querySelector(`#score-${index}`);
    },
    currentScoreEl(index) {
      return document.querySelector(`#current-${index}`);
    },
    playerPanelEl(index) {
      return document.querySelector(`.player-${index}-panel`);
    },
    nameEl(index) {
      return document.querySelector(`#name-${index}`);
    },
    reset() {
      UIHelpers.totalScoreEl(0).textContent = 0;
      UIHelpers.totalScoreEl(1).textContent = 0;
      UIHelpers.nameEl(0).textContent = 'Player 1';
      UIHelpers.nameEl(1).textContent = 'Player 2';
      UIHelpers.playerPanelEl(0).classList.remove('winner');
      UIHelpers.playerPanelEl(1).classList.remove('winner');
    },
  };
})();

const runWinner = currentPlayer => {
  const nameEl = UIHelpers.nameEl(currentPlayer);
  const playerPanelElWinner = UIHelpers.playerPanelEl(currentPlayer);
  const playerPanelElLoser = UIHelpers.playerPanelEl(
    currentPlayer === 0 ? 1 : 0,
  );

  nameEl.textContent = 'Winner!';
  diceHelpers.hide();
  playerPanelElWinner.classList.add('winner');
  playerPanelElLoser.classList.remove('active');
  playerPanelElWinner.classList.add('active');

  rollDiceBtn.removeEventListener('click', roll);
  holdBtn.removeEventListener('click', hold);
};

/**
 * roll dice event
 */
const roll = () => {
  console.log('ROLL');
  const currentPlayer = players.current();

  const currentScoreEl = UIHelpers.currentScoreEl(currentPlayer);

  const value = diceHelpers.spin();
  diceHelpers.setImg(value);
  diceHelpers.show();

  currentScoreEl.textContent = roundScore.set(value);

  if (value === 1 || spinLog.check(value, currentPlayer)) {
    roundScore.reset();
    players.next(currentPlayer);
  }
};

/**
 * hold event
 */
const hold = () => {
  // get active player
  const currentPlayer = players.current();

  // get score elements
  const totalScoreEl = UIHelpers.totalScoreEl(currentPlayer);
  const currentScoreEl = UIHelpers.currentScoreEl(currentPlayer);

  const score = overallScore.setPlayerScore(roundScore.get(), currentPlayer);

  // set total score UI
  totalScoreEl.textContent = score;

  // reset current rendered score
  currentScoreEl.textContent = 0;

  // hide dice
  diceHelpers.hide();

  // reset round score
  roundScore.reset();

  if (overallScore.getPlayerScore(currentPlayer) >= 10) {
    runWinner(currentPlayer);
  } else {
    players.next(currentPlayer);
  }
};

const init = () => {
  players.reset();
  overallScore.reset();
  roundScore.reset();
  UIHelpers.reset();

  rollDiceBtn.addEventListener('click', roll);
  holdBtn.addEventListener('click', hold);
  newGameBtn.addEventListener('click', init);
};

// initialise game on start
init();
