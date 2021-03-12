import GameComponent from "./DinoGame/Game";
import styles from "./Game.module.css";
import React, { useState } from "react";
import HighscoreComponent from "./HighscoreComponent";

type gameScore = {
  name: string;
  side: string;
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
      side={gameScore[Number(key)].side}
    />
  ));

  const ParentFunction = (value: number) => {
    if (value > currentScore) {
      setScore(value);
    }
    if((gameScore.length) > 9){
      if (value > gameScore[9].highscore) {
        sumbitHighscore(value);
      }
    }
    else {
      if (value > gameScore[gameScore.length - 1].highscore) {
        sumbitHighscore(value);
      }
    }
    
  };

  const sumbitHighscore = (newScore: number) => {
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
        score: newScore,
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
      <div className={styles.canvasContainer}>
        <GameComponent
          className={styles.canvas}
          options={config}
          highScoreCallback={ParentFunction}
        />
      </div>

      <div className={styles.highScoreContainer}>
        <ol>{HighScoreList}</ol>
      </div>
    </div>
  );
};

export default Game;
