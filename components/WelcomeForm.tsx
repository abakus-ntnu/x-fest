import { ChangeEvent, SetStateAction, SyntheticEvent, useState } from "react";
import styles from "./WelcomeForm.module.css";

type props = {
  setIsUserRegistered(value: SetStateAction<boolean>): void;
};

const WelcomeForm = ({ setIsUserRegistered }: props) => {
  const [username, setUsername] = useState("");
  const [side, setSide] = useState("");

  const maxUsernameLength = 20;

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    event.target.checked = true;
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

    setIsUserRegistered(true);
  };

  // TODO: Adding image radiobuttons: https://stackoverflow.com/questions/17541614/use-images-instead-of-radio-buttons/17541916

  return (
    <form onSubmit={handleUserSubmit} className={styles.container}>
      <label>
        <input
          type="radio"
          name="side"
          value="abakus"
          onChange={handleSideChange}
          className={styles.radio}
        />
        <img src="/abakus_logo_black.png" />
      </label>
      <label>
        <input
          name="side"
          type="radio"
          value="online"
          onChange={handleSideChange}
          className={styles.radio}
        />
        <img src="/Online_bla.svg" />
      </label>
      <label>
        NAVN:
        <input
          type="text"
          name="name"
          onChange={handleUsernameChange}
          placeholder="Skriv navn ..."
        />
      </label>
      <input type="submit" value="JOIN" />
    </form>
  );
};

export default WelcomeForm;
