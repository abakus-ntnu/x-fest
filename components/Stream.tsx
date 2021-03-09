import YouTube, { YouTubeProps } from 'react-youtube';
import styles from './Stream.module.css';

type prop = {
  streamId: string,
}

const Stream = ( {streamId} : prop ) => {
  const videoOpts : YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };
  return (
    <div className={styles.youtubeWrapper}>
      <YouTube
        containerClassName={styles.youtube}
        videoId={streamId}
        opts={videoOpts}
        className={styles.youtubeActual}
      />
    </div>
  );
};
export default Stream;
