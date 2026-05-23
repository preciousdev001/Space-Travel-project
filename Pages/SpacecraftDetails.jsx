import { useState, useEffect } from "react";
import loading from "../Components/Loading/Loading";

function SpacecraftDetails({ data }) {
  const [spaceCraftDetails, setSpaceCraftDetails] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSpaceCraftDetailsData() {
      setIsLoading(true);

      try {
        const response = await fetch("API_HERE");
        const data = await response.json;
        setSpaceCraftDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isloading) {
    return <loading />;
  }

  return (
    <div>
      <h1>Spacecraft Details</h1>
      {/* {spacecfraft details content and data goes here} */}
    </div>
  );
}

export default SpacecraftDetails;
