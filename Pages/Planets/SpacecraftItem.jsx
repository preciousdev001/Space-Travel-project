import React, { useState } from "react";
import SpaceTravelApi from "../../src/services/SpaceTravelApi";

function SpacecraftItem({ ship, allPlanets, currentPlanetId, onMoveComplete }) {
  const [isMoving, setIsMoving] = useState(false);

  const handleTransfer = async (targetPlanetId) => {
    if (!targetPlanetId) return;
    try {
      await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId: ship.id,
        targetPlanetId,
      });
      setIsMoving(false);
      onMoveComplete();
    } catch (err) {
      alert("Hyperdrive Malfunction: Transfer Failed.");
      console.log(err);
    }
  };

  return (
    <li>
      <span>{ship.name}</span>
      <button onClick={() => setIsMoving(!isMoving)}>
        {isMoving ? "Cancel" : "Move"}
      </button>

      {isMoving && (
        <select onChange={(e) => handleTransfer(e.target.value)}>
          <option value="">Destinations...</option>
          {allPlanets
            .filter((p) => p.id !== currentPlanetId)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
      )}
    </li>
  );
}

export default SpacecraftItem;
