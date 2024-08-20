import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../components/BaseLayout";
import UserPage from "../pages/UserPage";
import KoreanPage from "../pages/KoreanPage";
import KoreanRegisterPage from "../pages/KoreanRegisterPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import QuestionPage from "../pages/QuestionPage";
import QuestionRegisterPage from "../pages/QuestionRegisterPage";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // 토큰이 존재하면 true, 그렇지 않으면 false를 반환합니다.
};

const PrivateRoute = ({ Component }) => {
  return isAuthenticated() ? (
    <BaseLayout>
      <Component />
    </BaseLayout>
  ) : (
    <Navigate to="/" />
  );
};

const Router = () => {
  const privateRoutes = [
    { path: "/korean", Component: KoreanPage },
    { path: "/korean/register", Component: KoreanRegisterPage },
    { path: "/korean/:id", Component: KoreanRegisterPage },
    { path: "/question", Component: QuestionPage },
    { path: "/question/register", Component: QuestionRegisterPage },
    { path: "/user", Component: UserPage },
    { path: "/user/register", Component: UserRegisterPage },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {privateRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute Component={Component} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
