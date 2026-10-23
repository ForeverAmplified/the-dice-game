# The Dice Game

A custom dice game built with React, TypeScript, and Tailwind CSS.

## About the Game

What started as a dice game created with friends has evolved into a web-based version of the original game.

Roll two pairs of dice, connect them according to the game's rules, and see if you can complete a four-die straight.
The game combines a simple interface with custom rules that determine how each roll connects to the next.

## How to Play

The goal is to connect two pairs of dice to form a four-die straight.

Roll the first pair of dice. The numbers must be consecutive, including the wraparound pair 6–1, to activate the
second pair.

The second pair must also show consecutive numbers and connect with the first pair to complete the straight.

For example, if the first roll is 3 & 4, the second roll must be either 1 & 2 or 5 & 6. These combinations complete
the straights 1, 2, 3, 4 or 3, 4, 5, 6, respectively.

A combination such as 2 & 5 doesn't count because the dice in that pair aren't consecutive.

If Player 1 completes a straight first, Player 2 must also complete one on their next turn to keep the game alive.
If Player 2 is successful, play then continues under the same rules.  If Player 2 fails, Player 1 wins.

If Player 2 completes a straight before Player 1, Player 2 wins because Player 1 has already had their opportunity.

For the full rules, team-play suggestions, and examples of each possible outcome, see the in-game How to Play guide.

## Features

- Custom dice game logic and validation
- Two-player gameplay with alternating turns
- Interactive dice with dynamically rendered faces
- Game-state-driven interface and instructions
- Animated visual feedback for rolls, failures, and successful connections
- Responsive, mobile-first layout

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS
- SVG for custom dice graphics

## Getting Started

### Prerequisites

- Node.js (includes npm)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ForeverAmplified/the-dice-game.git
```

2. Navigate to the project directory:

```bash
cd the-dice-game
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL to open in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs TypeScript project checks, then builds the production application with Vite. |
| `npm run lint` | Runs ESLint to check for code issues. |
| `npm run preview` | Previews the production build locally. |

## Technical Highlights

- **React and TypeScript:** Built a component-based interface with typed props, state, and game logic.
- **State-Driven Gameplay:** Used React state to manage game phases, dice values, valid combinations, and player progression.
- **Reusable Components:** Separated the dice, individual die faces, game messages, and other interface elements into focused components.
- **Custom SVG Dice:** Rendered traditional two-dimensional dice with SVG, allowing each die's face to reflect its current value.
- **Cryptographically Secure Randomization:** Used the browser's Web Crypto API with rejection sampling to generate unbiased dice rolls.
- **CSS Animations:** Used animations and conditional styling to communicate dice rolls, valid combinations, failures, and game outcomes.
- **Responsive Design:** Used a mobile-first layout with Tailwind CSS to support different screen sizes.
- **Game Logic and Validation:** Kept the underlying dice logic and validation separate from the React interface.
- **Accessibility Considerations:** Implemented Escape-key dismissal for modal dialogs and added ARIA attributes in relevant interface components.

## Future Development

- **Randomized Failure Messages:** Introduce a collection of humorous failure messages selected at random when a roll fails, adding variety without changing the game's instructional prompts.
- **Accessibility Improvements:** Review keyboard navigation, screen-reader support, ARIA attributes, and animation preferences to improve accessibility.
