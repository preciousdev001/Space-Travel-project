import React from "react";
import SpacecraftItem from "./SpacecraftItem";
import styles from "./PlanetCard.module.css";

function PlanetCard({ planet, allSpacecrafts, allPlanets, onMoveComplete }) {
  const dockedShips = allSpacecrafts.filter(
    (ship) => ship.currentLocation === planet.id,
  );
  return (
    <div className={styles.card}>
      <div className={styles["card__header"]}>
        <h2 className={styles["card__title"]}>{planet.name}</h2>
        <p className={styles["card__system-status"]}>
          Current Population:
          {planet.currentPopulation}
        </p>
      </div>

      <div className={styles["card__body"]}>
        <h4 className={styles["card__vessel-heading"]}>
          Docked Vessels ({dockedShips.length}):
        </h4>
        <ul className={styles["card__metric"]}>
          {dockedShips.map((ship) => (
            <SpacecraftItem
              key={ship.id}
              ship={ship}
              allPlanets={allPlanets}
              currentPlanetId={planet.id}
              onMoveComplete={onMoveComplete}
            ></SpacecraftItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanetCard;
