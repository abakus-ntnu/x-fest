import useSWR from "swr";
import socketIOClient, { Socket } from "socket.io-client";
import styles from "./index.module.css";

import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import Bar from "../components/Bar";
import Agenda from "../components/Agenda";
import Infobox from "../components/Infobox";
import WelcomeForm from "../components/WelcomeForm";
import { useEffect, useState } from "react";
import { Info } from "../models/schema";
import ActualIndex from "../components/ActualIndex";

const socket: SocketIOClient.Socket = socketIOClient(
  process.env.NEXT_PUBLIC_SOCKET_URL!
);

//console.log(socket);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/state", fetcher);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const [name, side] = [
      sessionStorage.getItem("name"),
      sessionStorage.getItem("side"),
    ];

    if (name && side) {
      if (name.length <= 20 && ["abakus", "online"].includes(side)) {
        setBackgroundImage(side);
      }
    }
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(var(--${backgroundImage}), black)`
          : "linear-gradient(48deg, var(--abakus) 50%, var(--online) 50%)",
      }}
    >
      {backgroundImage ? (
        <ActualIndex data={data} socket={socket} />
      ) : (
        <WelcomeForm setBackgroundImage={setBackgroundImage} />
      )}
    </div>
  );
};
export default Index;
