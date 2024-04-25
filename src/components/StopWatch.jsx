import { useEffect, useRef, useState } from "react";
import "./StopWatch.css";

const format = (timer) => {
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const StopWatch = () => {
  const [timer, setTimer] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (isActivated) {
        setTimer((prevTime) => prevTime + 1);
      } else {
        clearInterval(timerId.current);
      }
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [isActivated, timer]);

  const handleButton = (e) => {
    if (e.target.innerText === "Start") {
      setIsActivated(true);
    } else if (e.target.innerText === "Stop") {
      setIsActivated(false);
    } else if (e.target.innerText === "Reset") {
      setTimer(0);
      setIsActivated(false);
    }
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch">Stopwatch</h1>
      <div className="timer-container">
        <h3 className="stopwatch-timer">
          Time: <span>{format(timer)}</span>
        </h3>
        <div className="btn">
          <button
            onClick={handleButton}
            style={{ backgroundColor: isActivated ? "#ef0d36" : "#1db05f" }}
          >
            {isActivated ? "Stop" : "Start"}
          </button>
          <button
            className="resetBtn"
            style={{ backgroundColor: "#eaa800" }}
            onClick={handleButton}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
