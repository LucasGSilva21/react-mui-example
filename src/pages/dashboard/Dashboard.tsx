import React from "react";
import { BasePage } from "../../shared/layouts";
import { useDrawerContext } from "../../shared/contexts";
import { Button } from "@mui/material";

export const Dashboard: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <BasePage title="Página Inicial" toolBar={<></>}>
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Menu
      </Button>
    </BasePage>
  );
};
