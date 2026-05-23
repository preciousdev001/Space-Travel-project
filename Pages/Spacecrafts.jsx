import { useState, useEffect } from "react";
import loading from "../Components/Loading/Loading";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function Spacecrafts() {
  const [spaceCrafts, setSpaceCrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSpaceCraftsData() {
      setIsLoading(true);
      try {
        // const response = await fetch("getSpacecrafts"); - not necessary since we aren't using actual api
        const data = await SpaceTravelApi.getSpacecrafts();
        setSpaceCrafts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSpaceCraftsData();
  }, []);

  if (isLoading) {
    return <loading />;
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
              <button>Decommision Spacecraft</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Spacecrafts;
