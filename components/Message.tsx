import MessageStyle from "./Message.module.css";
import myMessageStyle from "./MyMessage.module.css";

const Message = ({
  message,
}: {
  message: { name: string; text: string; avatar: string };
}) => {
  const styles =
    message.name === sessionStorage.getItem("name")
      ? myMessageStyle
      : MessageStyle;

  const avatarLink = "/" + message.avatar + ".png";
  return (
    <div className={styles.message}>
      <img className={styles.picture} src={avatarLink} />
      <div className={styles.content}>
        <div className={styles.name}>{message.name}</div>
        <div className={styles.text}>{message.text}</div>
      </div>
    </div>
  );
};
export default Message;
