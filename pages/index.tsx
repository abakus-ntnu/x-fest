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

console.log(socket);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/state", fetcher);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("name") && sessionStorage.getItem("side"))
      setIsUserRegistered(true);
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // const ActualIndex = () => {
  //   return (
  //     <div className={styles.ActualIndex}>
  //       <div style={{ gridArea: "title" }}>Hei</div>
  //       <div style={{ gridArea: "stream", backgroundColor: "black" }}>Hei</div>
  //       <div style={{ gridArea: "chat" }}>
  //         <MessageList socket={socket} />
  //         <MessageInput />
  //       </div>
  //       <div style={{ gridArea: "score" }}>
  //         <Bar
  //           pointsToAbakus={data.score[0].abakus}
  //           pointsToOnline={data.score[0].abakus}
  //         ></Bar>
  //       </div>
  //       <div style={{ gridArea: "navbar" }}></div>
  //       <div style={{ gridArea: "navbar-content" }}>
  //         <Infobox md={data.info[0].info} />
  //         <Agenda agenda={data.agenda} />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      {isUserRegistered ? (
        // <Infobox md={"# Hello World \n [google](https://google.com)"}></Infobox>
        <ActualIndex data={data} socket={socket} />
      ) : (
        <WelcomeForm setIsUserRegistered={setIsUserRegistered} />
      )}
    </>
  );
};
export default Index;
