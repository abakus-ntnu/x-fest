import { ChangeEvent, SetStateAction, SyntheticEvent, useState } from "react";
import styles from "./WelcomeForm.module.css";

type props = {
  setBackgroundImage(value: SetStateAction<string>): void;
};

const WelcomeForm = ({ setBackgroundImage }: props) => {
  const [username, setUsername] = useState("");
  const [side, setSide] = useState("");

  const maxUsernameLength = 20;

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSideChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSide(event.target.value);
  };

  const handleUserSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!(side && username && username.length <= maxUsernameLength)) {
      return;
    }
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("side", side);

    setBackgroundImage(side);
  };

  // Adding image radiobuttons: https://stackoverflow.com/questions/17541614/use-images-instead-of-radio-buttons/17541916
  return (
    <form onSubmit={handleUserSubmit} className={styles.container}>
      <div className={styles.text}>
        VELG DIN SIDE:
      </div>
      <div className={styles.sideButtons}>
        <label className={styles.abakusButton}>
          <input
            type="radio"
            name="side"
            value="abakus"
            onChange={handleSideChange}
            className={styles.radio}
          />
          <div>
            <img src="/abakus_logo_black.png" height={80} />
          </div>
        </label>
        <label className={styles.onlineButton}>
          <input
            name="side"
            type="radio"
            value="online"
            onChange={handleSideChange}
            className={styles.radio}
          />
          <div>
            <img src="/Online_bla.svg" height={80} />
          </div>
        </label>
      </div>
      <label className={styles.nameInput}>
        <input
          type="text"
          name="name"
          maxLength={maxUsernameLength}
          onChange={handleUsernameChange}
          placeholder="Skriv inn navn ..."
        />
      </label>
      <div className={styles.submitButtonDiv}>
        <input
          type="submit"
          value="JOIN"
          className={styles.submitButton}
        />
      </div>
    </form>
  );
};

export default WelcomeForm;
