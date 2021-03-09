
type props = {
    gameScore: [];
}

const Game = ({gameScore}: props) => {
  


    const HighScoreComponent = Object.keys(gameScore).map((key: string) => (
        <h1 key={key}> Navn: {gameScore[Number(key)].name}</h1>
    ));
    return(<div> {HighScoreComponent}</div>);
};



export default Game;