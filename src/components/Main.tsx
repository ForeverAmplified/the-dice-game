import { useState } from "react";

import { getRequiredPairs, completesSequence } from "../game/roll-validators.ts";
import { Dice as GamePlay } from "../game/DiceRollLogic";
import { gamePrompts } from "../game-data/game-prompts";

import Dice from "./Dice";
import GamePrompt from "./GamePrompt.tsx";
import Button from "./Button";

import { type DieValue } from "./Die";

export type GamePhase = "firstRoll" | "firstRollFail" | "secondRoll" | "secondRollFail" | "connected" | "gameOver";

export default function Main() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("firstRoll");
  const [dicePairOne, setDicePairOne] = useState<[DieValue, DieValue]>([1, 1]);
  const [dicePairTwo, setDicePairTwo] = useState<[DieValue, DieValue]>([1, 1]);
  const [requiredPairs, setRequiredPairs] = useState<DieValue[][] | null>(null);

  function handleFirstDiceRoll() {
    const { die1, die2 } = GamePlay.rollPair();
    const requiredPairs = getRequiredPairs([die1, die2])

    if (requiredPairs) {
      setRequiredPairs(requiredPairs);
      setGamePhase("secondRoll");
    } else {
      setGamePhase("firstRollFail");
    }

    setDicePairOne([die1, die2]);
  }

  function handleSecondDiceRoll() {
    const { die1, die2 } = GamePlay.rollPair();

    if (requiredPairs !== null && completesSequence([die1, die2], requiredPairs)) {
      setGamePhase("connected");
    }
    else {
      setGamePhase("secondRollFail");
    }

    setDicePairTwo([die1, die2]);
  }

  function resetGame() {
    setDicePairOne([1, 1]);
    setDicePairTwo([1, 1]);
    setRequiredPairs(null);
    setGamePhase("firstRoll");
  }

  let dieOneClasses = "h-16 w-16";
  let dieTwoClasses = "h-16 w-16";
  let gamePromptClasses = "flex border rounded-lg bg-footer shadow-footer shadow-sm p-3 h-26 w-86 text-sm";
  let diceButtonLabel = "Roll Dice";
  let handleClick = handleFirstDiceRoll;

  if (gamePhase === "firstRoll" || gamePhase === "secondRoll") {
    gamePromptClasses += " border-accent/80 text-header/80";

    if (gamePhase === "firstRoll") {
      dieOneClasses += " dice-bounce";
    } else {
      dieOneClasses = "dice-pulse h-18 w-18"; //bg-amber-50 shadow-amber-200/60"
      dieTwoClasses += " dice-bounce";
      handleClick = handleSecondDiceRoll;
    }
  }

  if (gamePhase === "connected" || gamePhase === "firstRollFail" || gamePhase === "secondRollFail") {
    if (gamePhase === "connected") {
      dieOneClasses = "victory-dance h-18 w-18";
      dieTwoClasses = "victory-dance h-18 w-18";
      gamePromptClasses += " border-green-400 text-green-400";
    } else {
      dieOneClasses = "dice-shake h-16 w-16";
      dieTwoClasses = "dice-shake h-16 w-16";
      gamePromptClasses += " border-red-400 text-red-400";
    }

    diceButtonLabel = "Play Again";
    handleClick = resetGame;
  }

  return (
    <main className="flex flex-col items-center gap-13 mt-22 h-full font-orbitron font-bold text-header">
      <div key={gamePhase} className="flex flex-row items-center">
        <Dice
          className={dieOneClasses}
          firstPair={true}
          phase={gamePhase}
          values={dicePairOne}
          validPairs={null}
          disabled={gamePhase === "firstRollFail" || gamePhase === "secondRollFail"}
        />
        <Dice
          className={dieTwoClasses}
          firstPair={false}
          phase={gamePhase}
          values={dicePairTwo}
          validPairs={requiredPairs !== null ? requiredPairs : null}
          disabled={gamePhase === "firstRoll" || gamePhase === "firstRollFail" || gamePhase === "secondRollFail"}
        />
      </div>

      <div className={gamePromptClasses}>
        <GamePrompt key={gamePrompts[gamePhase]} message={gamePrompts[gamePhase]} />
      </div>

      <div className="flex flex-col w-84">
        <Button
          className="bg-accent py-2 rounded-full text-black font-bold text-base cursor-pointer hover:bg-accent/80"
          onClick={handleClick}
        >
          {diceButtonLabel}
        </Button>
      </div>
    </main>
  );
}