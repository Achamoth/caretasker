import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProviderPage } from "./Provider/ProviderPage";
import styles from "./App.module.css";
import { TopBar } from "./TopBar";
import { NavBar } from "./NavBar";

function App() {
  return (
    <>
      <div className={styles.header}>
        <TopBar />
      </div>
      <div className={styles.twoPanel}>
        <div className={styles.navBar}>
          <NavBar />
        </div>
        <div className={styles.content}>
          <Router>
            <Routes>
              <Route
                path="providers/:providerName"
                element={<ProviderPage />}
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
