import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>Page Non Existent</h1>
      <p className={styles["not-found__description"]}>
        The page you've searched for does not exist in this universe.
      </p>
      <button
        className={styles["not-found__button"]}
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
