import Agenda from "./Agenda";
import Bar from "./Bar";
import Infobox from "./Infobox";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ActualIndex.module.css";
import NavBarAndContent from "./NavbarAndContent";
import Stream from "./Stream";

type prop = {
  data: {
    score: { abakus: number; online: number };
    info: { text: string };
    agenda: [];
    stream: { streamId: string };
  };
  socket: SocketIOClient.Socket;
};

const ActualIndex = ({ data, socket }: prop) => {
  return (
    <div className={styles.ActualIndex}>
      <div style={{ gridArea: "title" }}>Hei</div>
      <div style={{ gridArea: "stream", backgroundColor: "black" }}>
        <Stream streamId={data.stream.streamId}/>
      </div>
      <div style={{ gridArea: "chat" }}>
        <MessageList socket={socket} />
        <MessageInput />
      </div>
      <div style={{ gridArea: "score" }}>
        <Bar
          pointsToAbakus={data.score.abakus}
          pointsToOnline={data.score.online}
        ></Bar>
      </div>
      <div style={{ gridArea: "navbar-and-content" }}>
        <NavBarAndContent data={data}></NavBarAndContent>
      </div>
    </div>
  );
};

export default ActualIndex;
