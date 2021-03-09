import GameComponent from "./DinoGame/Game";
type props = {
    gameScore: [];
}

const Game = ({gameScore}: props) => {
  


    const HighScoreComponent = Object.keys(gameScore).map((key: string) => (
        <h1 key={key}> Navn: {gameScore[Number(key)].name}</h1>
    ));

    const ParentFunction = (value: number) => console.log(value);

    return(<GameComponent highScoreCallback={ParentFunction} height={600} width={800}/>);
};



export default Game;