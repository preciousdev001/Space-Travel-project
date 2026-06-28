import React from "react";
import SpacecraftItem from "./SpacecraftItem";

function PlanetCard({ planet, allSpacecrafts, allPlanets, onMoveComplete }) {
  const dockedShips = allSpacecrafts.filter(
    (ship) => ship.currentLocation === planet.id,
  );
  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <ul>
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
      <p>{planet.population}</p>
    </div>
  );
}

export default PlanetCard;
