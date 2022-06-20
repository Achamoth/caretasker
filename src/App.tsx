import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProviderPage } from "./Provider/ProviderPage";
import styles from "./App.module.css";
import { TopBar } from "./Bars/TopBar";
import { NavBar } from "./Bars/NavBar";

function App() {
  return (
    <>
      <div className={styles.header}>
        <TopBar />
      </div>
      <div className={styles.twoPanel}>
        <Router>
          <div className={styles.navBar}>
            <NavBar />
          </div>
          <div className={styles.content}>
            <Routes>
              <Route
                path="providers/:providerName"
                element={<ProviderPage />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
