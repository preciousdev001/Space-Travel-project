import { useState, useEffect } from "react";
import loading from "../Components/Loading/Loading";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPlanetsData() {
      setIsLoading(true);
      try {
        const response = await fetch("API-PLACEHOLDER_HERE");
        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlanetsData();
  }, []);

  if (isLoading) {
    return <loading />;
  }

  return (
    <div>
      <h1>Planets</h1>
      {/* {content page for planets} */}
    </div>
  );
}

export default Planets;
