import GameComponent from "./DinoGame/Game";
import styles from "./Game.module.css";
import React, { useState } from "react";
import HighscoreComponent from "./HighscoreComponent";

type gameScore = {
  name: string;
  union: string;
  highscore: number;
};

type props = {
  gameScore: gameScore[];
};

const Game = ({ gameScore }: props) => {
  const [currentScore, setScore] = useState(0);

  const HighScoreList = Object.keys(gameScore).map((key: string) => (
    <HighscoreComponent
      key={key}
      name={gameScore[Number(key)].name}
      highscore={gameScore[Number(key)].highscore}
      side={gameScore[Number(key)].union}
    />
  ));

  const ParentFunction = (value: number) => {
    if (value > currentScore) {
      setScore(value);
      sumbitHighscore();
    }
  };

  const sumbitHighscore = () => {
    const name = sessionStorage.getItem("name");
    const side = sessionStorage.getItem("side");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/score`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        side: side,
        score: currentScore,
      }),
    })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error(error);
      });
  };

  const config = {
    fps: 60,
    skySpeed: 40,
    groundSpeed: 200,
  };

  return (
    <div className={styles.gameContainer}>
      <div>
        <GameComponent options={config} highScoreCallback={ParentFunction} />
      </div>

      <div>
        <ol>{HighScoreList}</ol>
      </div>
    </div>
  );
};

export default Game;
