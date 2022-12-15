import Image from "next/image";
import rock from "../public/rock.png";
import paper from "../public/paper.png";
import scissor from "../public/scissor.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [action, setAction] = useState(0);
  const [computerAction, setComputerAction] = useState(0);
  const [name, setName] = useState("Player");
  const [score, setScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("let the game begin");
  const [gamesOver, setGamesOver] = useState(false);
  const [restart, setRestart] = useState(false);

  const choice = [rock, paper, scissor];

  const generateComputerChoice = () => {
    const random = Math.floor(Math.random() * choice.length);
    setComputerAction(random);
  };

  const onClickRock = () => {
    setAction(0);
    generateComputerChoice();
  };
  const onClickPaper = () => {
    setAction(1);
    generateComputerChoice();
  };
  const onClickScissor = () => {
    setAction(2);
    generateComputerChoice();
  };

  const reset = () => {
    // window.location.reload();
    setGamesOver(false);
    setRestart(false);
  };

  useEffect(() => {
    const updateComputerScore = computerScore + 1;
    const updateScore = score + 1;
    if (
      (action == 0 && computerAction == 0) ||
      (action == 1 && computerAction == 1) ||
      (action == 2 && computerAction == 2)
    ) {
      setResult("No one got a point");
    }

    if (
      (action == 0 && computerAction == 1) ||
      (action == 1 && computerAction == 2) ||
      (action == 2 && computerAction == 0)
    ) {
      setComputerScore(updateComputerScore);
      setResult("Computer scored one points");
    }

    if (
      (action == 0 && computerAction == 2) ||
      (action == 1 && computerAction == 0) ||
      (action == 2 && computerAction == 1)
    ) {
      setScore(updateScore);
      setResult("Player scored one point");
    }

    if (updateComputerScore == 10) {
      setResult("Computer won the game");
      setRestart(true);
    }

    if (updateScore == 10) {
      setResult("Player won the game");
      setRestart(true);
    }
  }, [action, computerAction]);

  const handleRestart = () => {
    setRestart(false);
    setScore(0);
    setComputerScore(0);
    setGamesOver(true);
  };

  return (
    <div
      className={
        restart
          ? "flex blur-sm flex-col justify-center items-center w-screen h-screen"
          : "flex flex-col justify-center items-center w-screen h-screen"
      }
    >
      <h1 className="text-3xl my-10">Rock Paper Scissor</h1>
      {gamesOver ? (
        <div>
          <button onClick={reset}>New Game</button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex space-x-10">
            <div className="relative border h-52 w-52 rounded-xl shadow-lg">
              <h1 className="flex justify-center items-center">
                {name} : {score}
              </h1>
              <div className="w-full h-44 object-cover overflow-clip flex justify-center items-center">
                <Image
                  src={choice[action]}
                  alt="action"
                  className="h-40 w-40"
                />
              </div>
            </div>
            <div className="border h-52 w-52 rounded-xl shadow-lg">
              <h1 className="flex justify-center items-center">
                Computer : {computerScore}
              </h1>
              <div className="w-full h-44 object-cover overflow-clip flex justify-center items-center">
                <Image
                  src={choice[computerAction]}
                  alt="action"
                  className="h-40 w-40"
                />
              </div>
            </div>
          </div>
          <h2>{result}</h2>
          <div className="flex space-x-5">
            <button
              onClick={onClickRock}
              className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden rounded-full"
            >
              <Image src={rock} alt={"rock"} className="w-24 h-24"></Image>
            </button>
            <button
              onClick={onClickPaper}
              className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden rounded-full"
            >
              <Image src={paper} alt={"rock"} className="w-20 h-20"></Image>
            </button>
            <button
              onClick={onClickScissor}
              className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden rounded-full"
            >
              <Image src={scissor} alt={"rock"} className="w-20 h-20"></Image>
            </button>
          </div>
          {restart ? (
            <button onClick={handleRestart}>End Game</button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
