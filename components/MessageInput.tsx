import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./MessageInput.module.css";

const MessageInput = () => {
  const [inputText, setInputText] = useState("");
  const [username, setUsername] = useState("");

  const maxTextLength = 55;

  const handleInputTextChange = (event: { target: { value: string } }) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      setUsername(name);
    }
  }, []);

  const handleMessageSubmit = (event: SyntheticEvent) => {
    if (!inputText || inputText.length > maxTextLength) {
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
        name: username,
        text: inputText,
        side: sessionStorage.getItem("side"),
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
        <input className={styles.submitInput} type="submit" value="Send" />
      </form>
    </div>
  );
};
export default MessageInput;
