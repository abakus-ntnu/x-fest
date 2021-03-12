import YouTube, { YouTubeProps } from "react-youtube";
import styles from "./Stream.module.css";

type prop = {
  streamId: string;
};

const Stream = ({ streamId }: prop) => {
  const videoOpts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1, // remember to change to 1
      playsinline: 1,
    },
  };
  return (
    <YouTube
      containerClassName={styles.youtube}
      videoId={streamId}
      opts={videoOpts}
      className={styles.youtubeActual}
    />
  );
};
export default Stream;
