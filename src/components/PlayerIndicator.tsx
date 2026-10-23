type PlayerIndicatorProps = {
  playerLabel: string;
  currentPlayer: string;
  playerOneConnected: boolean;
  gamePhase: string;
}
export default function PlayerIndicator({ playerLabel, currentPlayer, playerOneConnected, gamePhase }: PlayerIndicatorProps) {
  const isCurrentPlayerActive =
    currentPlayer === playerLabel &&
    (gamePhase === 'firstRoll' || gamePhase === 'secondRoll');

  return (
    <div className="flex justify-center items-center gap-2 text-xl">
      <span
        className={`
          size-0 border-y-8 border-y-transparent border-l-10 border-l-accent
          ${isCurrentPlayerActive ? "visible" : "invisible"}
        `}
      />

      <span className={`${isCurrentPlayerActive ? "opacity-100" : "opacity-50"}`}>
        {playerLabel}
      </span>

      {playerLabel === "Player 1" && (
        <span
          className={`
            relative inline-flex size-2 rounded-full ml-1 bg-accent
            ${playerOneConnected ? "visible" : "invisible"}
          `}
        >
          <span className="absolute inset-0 rounded-full signal-dot" />
        </span>
      )}
    </div>
  );
}