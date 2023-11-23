import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "../App";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Página Inicial",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={App()} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
