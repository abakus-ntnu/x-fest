import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./MessageInput.module.css";

const MessageInput = () => {
  const [inputText, setInputText] = useState("");

  const maxTextLength = 55;

  const handleInputTextChange = (event: { target: { value: string } }) => {
    setInputText(event.target.value);
  };

  useEffect(() => {}, []);

  const handleMessageSubmit = (event: SyntheticEvent) => {
    const name = sessionStorage.getItem("name");
    const side = sessionStorage.getItem("side");
    if (
      !(
        inputText &&
        inputText.length <= maxTextLength &&
        name &&
        name.length <= 20 &&
        side &&
        ["abakus", "online"].includes(side)
      )
    ) {
      event.preventDefault();
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        text: inputText,
        side: side,
      }),
    })
      .then()
      .catch((error) => {
        console.error(error);
      });
    setInputText("");
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleMessageSubmit}>
        <label>
          <input
            type="text"
            placeholder="Skriv en melding ..."
            className={styles.messageInput}
            onChange={handleInputTextChange}
            value={inputText}
            maxLength={maxTextLength}
          />
        </label>
        <button className={styles.submitInput} type="submit">
          <img src="/send-button.png" height={25}/>
        </button>
        {/* <input className={styles.submitInput} type="image" name="submit" src="/send-button.png" border="0"/> */}
      </form>
    </div>
  );
};
export default MessageInput;
