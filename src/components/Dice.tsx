import Die, { type DieValue } from "./Die.tsx";
import { type GamePhase } from "./Main.tsx";
import ValidPairs from "./ValidPairs.tsx";


type DiceProps = {
  className: string;
  firstPair: boolean;
  phase: GamePhase;
  values: [DieValue, DieValue];
  validPairs: DieValue[][] | null;
  disabled: boolean;
}

export default function Dice({ className, firstPair, phase, values, validPairs, disabled }: DiceProps) {
  const dieOne = values[0];
  const dieTwo = values[1];

  let containerClasses = "flex flex-col justify-top items-top gap-5 h-63 w-43 p-3 rounded-lg";
  let diceClasses = "flex justify-center items-center h-20"

  if (phase === "connected") {
    diceClasses += " gap-6";
  } else {
    diceClasses += " gap-3";
  }

  if ((phase === "firstRoll" && firstPair) || (phase === "secondRoll" && !firstPair)) {
    containerClasses += " border border-accent bg-footer";
  }

  return (
    <div className={containerClasses}>
      <div className={diceClasses}>
        <Die className={className} value={dieOne} disabled={disabled} />
        <Die className={className} value={dieTwo} disabled={disabled} />
      </div>
      <ValidPairs firstPair={firstPair} phase={phase} validPairs={validPairs} disabled={disabled} />
    </div>
  );
}