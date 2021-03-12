import useSWR from "swr";
import socketIOClient from "socket.io-client";
import styles from "./index.module.css";

import WelcomeForm from "../components/WelcomeForm";
import { useEffect, useState } from "react";
import ActualIndex from "../components/ActualIndex";
import StateSWR from "../components/StateSWR";

const socket: SocketIOClient.Socket = socketIOClient(
  process.env.NEXT_PUBLIC_SOCKET_URL!
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const [imageCount, setImageCount] = useState<number>(30);
  const { data, error } = useSWR(["/api/state/" + imageCount], fetcher, {
    refreshInterval: 5000,
  });
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

  if (error) return <StateSWR error={true} />;
  if (!data) return <StateSWR />;

  console.log(imageCount);

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
        <ActualIndex
          data={data}
          socket={socket}
          setImageCount={setImageCount}
        />
      ) : (
        <WelcomeForm setBackgroundImage={setBackgroundImage} />
      )}
    </div>
  );
};
export default Index;
