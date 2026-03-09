// App.jsx
import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreateCarPage from "./pages/CreateCarPage.jsx";
import CarDetailPage from "./pages/CarDetailPage.jsx";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCarPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/:id" element={<CarDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;