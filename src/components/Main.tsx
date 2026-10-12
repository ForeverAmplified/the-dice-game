import { useState } from "react";

import { Dice as DiceAction } from "../game/DiceRollLogic";
import { getRequiredPairs, completesSequence } from "../game/gameValidators";
import GameMessage from "./GameMessage.tsx";
import Dice from "./Dice";
import Button from "./Button";

import { type DieValue } from "./Die";

type GamePhase = "first-roll" | "second-roll" | "won" | "lost";

const defaultMessage = "Attempt initial sequence lock.\n Roll: 1-2, 2-3, 3-4, 4-5, 5-6 or 6-1";

export default function Main() {
  const [gameStatus, setGameStatus] = useState<GamePhase>("first-roll");
  const [dicePairOne, setDicePairOne] = useState<[DieValue, DieValue]>([1, 1]);
  const [dicePairTwo, setDicePairTwo] = useState<[DieValue, DieValue]>([1, 1]);
  const [requiredPairs, setRequiredPairs] = useState<[DieValue[], DieValue[]]>([[1,1],[1,1]]);
  const [message, setMessage] = useState(defaultMessage);

  function handleFirstDiceRoll() {
    const { die1, die2 } = DiceAction.rollPair();
    const requiredPairs = getRequiredPairs([die1, die2])

    if (requiredPairs) {
      setMessage(`Attempt connecting sequence lock.\nRoll: ${requiredPairs[0][0]}-${requiredPairs[0][1]} or ${requiredPairs[1][0]}-${requiredPairs[1][1]}`);
      setGameStatus("second-roll");
      setRequiredPairs(requiredPairs);
    } else {
      setMessage("Failed to establish a sequence.");
      setGameStatus("lost");
    }

    setDicePairOne([die1, die2]);
  }

  function handleSecondDiceRoll() {
    const { die1, die2 } = DiceAction.rollPair();

    if (completesSequence([die1, die2], requiredPairs)) {
      setMessage("Success: Sequences connected!!!")
      setGameStatus("won");
    }
    else {
      setMessage("Failed to roll connecting sequences.");
      setGameStatus("lost");
    }

    setDicePairTwo([die1, die2]);
  }

  function resetGame() {
    setDicePairOne([1,1]);
    setDicePairTwo([1,1]);
    setRequiredPairs([[1,1],[1,1]]);
    setGameStatus("first-roll");
    setMessage(defaultMessage);
  }

  let diceButtonLabel = "Roll The First Set Of Dice";
  let dieOneCss = "h-16 w-16";
  let dieTwoCss = "h-16 w-16";
  let handleClick = handleFirstDiceRoll;

  if (gameStatus === "first-roll") {
    dieOneCss += " dice-bounce";
  }

  if (gameStatus === "second-roll") {
    diceButtonLabel = "Roll The Second Set Of Dice";
    dieOneCss = "dice-pulse h-18 w-18"; //bg-amber-50 shadow-amber-200/60"
    dieTwoCss += " dice-bounce";
    handleClick = handleSecondDiceRoll;
  }

  if (gameStatus === "won" || gameStatus === "lost") {
    if (gameStatus === "won") {
      dieOneCss = "dice-pulse h-18 w-18";
      dieTwoCss = "dice-pulse h-18 w-18";
    }

    if (gameStatus === "lost") {
      dieOneCss = "dice-shake h-16 w-16";
      dieTwoCss = "dice-shake h-16 w-16";
    }

    diceButtonLabel = "Play Again";
    handleClick = resetGame;
  }

  return (
    <main className="flex flex-col items-center gap-14 mt-12 h-full font-orbitron font-bold text-base text-header">
      <div key={gameStatus} className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
        <Dice className={dieOneCss} dice={dicePairOne} disabled={gameStatus === "lost"} />
        <Dice className={dieTwoCss} dice={dicePairTwo} disabled={gameStatus === "first-roll" || gameStatus === "lost"} />
      </div>

      <div className="flex flex-row bg-footer shadow-md rounded-lg py-2 px-3 h-16 w-84 text-base md:h-18 md:w-96 md:text-lg">
        <GameMessage key={message} message={message} />
      </div>

      <div className="flex flex-col">
        <Button
          className="bg-accent px-4 py-2 rounded-full text-black font-bold test-base cursor-pointer"
          onClick={handleClick}
        >
          {diceButtonLabel}
        </Button>
      </div>
    </main>
  );
}