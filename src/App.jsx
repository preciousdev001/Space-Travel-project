import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../Components/NavBar";
import navigateBackButton from "../Components/NavigateBackButton";
import Homepage from "../Pages/Home";
import spacecrafts from "../Pages/Spacecrafts";
import SpacecraftDetails from "../Pages/SpacecraftDetails";
import SpacecraftsNew from "../Pages/SpacecraftsNew";
import Planets from "../Pages/Planets/Planets";
import NotFound from "../Pages/NotFound";

import styles from "./App.module.css";
import NavigateBackButton from "../Components/NavigateBackButton";
import Spacecrafts from "../Pages/Spacecrafts";

function App() {
  const data = [
    { id: "Planets", title: "Planets" },
    { id: "Spacecrafts", title: "Spacecrafts" },
    { id: "New-Spacecraft", title: "Add Spacecraft" },
  ];
  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        <NavBar data={data} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Planets" element={<Planets />} />
          <Route path="/Spacecrafts" element={<Spacecrafts />} />
          <Route path="/New-Spacecraft" element={<SpacecraftsNew />} />

          {/* {redirects all unknown routes to homepage} */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}

          {/* redirects all unknown routes to an error page */}
          <Route path="/NotFound" element={<NotFound />} />

          {/* dynamic routing */}
          <Route
            path="/SpacecraftDetails/:id"
            element={<SpacecraftDetails />}
          />
        </Routes>

        <NavigateBackButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
