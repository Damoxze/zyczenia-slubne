import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formularz from "./Formularz";
import Panel from "./Panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formularz />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </Router>
  );
}

export default App;
