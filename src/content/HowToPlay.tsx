export default function HowToPlay() {
  return (
    <div className="max-h-[calc(95vh-70px)] md:max-h-[calc(80vh-70px)] p-6 space-y-4 overflow-y-auto">
      <h2 className="font-orbitron font-medium text-xl">The Basics</h2>
      <p>
        The game is played with 4 standard six-sided dice.  It can be played 1 vs 1 or team vs team.  The concept is
        simple: build a straight with the 4 dice.
      </p>
      <p>But there is a twist...</p>
      <p>
        You don't roll all 4 dice at once.  You roll 2 at a time.  Each pair of dice must be an individual consecutive
        pair that also connect to complete a 4 dice straight.
      </p>
      <h2 className="font-orbitron font-medium text-xl">Breakdown</h2>
      <p>
        1 pair of dice is rolled at a time.  The first roll has 6 possible
        consecutive pairs:
        <span className="inline-block rounded-md ml-2 px-2 bg-header/90 text-page text-sm">1 <span className="text-xs">&</span> 2</span>
        <span className="inline-block rounded-md ml-2 px-2 bg-header/90 text-page text-sm">2 <span className="text-xs">&</span> 3</span>
        <span className="inline-block rounded-md ml-2 px-2 bg-header/90 text-page text-sm">3 <span className="text-xs">&</span> 4</span>
        <span className="inline-block rounded-md ml-2 px-2 bg-header/90 text-page text-sm">4 <span className="text-xs">&</span> 5</span>
        <span className="inline-block rounded-md ml-2 px-2 bg-header/90 text-page text-sm">5 <span className="text-xs">&</span> 6</span>
        <span className="ml-2">or</span>
        <span className="inline-block rounded-md mx-2 px-2 bg-header/90 text-page text-sm">6 <span className="text-xs">&</span> 1</span>
        (6 wraps back around to 1 and is considered a consecutive pair is this game).
      </p>
      <p>
        If the first roll is NOT one of these consecutive pairs, the turn is over and the dice go to the other player
        or team.
      </p>
      <p>
        If the first dice roll IS 1 of the 6 possible consecutive pairs, the beginning of the 4 dice straight is
        established.  The second pair of dice is now activated.
      </p>
      <p>
        The second roll is trickier.  It only has 2 possible consecutive pairs that will also complete the overall 4
        dice straight.  This is harder than it sounds.
      </p>
      <p>
        Complete the 4 dice straight and you may have just earned yourself a drink, the better hotel room or do double
        or nothing if you're feeling lucky!
      </p>
      <p>
        Fail to roll one of the 2 valid consecutive pairs and the dice go to the other player or team. You may be
        picking up the tab or sleeping on a foldout sofa.  Nobody wants to do that!
      </p>
      <h2 className="font-orbitron font-medium text-xl">Examples</h2>
      <h3 className="font-bold mb-0">
        Rolling The First Pair of Dice - Quick End of Round
      </h3>
      <p>
        The first roll is
        <span className="inline-block rounded-md ml-1 px-2 bg-header/90 text-page text-sm">1 <span className="text-xs">&</span> 5</span>.
        That is not one of the consecutive pairs.  It's over before it even started. The dice go to the opposing player
        or team.
      </p>
      <h3 className="font-bold mb-0">
        Rolling The First Pair of Dice - Continue Play
      </h3>
      <p>
        The first roll is
        <span className="inline-block rounded-md ml-1 px-2 bg-header/90 text-page text-sm">3 <span className="text-xs">&</span> 4</span>.
        That is one of the consecutive pairs.  The beginning of the 4 dice straight is established. The second pair of
        dice are now activated and the real challenge begins.
      </p>
      <h3 className="font-bold mb-0">
        Rolling The Second Pair of Dice
      </h3>
      <p>
        With
        <span className="inline-block rounded-md mx-1 px-2 bg-header/90 text-page text-sm">3 <span className="text-xs">&</span> 4</span>
        established, only 2 valid consecutive pairs can to complete the straight:
      <span className="inline-block rounded-md mx-1 px-2 bg-header/90 text-page text-sm">1 <span className="text-xs">&</span> 2</span>
        or <span className="inline-block rounded-md px-2 bg-header/90 text-page text-sm">5 <span className="text-xs">&</span> 6</span>.
      </p>
      <p>
        If neither of these 2 combinations are rolled, the turn is over and the dice go to the opposing player or team.
      </p>
      <p>
        If one of these combinations is rolled, congratulations! You have done what Steve rarely can do.
        The straight is completed and hopefully you've earned something good or avoided something bad.
      </p>
      <h2 className="font-orbitron font-medium text-xl">Team Play</h2>
      <p>
        There are no hard and fast rules about how to conduct team play.  We suggest players on a team each roll one of
        the pairs of dice in each round.  For example, in a 2 person team, one team member rolls the first pair of
        dice and the other team member would roll the second pair in the round.  It is a good idea to alternate which
        team member starts the round as the first roll may not result in a consecutive pair and the dice will be passed to
        the next team.
      </p>
      <h2 className="font-orbitron font-medium text-xl">Notes On Winning</h2>
      <p>
        The game can be played as a one-and-done, best 2 out of 3 or whatever suits your needs.
      </p>
      <p>
        In the spirit of fairness, the player or team who rolls second always has a chance to tie a round (or game if
        one-and-done) and keep things alive if the player or team who rolled first completes the straight. This gives
        everyone an equal chance to complete a straight.
      </p>
      <p>
        We hope you enjoy the challenge and find it as fun as we do.  We have come up with a few other games over the
        years.  This is the first one released digitally.  Stay tuned for more!
      </p>
    </div>
  );
}