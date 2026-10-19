import { useEffect, useState } from "react";

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;

type DieProps = {
  isRolling?: boolean;
  value: DieValue;
  disabled: boolean;
  className: string;
  onRollAnimationEnd?: () => void;
};

const pipLayouts: Record<DieValue, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

export default function Die({ isRolling, value, disabled, className, onRollAnimationEnd }: DieProps) {
  const [rollingValue, setRollingValue] = useState<DieValue>(value);

  useEffect(() => {
    if (!isRolling) return;

    setRollingValue(value);

    const intervalId = window.setInterval(() => {
      setRollingValue((currentValue) =>
        currentValue === 6 ? 1 : (currentValue + 1) as DieValue
      );
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [isRolling, value]);

  const displayedValue = isRolling ? rollingValue : value;

  const opacity = disabled ? 0.5 : 1;

  return (
    <div className={isRolling ? "die-rolling" : undefined} onAnimationEnd={onRollAnimationEnd}>
      <svg
        viewBox="0 0 100 100"
        className={className}
        role="img"
        opacity={opacity}
        aria-label={
          isRolling ? "Die rolling" : `Die showing ${value}`
        }
      >
        {/* White die face */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="16"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="3"
        />

        {/* Pips */}
        {pipLayouts[displayedValue].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="7"
            fill="#172B45"
          />
        ))}
      </svg>
    </div>
  );
}