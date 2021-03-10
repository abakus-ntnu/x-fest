import React, { ChangeEvent, useState } from "react";
import Agenda from "./Agenda";
import Infobox from "./Infobox";
import styles from "./NavbarAndContent.module.css";

type prop = {
  data: { info: { text: string }; agenda: [] };
};

const NavBarAndContent = ({ data }: prop) => {
  const [currentTab, setCurrentTab] = useState("info");
  const tabs = ["info", "gallery", "spill"];

  const handleTabChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTab(event.target.value);
  };

  console.log(data.info.text);
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
            <img className={styles.icon} src="/info.png" height={30}/>
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
            <img className={styles.icon} src="/images.png" height={30}/>
            BILDER
          </div>
        </label>

        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="spill"
            onChange={handleTabChange}
          />
          <div className={styles.buttonContent}>
            <img className={styles.icon} src="/game.png" height={30}/>
            SPILL
          </div>
        </label>
      </form>

      {currentTab === "info" && (
        <div className={styles.infoContent}>
          <Infobox md={data.info.text} />
          <Agenda agenda={data.agenda} />
        </div>
      )}
      {currentTab === "gallery" && <div></div>}
      {currentTab === "spill" && (
        <div>{/* IFRAME OR GAME COMPONENT GOES HERE:) */}</div>
      )}
    </div>
  );
};

export default NavBarAndContent;
