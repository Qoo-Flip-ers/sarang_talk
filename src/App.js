import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
