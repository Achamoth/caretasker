import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProviderPage } from "./ProviderPage";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.header}>Caretasker</div>
      <Router>
        <Routes>
          <Route path="providers/:providerName" element={<ProviderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
