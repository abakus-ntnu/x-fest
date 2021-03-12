import Styles from "./HighscoreComponent.module.css";

type HighscoreProps = {
  name: String;
  side: String;
  highscore: Number;
};

const HighscoreComponent = ({ name, side, highscore }: HighscoreProps) => {
  return (
    <li className={Styles.elementStyle}>
      <img
        className={Styles.iconImage}
        src={side + ".png"}
        alt="linjeforeningsikon"
      />
      <b>{name}</b>
      <div>Highscore: {highscore}</div>
    </li>
  );
};

export default HighscoreComponent;
