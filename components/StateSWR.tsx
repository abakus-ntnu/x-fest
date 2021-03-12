import styles from "./StateSWR.module.css";

const StateSWR = ({ error }: { error?: boolean }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(48deg, var(--abakus) 50%, var(--online) 50%)",
      }}
    >
      {error ? (
        <h1 style={{ color: "white" }}>Noe gikk galt :(</h1>
      ) : (
        <svg className={styles.spinner} viewBox="0 0 50 50">
          <circle
            className={styles.path}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      )}
    </div>
  );
};
export default StateSWR;
