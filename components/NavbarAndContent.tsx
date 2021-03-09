import React, { ChangeEvent, useState } from "react";
import Agenda from "./Agenda";
import Infobox from "./Infobox";
import styles from "./NavbarAndContent.module.css";
import Game from "./Game";
import TRexRunner from "./TRexRunner";
type prop = {
  data: { info: { text: string }; agenda: []; gameScore: [] };
};

const NavBarAndContent = ({ data }: prop) => {
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
          <div>INFO</div>
        </label>
        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="gallery"
            onChange={handleTabChange}
          />
          <div>BILDER</div>
        </label>

        <label className={styles.navbarButton}>
          <input
            type="radio"
            name="tab"
            value="spill"
            onChange={handleTabChange}
          />
          <div>SPILL</div>
        </label>
      </form>

      {currentTab === "info" && (
        <div className={styles.infoContent}>
          <Infobox md={data.info.text} />
          <Agenda agenda={data.agenda} />
        </div>
      )}
      {currentTab === "gallery" && <div></div>}
      {currentTab === "spill" && <TRexRunner/>}

    </div>
  );
};

//{currentTab === "spill" && <Game gameScore={data.gameScore}/>}
export default NavBarAndContent;
