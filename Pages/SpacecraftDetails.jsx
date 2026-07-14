import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import SpaceTravelApi from "../src/services/SpaceTravelApi";
import Error from "../Components/Error";
import styles from "./SpacecraftDetails.module.css";

function SpacecraftDetails({ data }) {
  const { id } = useParams();
  const [spaceCraftDetails, setSpaceCraftDetails] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpaceCraftDetailsData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await SpaceTravelApi.getSpacecraftById({ id });
      setSpaceCraftDetails(response.data);
    } catch (err) {
      setError("Failed to establish secure connection to spacecraft details.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaceCraftDetailsData();
  }, [id]);

  if (isloading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!spaceCraftDetails || spaceCraftDetails.length === 0) {
    return (
      <div className={styles.details}>
        No spacecfraft data found for this specific registry link.
      </div>
    );
  }

  const techSpecs = [
    { label: "Name", value: spaceCraftDetails.name, highlight: true },
    { label: "Type", value: spaceCraftDetails.type },
    { label: "Capacity", value: `${spaceCraftDetails.capacity} Passengers` },
    {
      label: "Description",
      value: spaceCraftDetails.description,
      highlight: true,
    },
  ];

  return (
    <div className={styles.details}>
      <div className={styles["details__header"]}>
        <h1 className={styles["details__title"]}>Spacecraft Details</h1>
      </div>

      <div className={styles["details__grid"]}>
        {techSpecs.map((spec, index) => (
          <div key={index} className={styles["details__row"]}>
            <span className={styles["details__label"]}>{spec.label}</span>
            <span
              className={`${styles["details__value"]} ${spec.highlight ? styles["details__value--highlight"] : ""}`}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpacecraftDetails;
