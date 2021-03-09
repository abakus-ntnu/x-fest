
type props = {
    gameScore: [];
}

const Game = ({gameScore}: props) => {
  


    const HighScoreComponent = Object.keys(gameScore).map((key: string) => (
        <h1> Navn: {gameScore[Number(key)].name}</h1>
    ));

    console.log(HighScoreComponent)
    return(<div> {HighScoreComponent}</div>);
};



export default Game;