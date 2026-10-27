export type GamePromptKey = keyof typeof gamePrompts;

export const gamePrompts = {
  firstRoll: 'Attempt to roll one of the valid\n consecutive pairs shown above.',
  firstRollPressure: 'It\'s do or die time. Attempt to roll one of\n the valid consecutive pairs shown\n above.',
  secondRoll: 'Complete the straight by rolling one of\n the valid consecutive pairs shown\n above.',
  secondRollPressure: 'It\'s not over yet!. Complete the straight by rolling one of the valid\n consecutive pairs shown\n above.',
  rollFail: 'This did not turn out the way you had\n hoped. Better luck next time...',
  rollFailPressure: 'You did not rise to the occasion.\n Better luck next time...',
  connected: 'Congratulations! Your consecutive pairs connect and complete the straight.',
  connectedPressure: 'Impressive!  You do not go down without a fight! The game continues... ',
};