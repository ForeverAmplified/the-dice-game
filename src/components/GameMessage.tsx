import { useEffect, useState } from "react";

type statusProps = {
  message: string;
};

export default function GameMessage({ message }: statusProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    let characterIndex = 0;

    const intervalId = setInterval(() => {
      characterIndex++;

      setDisplayedMessage(message.slice(0, characterIndex));

      if (characterIndex >= message.length) {
        clearInterval(intervalId);
      }
    }, 25);

    return () => clearInterval(intervalId);
  }, [message]);

  return (
      <p className="whitespace-pre-line">{displayedMessage}
        <span className="typewriter-cursor" />
      </p>
  );
}