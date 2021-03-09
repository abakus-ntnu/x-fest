import styles from "./Infobox.module.css";

type props = {
  md: String;
};

const Infobox = ({ md }: props) => {
  const marked = require("marked");

  // Sanitaze just in case
  const dompurify = require("dompurify");
  const sanitizer = dompurify.sanitize;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizer(marked(md)) }}
      className={styles.content}
    />
  );
};

export default Infobox;
