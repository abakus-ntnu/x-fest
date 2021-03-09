// @ts-ignore
import Game from 'react-dinosaur-game';

type options = {
    fps: Number,
    skySpeed: Number,
    groundSpeed: Number,
}

const TRexRunner = () => {
  const config: options = {
    fps: 60,
    skySpeed: 40,
    groundSpeed: 200
  }
  return (<Game options={config}/>)
}

export default TRexRunner;
