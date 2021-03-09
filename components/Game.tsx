import GameComponent from "./DinoGame/Game";
import styles from "./Game.module.css";

type props = {
    gameScore: [];
}

const Game = ({gameScore}: props) => {
  
    const HighScoreComponent = Object.keys(gameScore).map((key: string) => (
        <h1 key={key}> Navn: {gameScore[Number(key)].name}</h1>
    ));

    const ParentFunction = (value: number) => console.log(value);

    const config = {
        fps: 60,
        skySpeed: 40,
        groundSpeed: 200,
    }

    return(
    <div className={styles.gameContainer}> <GameComponent  options={config} highScoreCallback={ParentFunction}/></div>);
};



export default Game;