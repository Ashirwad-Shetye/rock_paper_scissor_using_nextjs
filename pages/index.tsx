import Image from "next/image";
import rock from "../public/rock.png";
import paper from "../public/paper.png";
import scissor from "../public/scissor.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [action, setAction] = useState(0);
  const [computerAction, setComputerAction] = useState(0);
  const [score, setScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState("let the game begin");
  const [gamesOver, setGamesOver] = useState(true);
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

    if (updateComputerScore == 5) {
      setResult("Computer won the game");
      setRestart(true);
    }

    if (updateScore == 5) {
      setResult("Player won the game");
      setRestart(true);
    }
  }, [action, computerAction]);

  const handleRestart = () => {
    setRestart(false);
    setScore(0);
    setComputerScore(0);
    setGamesOver(true);
    setResult("let the game begin");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-boho bg-cover">
      <div className="flex flex-col justify-center items-center w-fit h-fit bg-orange-400 shadow-xl rounded-2xl">
        <h1 className="text-4xl font-Roboto my-5 text-white font-bold mx-10">
          Rock Paper Scissor
        </h1>
        {gamesOver ? (
          <div className="mb-10 space-y-5">
            <button
              onClick={reset}
              className="text-2xl border border-emerald-500 flex justify-center items-center h-12 w-40 
            rounded-lg bg-green-600 text-white shadow-lg active:bg-green-700 mx-auto"
            >
              New Game
            </button>
            <div className="bg-white rounded-lg text-center w-80 overflow-clip text-clip">
              <h1 className="text-lg font-semibold py-1">How to play</h1>
              <ul className="text-sm text-clip w-72 mx-auto pb-2">
                <li>👉 select one of the three action button in the bottom</li>
                <li>
                  👉 rock beats scissor, scissor beats paper and paper beats
                  rock
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div
              className={
                restart
                  ? "flex blur-sm flex-col justify-center items-center space-y-10 pointer-events-none select-none cursor-default"
                  : "flex flex-col justify-center items-center space-y-10"
              }
            >
              <div className="flex space-x-10 mx-10">
                <div className="relative border h-52 w-52 rounded-xl shadow-lg bg-white">
                  <h1 className="flex justify-center items-center font-semibold">
                    Player : {score}
                  </h1>
                  <div className="w-full h-44 object-cover overflow-clip flex justify-center items-center">
                    <Image
                      src={choice[action]}
                      alt="action"
                      className="h-40 w-40"
                    />
                  </div>
                </div>
                <div className="border h-52 w-52 rounded-xl shadow-lg bg-white">
                  <h1 className="flex justify-center items-center font-semibold">
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
              <h2 className="w-fit px-2 h-8 flex items-center text-xl bg-white font-Roboto rounded-md">
                {result}
              </h2>
              <div className="flex space-x-5 pb-5">
                <button
                  onClick={onClickRock}
                  className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden 
                  rounded-full bg-white active:bg-gray-200 hover:border-2 hover:border-green-600 hover:shadow-lg"
                >
                  <Image src={rock} alt={"rock"} className="w-24 h-24"></Image>
                </button>
                <button
                  onClick={onClickPaper}
                  className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden 
                  rounded-full bg-white active:bg-gray-200 hover:border-2 hover:border-green-600 hover:shadow-lg"
                >
                  <Image src={paper} alt={"rock"} className="w-20 h-20"></Image>
                </button>
                <button
                  onClick={onClickScissor}
                  className="flex justify-center items-center w-24 h-24 object-cover border overflow-hidden 
                  rounded-full bg-white active:bg-gray-200 hover:border-2 hover:border-green-600 hover:shadow-lg"
                >
                  <Image
                    src={scissor}
                    alt={"rock"}
                    className="w-20 h-20"
                  ></Image>
                </button>
              </div>
            </div>
            {restart ? (
              <div className="absolute bg-white flex flex-col justify-center items-center w-80 h-40 rounded-xl shadow-lg">
                <h1 className="text-xl my-5">{result}</h1>
                <button
                  onClick={handleRestart}
                  className="text-2xl font-Roboto border border-red-600 flex justify-center 
              items-center w-40 h-12 rounded-xl bg-red-600 text-white active:bg-red-700 shadow-lg"
                >
                  End Game
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
