import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styles from "./Agenda.module.css";

type event = {
  title: string;
  time: string;
  description: string;
  index: number;
};

type props = {
  agenda: Array<event>;
};

const Agenda = (props: props) => {
  const agenda = props.agenda;
  agenda.sort((a, b) =>
    a.index != undefined && b.index != undefined ? a.index - b.index : -10000
  );
  return (
    <VerticalTimeline>
      {agenda.map((event: event) => {
        return (
          <VerticalTimelineElement
            key={event.index}
            className={styles.verticalTimelineElementWork}
            contentStyle={{
              background: "#ffffff",
              color: "#fff",
              // boderTop: "7px solid black",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #ffffff" }}
            date={event.time}
            dateClassName={styles.verticalTimelineElementDate}
            iconStyle={{
              background: "#efefef",
              color: "#fff",
            }}
          >
            <h3 className={styles.verticalTimelineElementTitle}>
              {event.title}
            </h3>
            <p className={styles.verticalTimelineElementDescription}>
              {event.description}
            </p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};
export default Agenda;
