import useSWR from "swr";
import socketIOClient, { Socket } from "socket.io-client";
import styles from "./index.module.css";

import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import Bar from "../components/Bar";
import Agenda from "../components/Agenda";

const socket: SocketIOClient.Socket = socketIOClient(
  process.env.NEXT_PUBLIC_SOCKET_URL!
);

console.log(socket);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/state", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <MessageList socket={socket} />
      <MessageInput />
    </>
  );
};
export default Index;
