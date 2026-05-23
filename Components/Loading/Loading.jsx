import styles from "./Loading.module.css";

function loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>SYSTEM INITIALIZATION IN PROGRESS...</p>
    </div>
  );
}

export default loading;
