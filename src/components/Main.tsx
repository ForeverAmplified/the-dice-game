import { useState } from "react";

import { getRequiredPairs, completesSequence } from "../game/roll-validators.ts";
import { DiceRoller } from "../game/DiceRoller.ts";
import { gamePrompts } from "../game-data/game-prompts";

import Dice from "./Dice";
import GamePrompt from "./GamePrompt.tsx";
import Button from "./Button";

import { type DieValue } from "./Die";

export type GamePhase = "firstRoll" | "firstRollFail" | "secondRoll" | "secondRollFail" | "connected" | "gameOver";

type RollingPair = "first" | "second" | null;

export default function Main() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("firstRoll");
  const [rollingPair, setRollingPair] = useState<RollingPair>(null);
  const [dicePairOne, setDicePairOne] = useState<[DieValue, DieValue]>([1, 1]);
  const [dicePairTwo, setDicePairTwo] = useState<[DieValue, DieValue]>([1, 1]);
  const [requiredPairs, setRequiredPairs] = useState<DieValue[][] | null>(null);
  const [pendingFirstRoll, setPendingFirstRoll] = useState<{
    requiredPairs: ReturnType<typeof getRequiredPairs>;
  } | null>(null);
  const [pendingSecondRoll, setPendingSecondRoll] = useState<boolean | null>(null);

  function handleFirstDiceRoller() {
    const { die1, die2 } = DiceRoller.rollPair();
    const requiredPairs = getRequiredPairs([die1, die2]);

    setDicePairOne([die1, die2]);
    setPendingFirstRoll({ requiredPairs });
    setRollingPair("first");
  }

  function handleFirstRollAnimationEnd() {
    if (!pendingFirstRoll) {
      return;
    }

    const { requiredPairs } = pendingFirstRoll;

    if (requiredPairs) {
      setRequiredPairs(requiredPairs);
      setGamePhase("secondRoll");
    } else {
      setGamePhase("firstRollFail");
    }

    setPendingFirstRoll(null);
    setRollingPair(null);
  }

  function handleSecondDiceRoller() {
    const { die1, die2 } = DiceRoller.rollPair();

    setDicePairTwo([die1, die2]);

    const isSuccessfulRoll = requiredPairs !== null && completesSequence([die1, die2], requiredPairs);

    setPendingSecondRoll(isSuccessfulRoll);
    setRollingPair("second");
  }

  function handleSecondRollAnimationEnd() {
    if (pendingSecondRoll === null) {
      return;
    }

    setGamePhase(
      pendingSecondRoll ? "connected" : "secondRollFail"
    );

    setPendingSecondRoll(null);
    setRollingPair(null);
  }

  function resetGame() {
    setRollingPair(null);
    setDicePairOne([1, 1]);
    setDicePairTwo([1, 1]);
    setRequiredPairs(null);
    setPendingSecondRoll(null);
    setGamePhase("firstRoll");
  }

  let dieOneClasses = "h-16 w-16";
  let dieTwoClasses = "h-16 w-16";
  let gamePromptClasses = "flex border rounded-lg bg-footer shadow-footer shadow-sm p-3 h-26 w-87 text-sm";
  let handleButtonClick = handleFirstDiceRoller;

  if (gamePhase === "firstRoll" || gamePhase === "secondRoll") {
    gamePromptClasses += " border-accent/80 text-header/80";

    if (gamePhase === "firstRoll") {
      dieOneClasses += " dice-bounce";
    } else {
      dieOneClasses = "dice-pulse h-17 w-17"; //bg-amber-50 shadow-amber-200/60"
      dieTwoClasses += " dice-bounce";
      handleButtonClick = handleSecondDiceRoller;
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

    handleButtonClick = resetGame;
  }

  return (
    <main className="flex flex-col flex-1 items-center gap-13 mt-14 h-full font-orbitron font-bold text-header md:mt-22">
      <div key={gamePhase} className="flex flex-row items-center gap-1">
        <Dice
          className={dieOneClasses}
          firstPair={true}
          phase={gamePhase}
          isRolling={rollingPair === "first"}
          values={dicePairOne}
          validPairs={null}
          disabled={gamePhase === "firstRollFail" || gamePhase === "secondRollFail"}
          onRollAnimationEnd={() => handleFirstRollAnimationEnd()}

        />
        <Dice
          className={dieTwoClasses}
          firstPair={false}
          phase={gamePhase}
          isRolling={rollingPair=== "second"}
          values={dicePairTwo}
          validPairs={requiredPairs !== null ? requiredPairs : null}
          disabled={gamePhase === "firstRoll" || gamePhase === "firstRollFail" || gamePhase === "secondRollFail"}
          onRollAnimationEnd={() => handleSecondRollAnimationEnd()}
        />
      </div>

      <div className={gamePromptClasses}>
        <GamePrompt key={gamePrompts[gamePhase]} message={gamePrompts[gamePhase]} />
      </div>

      <div className="flex flex-col w-87">
        <Button
          className="bg-accent py-2 rounded-full text-black font-bold text-lg cursor-pointer hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleButtonClick}
          disabled={rollingPair !== null}
        >
          {gamePhase === "firstRoll" || gamePhase === "secondRoll" ? "Roll Dice" : "Play Again"}
        </Button>
      </div>
    </main>
  );
}