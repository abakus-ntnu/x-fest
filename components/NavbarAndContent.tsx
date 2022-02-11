import React, { ChangeEvent, useState } from "react";
import Agenda from "./Agenda";
import Infobox from "./Infobox";
import Gallery from "./Gallery";
import styles from "./NavbarAndContent.module.css";
import Game from "./Game";
import { prop } from "./ActualIndex";

// type prop = {
//   data: { info: { text: string }; agenda: []; gameScore: [] };
// };

type dataProps = {
  data: prop["data"];
};

const NavBarAndContent = ({ data }: dataProps) => {
  const [currentTab, setCurrentTab] = useState("info");
  const tabs = ["info", "gallery", "spill"];

  const handleTabChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTab(event.target.value);
  };
  return (
    <div>
      <form
        className={styles.navbar}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="info"
            onChange={handleTabChange}
            defaultChecked
          />
          <div className={styles.buttonContent}>
            <img className={styles.icon} src="/info.png" height={30} />
            INFO
          </div>
        </label>
        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="gallery"
            onChange={handleTabChange}
          />
          <div className={styles.buttonContent}>
            <img className={styles.icon} src="/images.png" height={30} />
            BILDER
          </div>
        </label>

    {/*
        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="spill"
            onChange={handleTabChange}
          />
          <div className={styles.buttonContent}>
            <img className={styles.icon} src="/game.png" height={30} />
            SPILL
          </div>
        </label>

    */}
      </form>

      {currentTab === "info" && (
        <div className={styles.infoContent}>
          <Infobox md={data?.info?.text} />
          <Agenda agenda={data?.agenda} />
        </div>
      )}
      {currentTab === "gallery" && (
        <div>
          <Gallery images={data?.images} />
        </div>
      )}
      {currentTab === "spill" && (
        <div>
          <Game gameScore={data?.gameScore} />
        </div>
      )}
    </div>
  );
};

export default NavBarAndContent;
