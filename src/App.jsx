import { BrowserRouter, routes, route } from "react-router-dom";

import NavBar from "../Components/NavBar";
import navigateBackButton from "../Components/NavigateBackButton";
import Homepage from "../Pages/Home";
import spacecrafts from "../Pages/Spacecrafts";
import SpacecraftDetails from "../Pages/SpacecraftDetails";
import spacecraftsNew from "../Pages/SpacecraftsNew";
import planets from "../Pages/Planets";

import styles from "./App.module.css";
import NavigateBackButton from "../Components/NavigateBackButton";

function App() {
  const data = [];
  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        <NavBar data={data} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Planets" element={<Planets />} />
          <Route path="/New-Spacecraft" element={<SpacecraftsNew />} />

          {/* dynamic routing */}
          {data.map((dataElement) => (
            <Route
              key={dataElement.id}
              path={`/SpacecraftDetails/${dataElement.id}`}
              element={<SpacecraftDetails data={dataElement} />}
            />
          ))}
        </Routes>

        <NavigateBackButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
