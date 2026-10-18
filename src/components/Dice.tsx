import { useRef, useEffect } from "react";

import Die, { type DieValue } from "./Die.tsx";
import { type GamePhase } from "./Main.tsx";
import ValidPairs from "./ValidPairs.tsx";

type DiceProps = {
  className: string;
  firstPair: boolean;
  phase: GamePhase;
  isRolling: boolean;
  values: [DieValue, DieValue];
  validPairs: DieValue[][] | null;
  disabled: boolean;
  onRollAnimationEnd: () => void;
}

export default function Dice({ className, firstPair, phase, isRolling, values, validPairs, disabled, onRollAnimationEnd }: DiceProps) {
  const finishedDiceCount = useRef(0);

  useEffect(() => {
    if (isRolling) {
      finishedDiceCount.current = 0;
    }
  }, [isRolling]);

  function handleDieRollAnimationEnd() {
    finishedDiceCount.current += 1;

    if (finishedDiceCount.current === 2) {
      finishedDiceCount.current = 0;
      onRollAnimationEnd();
    }
  }

  const [dieOne, dieTwo] = values;

  const additionalClasses =
    (phase === "firstRoll" && firstPair) ||
    (phase === "secondRoll" && !firstPair)
      ? "border border-accent bg-footer"
      : "";

  return (
    <div className={`flex flex-col justify-top items-top gap-5 h-63 w-43 p-3 rounded-lg ${additionalClasses}`}>
      <div className={`flex justify-center items-center h-20 ${phase === "connected" ? "gap-4" : "gap-3"}`}>
        <Die
          className={className}
          isRolling={isRolling}
          value={dieOne}
          disabled={disabled}
          onRollAnimationEnd={handleDieRollAnimationEnd}
        />
        <Die
          className={className}
          isRolling={isRolling}
          value={dieTwo}
          disabled={disabled}
          onRollAnimationEnd={handleDieRollAnimationEnd}
        />
      </div>
      <ValidPairs firstPair={firstPair} phase={phase} validPairs={validPairs} disabled={disabled} />
    </div>
  );
}