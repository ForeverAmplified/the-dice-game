import Die, { type DieValue } from "./Die.tsx";

type DiceProps = {
  className: string;
  dice: [DieValue, DieValue];
  disabled: boolean;
}

export default function Dice({ className, dice, disabled }: DiceProps) {
  const dieOne = dice[0];
  const dieTwo = dice[1];

  return (
    <div className="flex justify-center items-center gap-8 h-26 w-60">
      <Die className={className} value={dieOne} disabled={disabled} />
      <Die className={className} value={dieTwo} disabled={disabled} />
    </div>
  );
}