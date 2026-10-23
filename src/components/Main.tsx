import { useState } from 'react';

import { getValidPairs, completesSequence } from '../game/roll-validators';
import { DiceRoller } from '../game/DiceRoller';
import { type GamePromptKey, gamePrompts } from '../game-data/game-prompts';
import Button from './Button';
import Dice from './Dice';
import GamePrompt from './GamePrompt';
import GameOverOverlay from './GameOverOverlay';
import PlayerIndicator from './PlayerIndicator';

import { type DieValue } from './Die';
export type PlayerId = 'Player 1' | 'Player 2';
export type GamePhase = 'firstRoll' | 'secondRoll' | 'rollFail' | 'connected';
type RollingPair = 'first' | 'second' | null;

export default function Main() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>("Player 1");
  const [gamePhase, setGamePhase] = useState<GamePhase>("firstRoll");
  const [playerOneConnected, setPlayerOneConnected] = useState(false);
  const [winner, setWinner] = useState<PlayerId | null>(null);
  const [rollingPair, setRollingPair] = useState<RollingPair>(null);
  const [dicePairOne, setDicePairOne] = useState<[DieValue, DieValue]>([1, 1]);
  const [dicePairTwo, setDicePairTwo] = useState<[DieValue, DieValue]>([1, 1]);
  const [validPairs, setValidPairs] = useState<DieValue[][] | null>(null);
  const [pendingFirstRoll, setPendingFirstRoll] = useState<{
    validPairs: ReturnType<typeof getValidPairs>;
  } | null>(null);
  const [pendingSecondRoll, setPendingSecondRoll] = useState<boolean | null>(null);

  function  handleFirstDiceRoll() {
    const { die1, die2 } = DiceRoller.rollPair();
    const validPairs = getValidPairs([die1, die2]);

    setDicePairOne([die1, die2]);
    setPendingFirstRoll({ validPairs });
    setRollingPair("first");
  }

  function handleFirstRollAnimationEnd() {
    if (!pendingFirstRoll) {
      return;
    }

    const { validPairs } = pendingFirstRoll;

    if (validPairs) {
      setValidPairs(validPairs);
      setGamePhase('secondRoll');
    } else {
      setGamePhase('rollFail');
    }

    setPendingFirstRoll(null);
    setRollingPair(null);
  }

  function  handleSecondDiceRoll() {
    const { die1, die2 } = DiceRoller.rollPair();

    setDicePairTwo([die1, die2]);

    const isSuccessfulRoll = validPairs !== null && completesSequence([die1, die2], validPairs);

    setPendingSecondRoll(isSuccessfulRoll);
    setRollingPair('second');
  }

  function handleSecondRollAnimationEnd() {
    if (pendingSecondRoll === null) {
      return;
    }

    setGamePhase(pendingSecondRoll ? 'connected' : 'rollFail');

    setPendingSecondRoll(null);
    setRollingPair(null);
  }

  function readyPlayer() {
    if (currentPlayer === 'Player 1' && gamePhase === 'connected') {
      setPlayerOneConnected(true);
    }

    if (
      currentPlayer === 'Player 2' &&
      gamePhase !== 'firstRoll' &&
      gamePhase !== 'secondRoll'
    ) {
      setPlayerOneConnected(false);
    }

    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
    setGamePhase('firstRoll');
    setDicePairOne([1, 1]);
    setDicePairTwo([1, 1]);
    setValidPairs(null);
    setPendingSecondRoll(null);
    setGamePhase('firstRoll');
  }

  function handleGameOver(player: PlayerId) {
    setWinner(player);
  }

  function resetGame() {
    setCurrentPlayer('Player 1');
    setPlayerOneConnected(false);
    setWinner(null);
    setRollingPair(null);
    setDicePairOne([1, 1]);
    setDicePairTwo([1, 1]);
    setValidPairs(null);
    setPendingSecondRoll(null);
    setGamePhase('firstRoll');
  }

  let dieOneClasses = 'h-16 w-16';
  let dieTwoClasses = 'h-16 w-16';
  let gamePromptClasses = 'flex border rounded-lg bg-footer p-3 h-26 w-87 text-sm';
  let buttonLabel = 'Roll Dice';

  let handleButtonClick =  handleFirstDiceRoll;

  let gamePrompt = gamePrompts[gamePhase as GamePromptKey];

  if (playerOneConnected && gamePhase === 'firstRoll') {
    gamePrompt = gamePrompts['firstRollPressure' as GamePromptKey];
  } else if (playerOneConnected && gamePhase === 'secondRoll') {
    gamePrompt = gamePrompts['secondRollPressure' as GamePromptKey];
  } else if (playerOneConnected && gamePhase === 'rollFail') {
    gamePrompt = gamePrompts['rollFailPressure' as GamePromptKey];
  }

  if (winner === null && playerOneConnected && currentPlayer === 'Player 2' && gamePhase === 'rollFail') {
    handleGameOver('Player 1');
  } else if (winner === null && !playerOneConnected && currentPlayer === 'Player 2' && gamePhase === 'connected') {
    handleGameOver('Player 2');
  } else if (gamePhase === 'firstRoll') {
    gamePromptClasses += ' border-accent/80 text-header/80';
    dieOneClasses += ' dice-bounce';
  } else if (gamePhase === 'secondRoll') {
    gamePromptClasses += ' border-accent/80 text-header/80';
    dieOneClasses = 'dice-pulse h-17 w-17';
    dieTwoClasses += ' dice-bounce';
    handleButtonClick =  handleSecondDiceRoll;
  } else if (gamePhase === 'rollFail') {
    dieOneClasses = 'dice-shake h-16 w-16';
    dieTwoClasses = 'dice-shake h-16 w-16';
    gamePromptClasses += ' border-red-400 text-red-400';

    if (winner === null) {
      buttonLabel = `Ready ${currentPlayer === "Player 1" ? "Player 2" : "Player 1"}`;
    } else {
      buttonLabel = 'Game Over';
    }
    handleButtonClick = readyPlayer;
  } else if (gamePhase === 'connected') {
    dieOneClasses = 'victory-dance h-18 w-18';
    dieTwoClasses = 'victory-dance h-18 w-18';
    gamePromptClasses += ' border-green-400 text-green-400';
    handleButtonClick = readyPlayer;

    if (currentPlayer === 'Player 1') {
      buttonLabel = 'Ready Player 2';
    } else {
      buttonLabel = 'Game Over';
    }
  }

  return (
    <main className="flex flex-col flex-1 items-center gap-8 mt-12 font-orbitron font-bold text-header md:mt-22">
      {winner !== null && (
        <div
          className={`
            fixed inset-0 z-100 flex flex-col justify-center items-center gap-18
            text-header text-2xl bg-black/90 animate-game-over
          `}
        >
          <GameOverOverlay winner={winner} resetGame={resetGame} />
        </div>
      )}

      <div key={gamePhase} className="flex items-center gap-1">
        <Dice
          className={dieOneClasses}
          firstPair={true}
          phase={gamePhase}
          isRolling={rollingPair === "first"}
          values={dicePairOne}
          validPairs={null}
          disabled={gamePhase === "rollFail" || winner === "Player 1"}
          onRollAnimationEnd={() => handleFirstRollAnimationEnd()}
        />
        <Dice
          className={dieTwoClasses}
          firstPair={false}
          phase={gamePhase}
          isRolling={rollingPair=== "second"}
          values={dicePairTwo}
          validPairs={validPairs !== null ? validPairs : null}
          disabled={gamePhase === "firstRoll" || gamePhase === "rollFail" || winner === "Player 1"}
          onRollAnimationEnd={() => handleSecondRollAnimationEnd()}
        />
      </div>

      <div className="flex flex-col items-center gap-8 pb-8">
        <div className={gamePromptClasses}>
          <GamePrompt key={gamePrompts[gamePhase as GamePromptKey]} player={currentPlayer} message={gamePrompt} />
        </div>

        <div className={`rounded-lg flex justify-between items-center gap-14 text-xl`}>
          <PlayerIndicator
            playerLabel="Player 1"
            currentPlayer={currentPlayer}
            playerOneConnected={playerOneConnected}
            gamePhase={gamePhase}
          />
          <PlayerIndicator
            playerLabel="Player 2"
            currentPlayer={currentPlayer}
            playerOneConnected={playerOneConnected}
            gamePhase={gamePhase}
          />
        </div>

        <div className="flex flex-col w-87">
          <Button
            className="bg-accent py-2 rounded-full text-black font-bold text-lg cursor-pointer hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleButtonClick}
            disabled={rollingPair !== null || winner !== null}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </main>
  );
}