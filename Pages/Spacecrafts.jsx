import { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
import Error from "../Components/Error";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Spacecrafts() {
  const [spaceCrafts, setSpaceCrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSpaceCraftsData() {
    try {
      setIsLoading(true);
      // const response = await fetch("getSpacecrafts"); - not necessary since we aren't using actual api
      const data = await SpaceTravelApi.getSpacecrafts();
      console.log(" What does my API data look like?", data);
      setSpaceCrafts(data.data);
    } catch (error) {
      console.error(error);
      setError(
        "Failed to establish secure connection to spacecrafts registry.",
      );
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchSpaceCraftsData();
  }, []);

  async function handleDestroy(id) {
    try {
      setError(null);
      await SpaceTravelApi.destroySpacecraftById({ id });
      await fetchSpaceCraftsData();
    } catch (error) {
      console.error(error);
      setError("Failed decommission request for this spacecraft.");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h1>Spacecrafts</h1>

      <div className="spacecraft-list">
        {
          /* { content for spacecrafts} */
          spaceCrafts.map((craft) => (
            <div key={craft.id} className="spacecraft-card">
              <h3>{craft.name}</h3>
              <button>View Details</button>
              <button>Decommission Spacecraft</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Spacecrafts;
