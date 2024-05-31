import { useRef } from "react";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [currentBox, setCurrentBox] = useState(null);
  const [sucess, setSucess] = useState(null);
  const [failure, setFailure] = useState(null);
  const [score, setScore] = useState(0);
  let prevScore = localStorage.getItem("score");
  let timer = useRef();

  const getRandomColourBox = () => {
    return Math.floor(Math.random() * 5);
  };

  const handleStart = () => {
    let randomIdx = getRandomColourBox();
    setCurrentBox(randomIdx);
    timer.current = setInterval(() => {
      let randomIdx = getRandomColourBox();
      // while (randomIdx === currentBox) randomIdx = getRandomColourBox();
      // console.log(randomIdx);
      setCurrentBox(randomIdx);
      setSucess(null);
      setFailure(null);
    }, 1000);
  };

  const handleClick = (index) => {
    if (index === currentBox) {
      setScore((prev) => prev + 1);
      if (prevScore < score + 1) localStorage.setItem("score", score + 1);
      setSucess(index);
    } else {
      setFailure(index);
    }
  };

  const handleFinish = () => {
    setCurrentBox(null);
    setSucess(null);
    setFailure(null);
    setScore(0);
    clearInterval(timer.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="App">
      <div>Score: {score}</div>
      <div>Highest Score: {prevScore}</div>
      <div className="boxWrapper">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div
              className={`box ${index === currentBox ? "blue" : ""} ${
                index === sucess ? "green" : ""
              }  ${index === failure ? "red" : ""}`}
              key={index}
              onClick={() => handleClick(index)}
            ></div>
          ))}
      </div>
      <div className="btnWrapper">
        <button className="btn" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
}
