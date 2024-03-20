import { useEffect, useState } from "react";
const Timer = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [timeRemaining, setTimeRemaining] = useState(Timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Time remaining");
      setTimeRemaining((pre) => pre - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("timerRun");
      onConfirm();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={timeRemaining} max={Timer} />
    </div>
  );
}
