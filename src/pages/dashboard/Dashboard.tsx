import React from "react";
import { BasePage } from "../../shared/layouts";
import { useAppThemeContext, useDrawerContext } from "../../shared/contexts";
import { Button } from "@mui/material";

export const Dashboard: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <BasePage title="Página Inicial">
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Menu
      </Button>
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Trocar tema
      </Button>
    </BasePage>
  );
};
