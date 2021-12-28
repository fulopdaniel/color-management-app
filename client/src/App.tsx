import React from "react";
import "./styles/global.scss";
import { Routes, Route } from "react-router-dom";
import { ColorList } from "./pages/ColorList";
import { Color } from "./pages/Color";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ColorList />} />
      <Route path="/colors" element={<ColorList />} />
      <Route path="/colors/:color" element={<Color />} />
      <Route path="/addcolor" element={<Color />} />
    </Routes>
  );
};

export default App;
