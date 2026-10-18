import Die, { type DieValue } from "./Die";
import { type GamePhase } from "./Main.tsx";

type comboProps = {
  firstPair: boolean;
  phase: GamePhase;
  validPairs: DieValue[][] | null;
  disabled: boolean;
}

const defaultTargetPairs: DieValue[][][] = [
  [[1, 2], [4, 5]],
  [[2, 3], [5, 6]],
  [[3, 4], [6, 1]]
];

export default function ValidPairs({ firstPair, phase, validPairs, disabled }: comboProps) {
  let renderValidPairs;

  if (!firstPair && validPairs === null) {
    renderValidPairs = (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-6">
          <div className="flex gap-2">
            <div>??</div>
            <div>??</div>
          </div>
          <div className="flex gap-2">
            <div>??</div>
            <div>??</div>
          </div>
        </div>
      </div>
    );
  } else {
    const pairs = validPairs ? [validPairs] : defaultTargetPairs;

    renderValidPairs = pairs.map((pair) => (
      <div key={pair.flat().join("-")} className="flex flex-col gap-2">
        <div className="flex justify-between gap-6">
          <div className="flex gap-1">
            <Die className="h-6 w-6" value={pair[0][0]} disabled={false} />
            <Die className="h-6 w-6" value={pair[0][1]} disabled={false} />
          </div>
          <div className="flex gap-1">
            <Die className="h-6 w-6" value={pair[1][0]} disabled={false} />
            <Die className="h-6 w-6" value={pair[1][1]} disabled={false} />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${disabled || (phase === 'secondRoll' && firstPair) ? "opacity-50" : ""}`}>
      <div className="border-b flex flex-col gap-0 items-center w-9/10">
        <p className="text-sm">Valid Pairs</p>
      </div>
      {renderValidPairs}
    </div>
  );
}