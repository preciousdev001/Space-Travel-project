import React from "react";
import styles from "./Error.module.css";

function Error({ message }) {
  return (
    <div className={styles["error-banner"]}>
      <span style={{ fontSize: "24px" }}>⚠️</span>
      <div className={styles["error-banner__content"]}>
        <h3 className={styles["error-banner__title"]}>System Malfunction</h3>
        <p className={styles["error-banner__message"]}>
          {message || "An unexpected disruption has occured."}
        </p>
      </div>
    </div>
  );
}

export default Error;
