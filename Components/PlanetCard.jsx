import React from "react";

function PlanetCard({ planet, allSpacecrafts, allPlanets, onMoveComplete }) {
  const dockedShips = allSpacecrafts.filter(
    (ship) => ship.currentLocation === planet.id,
  );
  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <ul>
        {dockedShips.map((ship) => (
          <li key={ship.id}>{ship.name}</li>
        ))}
      </ul>
      <p>{planet.population}</p>
    </div>
  );
}

export default PlanetCard;
