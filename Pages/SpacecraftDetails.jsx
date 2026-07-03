import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import SpaceTravelApi from "../src/services/SpaceTravelApi";

function SpacecraftDetails({ data }) {
  const { id } = useParams();
  const [spaceCraftDetails, setSpaceCraftDetails] = useState([]);
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
    return <div>Error: {error}</div>;
  }

  if (!spaceCraftDetails || spaceCraftDetails.length === 0) {
    return (
      <div>No spacecfraft data found for this specific registry link.</div>
    );
  }

  return (
    <div>
      <h1>Spacecraft Details</h1>
      <div>
        <p>Name: {spaceCraftDetails.name}</p>
        <p>Type: {spaceCraftDetails.type}</p>
        <p>Capacity: {spaceCraftDetails.capacity} Passengers</p>
        <p>Description: {spaceCraftDetails.description}</p>
      </div>
    </div>
  );
}

export default SpacecraftDetails;
