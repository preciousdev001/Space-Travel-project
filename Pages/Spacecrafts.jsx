import { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Spacecrafts() {
  const [spaceCrafts, setSpaceCrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSpaceCraftsData() {
    try {
      setIsLoading(true);
      // const response = await fetch("getSpacecrafts"); - not necessary since we aren't using actual api
      const data = await SpaceTravelApi.getSpacecrafts();
      console.log(" What does my API data look like?", data);
      setSpaceCrafts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchSpaceCraftsData();
  }, []);

  async function handleDestroy(id) {
    try {
      await SpaceTravelApi.destroySpacecraftById({ id });
      await fetchSpaceCraftsData();
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Spacecrafts</h1>

      <div className="spacecraft-list">
        {
          /* { content for spacecrafts} */
          spaceCrafts.map((craft) => (
            <div key="craft.id" className="spacecraft-card">
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
