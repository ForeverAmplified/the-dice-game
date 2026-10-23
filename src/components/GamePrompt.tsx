import { useEffect, useState } from 'react';

import type { PlayerId } from './Main';

type GamePromptProps = {
  player: PlayerId;
  message: string;
}

export default function GamePrompt({ player, message }: GamePromptProps) {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let characterIndex = 0;

    const intervalId = setInterval(() => {
      characterIndex++;

      setDisplayedMessage(message.slice(0, characterIndex));

      if (characterIndex >= message.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [message]);

  return (
    <p className="whitespace-pre-line">
      {`${player} >\n`} {displayedMessage}
      <span className="prompt-cursor" />
    </p>
  );
}