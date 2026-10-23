import Button from './Button';

type GameOverOverlayProps = {
  winner: string;
  resetGame: () => void;
}

export default function GameOverOverlay({ winner, resetGame }: GameOverOverlayProps) {
  return (
    <>
      <div className="text-5xl md:text-6xl text-header">Game Over</div>
      <div className="text-3xl md:text-4xl text-header">{winner} Wins!</div>
      <div className="text-3xl md:text-4xl text-header">Update the Ledger!</div>
      <div className="flex flex-col w-8/10 max-w-88">
        <Button
          className="bg-accent py-2 rounded-full text-black text-xl cursor-pointer hover:bg-accent/80"
          onClick={resetGame}
        >
          Play Again
        </Button>
      </div>
    </>
  );
}