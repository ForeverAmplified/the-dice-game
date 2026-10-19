import { useEffect, useState } from "react";

type GamePromptProps = {
  message: string;
}

export default function GamePrompt({ message }: GamePromptProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");

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
      {displayedMessage}
      <span className="prompt-cursor" />
    </p>
  );
}