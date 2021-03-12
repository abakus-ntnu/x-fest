import styles from "./Bar.module.css";

type props = {
  pointsToAbakus: number;
  pointsToOnline: number;
};

const Bar = ({ pointsToAbakus, pointsToOnline }: props) => {
  return (
    <div className={styles.container} style={{ display: "flex" }}>
      <div className={styles.leftText}>{pointsToAbakus} p</div>
      <div className={styles.rightText}>{pointsToOnline} p</div>
      <div
        style={{ flex: pointsToAbakus == 0 ? 1 : pointsToAbakus, backgroundColor: "var(--abakus)" }}
      ></div>
      <div
        style={{ flex: pointsToOnline == 0 ? 1 : pointsToOnline, backgroundColor: "var(--online)" }}
      ></div>
      <div className={styles.centerLine} />
    </div>
  );
};

export default Bar;
