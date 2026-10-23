import { useEffect, useRef } from 'react';

import Die, { type DieValue } from './Die';
import { type GamePhase } from './Main';
import ValidPairs from './ValidPairs';

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

  const addFocusPairClasses =
    (phase === 'firstRoll' && firstPair) ||
    (phase === 'secondRoll' && !firstPair);

  return (
    <div
      className={
        `flex flex-col justify-top items-top gap-5 h-63 w-43 p-3 rounded-lg
         ${addFocusPairClasses ? "border border-accent bg-footer" : ""}
      `}
    >
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