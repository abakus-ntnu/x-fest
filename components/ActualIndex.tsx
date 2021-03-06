import Agenda from "./Agenda";
import Bar from "./Bar";
import Infobox from "./Infobox";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ActualIndex.module.css";

type prop = {
  data: {
    score: [{ abakus: number; online: number }];
    info: [{ info: string }];
    agenda: [];
  };
  socket: SocketIOClient.Socket;
};

const ActualIndex = ({ data, socket }: prop) => {
  return (
    <div className={styles.ActualIndex}>
      <div style={{ gridArea: "title" }}>Hei</div>
      <div style={{ gridArea: "stream", backgroundColor: "black" }}>Hei</div>
      <div style={{ gridArea: "chat" }}>
        <MessageList socket={socket} />
        <MessageInput />
      </div>
      <div style={{ gridArea: "score" }}>
        <Bar
          pointsToAbakus={data.score[0].abakus}
          pointsToOnline={data.score[0].online}
        ></Bar>
      </div>
      <div style={{ gridArea: "navbar" }}></div>
      <div style={{ gridArea: "navbar-content" }}>
        <Infobox md={data.info[0].info} />
        <Agenda agenda={data.agenda} />
      </div>
    </div>
  );
};

export default ActualIndex;
