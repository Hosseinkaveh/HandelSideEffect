import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [timeRemaining, setTimeRemaining] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Time remaining");
      setTimeRemaining((pre) => pre - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timer} value={timeRemaining} />;
}
