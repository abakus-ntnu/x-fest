import MessageStyle from "./Message.module.css";
import myMessageStyle from "./MyMessage.module.css";

const Message = ({
  message,
}: {
  message: { name: string; text: string; side: string };
}) => {
  const styles =
    message.name === sessionStorage.getItem("name")
      ? myMessageStyle
      : MessageStyle;

  return (
    <div className={styles.message}>
      <div
        className={styles.profilepic}
        style={{ backgroundColor: message.side == "abakus" ? "red" : "blue" }}
      >
        {message.name[0].toUpperCase()}
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{message.name}</div>
        <div className={styles.text}>{message.text}</div>
      </div>
    </div>
  );
};
export default Message;
