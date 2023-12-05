import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListCities } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Página Inicial",
      },
      {
        icon: "location_city",
        path: "/cities",
        label: "Cidades",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/cities" element={<ListCities />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
