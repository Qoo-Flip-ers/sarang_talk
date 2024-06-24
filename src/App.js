import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BaseLayout from "./components/BaseLayout";
import UserPage from "./pages/UserPage";
import KoreanPage from "./pages/KoreanPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/korean"
          element={
            <BaseLayout>
              <KoreanPage />
            </BaseLayout>
          }
        />
        <Route
          path="/user"
          element={
            <BaseLayout>
              <UserPage />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
