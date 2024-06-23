import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import { Typography, Button } from "antd";
const { Title } = Typography;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/signin" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const Introduce = () => {
  const navigate = useNavigate();

  const goToSign = () => {
    navigate("/signin");
  };

  const goToLogIn = () => {
    navigate("/login");
  };

  return (
    <div>
      <Title>Go to Page</Title>
      <Button onClick={goToSign}>Sign In</Button>
      <Button onClick={goToLogIn}>Log In</Button>
    </div>
  );
};

export default App;
