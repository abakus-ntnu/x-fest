import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import styles from "./MessageList.module.css";

type message = {
  name: string;
  text: string;
  side: string;
};

const MessageList = ({ socket }: { socket: SocketIOClient.Socket }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<message[]>([]);
  const [noOverflow, setNoOverflow] = useState(true);

  const addMessage = (message: message) => {
    const maxMessages = 50;

    if (listRef && listRef.current) {
      const oldBottom =
        listRef.current.scrollHeight - listRef.current.clientHeight;

      setMessages(
        (prevMessages: Array<message>): Array<message> => {
          if (prevMessages.length > maxMessages) {
            prevMessages.shift();
          }
          return [...prevMessages, message];
        }
      );
      setNoOverflow(messages.length < maxMessages);

      if (noOverflow) {
        const bottom =
          listRef.current.scrollHeight - listRef.current.clientHeight;

        if (listRef.current.scrollTop >= oldBottom - 150)
          listRef.current.scrollTo(0, bottom);
      }
    }
  };

  useEffect(() => {
    socket.on("message", addMessage);
    return () => {
      socket.off("message", addMessage);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.messageListHeader}>
        <h2 className={styles.chatH2}>#chat</h2>
      </div>
      <div className={styles.frame}>
        <div className={styles.list} ref={listRef}>
          {messages.map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MessageList;
