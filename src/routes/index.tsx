import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "../App";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={App()} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
