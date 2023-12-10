import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListCities, ListCustomers } from "../pages";

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
        icon: "people",
        path: "/customers",
        label: "Clientes",
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
      <Route path="/customers" element={<ListCustomers />} />
      <Route path="/customers/:id" element={<p>Detalhe</p>} />
      <Route path="/cities" element={<ListCities />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
