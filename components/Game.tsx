import GameComponent from "./DinoGame/Game";
import styles from "./Game.module.css";
import React, { useState } from "react";

type props = {
  gameScore: [];
};

const Game = ({ gameScore }: props) => {
  const [currentScore, setScore] = useState(0);

  const HighScoreComponent = Object.keys(gameScore).map((key: string) => (
    <h1 key={key}>
      {gameScore[Number(key)].name} {gameScore[Number(key)].highscore}
    </h1>
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
      <GameComponent options={config} highScoreCallback={ParentFunction} />
      <div>{HighScoreComponent}</div>
    </div>
  );
};

export default Game;
