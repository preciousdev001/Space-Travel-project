import { useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import SpaceTravelApi from "../../src/services/SpaceTravelApi";
import PlanetCard from "./PlanetCard";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [planetsData, spacecraftsData] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);
      //   console.log("Spacecrafts Array arrived:", spacecraftsData);
      setPlanets(planetsData.data);
      setSpacecrafts(spacecraftsData.data);
    } catch (err) {
      setError("Transmission Failed... Could NOT connect to fleet registry.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    // loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Planets</h1>
      {/* testing arrays loading */}
      <pre>
        {JSON.stringify({
          planetsCount: planets.length,
          shipsCount: spacecrafts.length,
        })}
      </pre>

      <div className="planets-container">
        {planets.map((planet) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
            allSpacecrafts={spacecrafts}
            allPlanets={planets}
            onMoveComplete={loadData}
          />
        ))}
      </div>
    </div>
  );
}

export default Planets;
