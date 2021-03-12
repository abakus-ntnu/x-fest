import Agenda from "./Agenda";
import Bar from "./Bar";
import Infobox from "./Infobox";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ActualIndex.module.css";
import NavBarAndContent from "./NavbarAndContent";
import Stream from "./Stream";
import Image from "next/image";
import { SetStateAction } from "react";

type imageProps = {
  url: string;
  approved: boolean;
};

type prop = {
  data: {
    score: { abakus: number; online: number };
    info: { text: string };
    agenda: [];
    gameScore: [];
    stream: { streamId: string };
    images: [imageProps];
  };
  socket: SocketIOClient.Socket;
  setImageCount(value: SetStateAction<number>): void;
};
export type { prop };

const ActualIndex = ({ data, socket, setImageCount }: prop) => {
  return (
    <div className={styles.actualIndex}>
      <div style={{ height: "110px", position: "relative" }}>
        <Image
          className={styles.title}
          src="/x-fest_logo.png"
          alt="X-fest"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.streamAndChat}>
        <div className={styles.stream}>
          <Stream streamId={data.stream.streamId} />
        </div>
        <div className={styles.chat}>
          <MessageList socket={socket} />
          <MessageInput />
        </div>
      </div>
      <div className={styles.bar}>
        <Bar
          pointsToAbakus={data.score.abakus}
          pointsToOnline={data.score.online}
        ></Bar>
      </div>
      <div className={styles.navBarAndContent}>
        <NavBarAndContent
          data={data}
          setImageCount={setImageCount}
        ></NavBarAndContent>
      </div>
    </div>
  );
};

export default ActualIndex;
