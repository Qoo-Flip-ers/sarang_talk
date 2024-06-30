import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../components/BaseLayout";
import UserPage from "../pages/UserPage";
import KoreanPage from "../pages/KoreanPage";
import KoreanRegisterPage from "../pages/KoreanRegisterPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import QuestionPage from "../pages/QuestionPage";
import QuestionRegisterPage from "../pages/QuestionRegisterPage";

const Router = () => {
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
          path="/korean/register"
          element={
            <BaseLayout>
              <KoreanRegisterPage />
            </BaseLayout>
          }
        />
        <Route
          path="/question"
          element={
            <BaseLayout>
              <QuestionPage />
            </BaseLayout>
          }
        />
        <Route
          path="/question/register"
          element={
            <BaseLayout>
              <QuestionRegisterPage />
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
        <Route
          path="/user/register"
          element={
            <BaseLayout>
              <UserRegisterPage />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
