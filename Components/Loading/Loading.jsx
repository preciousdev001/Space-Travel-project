import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>SYSTEM INITIALIZATION IN PROGRESS...</p>
    </div>
  );
}

export default Loading;
