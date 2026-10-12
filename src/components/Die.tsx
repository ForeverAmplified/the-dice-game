export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;

type DieProps = {
  value: DieValue;
  disabled: boolean;
  className?: string;
};

const pipLayouts: Record<DieValue, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

export default function Die({ value, disabled, className = "h-16 w-16" }: DieProps) {
  const opacity = disabled ? 0.5 : 1;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      opacity={opacity}
      aria-label={`Die showing ${value}`}
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
      {pipLayouts[value].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="7"
          fill="#172B45"
        />
      ))}
    </svg>
  );
}