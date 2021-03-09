import { useState } from "react";
import styles from "./Bar.module.css";

type props = {
  pointsToAbakus: number;
  pointsToOnline: number;
};

const Bar = ({ pointsToAbakus, pointsToOnline }: props) => {
  return (
    <div className={styles.container} style={{ display: "flex" }}>
      <div
        style={{ flex: pointsToAbakus, backgroundColor: "var(--abakus)" }}
      ></div>
      <div
        style={{ flex: pointsToOnline, backgroundColor: "var(--online)" }}
      ></div>
    </div>
  );
};

export default Bar;
