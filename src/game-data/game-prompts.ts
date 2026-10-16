import { type GamePhase } from "../components/Main";

type GamePrompts = Record<GamePhase, string>;

export const gamePrompts: GamePrompts = {
  firstRoll: "Start by attempting to roll one of the\n valid consecutive pairs above\n\nRoll dice...",
  firstRollFail: "That is not a valid consecutive pair\n\n\nBetter luck next time...",
  secondRoll: "Complete the straight by rolling one of the valid consecutive pairs above.\n\n Roll dice...",
  secondRollFail: "That is not a valid consecutive pair and the straight is not completed.\n\nBetter luck next time...",
  connected: "Congratulations! Your consecutive pairs connect and complete the straight.\n\nThe dice have smiled upon you!",
  gameOver: "has won the game! Update the ledger!",
};