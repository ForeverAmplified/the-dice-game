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
  const dieClass = "w-6 h-6";
  let classes = "flex flex-col items-center gap-2";

  if (disabled || (phase === 'secondRoll' && firstPair)) {
    classes += " opacity-50";
  }

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
            <Die className={dieClass} value={pair[0][0]} disabled={false} />
            <Die className={dieClass} value={pair[0][1]} disabled={false} />
          </div>
          <div className="flex gap-1">
            <Die className={dieClass} value={pair[1][0]} disabled={false} />
            <Die className={dieClass} value={pair[1][1]} disabled={false} />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className={classes}>
      <div className="flex flex-col gap-0 items-center border-b w-9/10">
        <p className="text-sm">Valid Pairs</p>
      </div>
      {renderValidPairs}
    </div>
  );
}