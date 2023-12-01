import React from "react";
import { BasePage } from "../../shared/layouts";
import { useDrawerContext } from "../../shared/contexts";
import { Button } from "@mui/material";
import { DetailToolBar } from "../../shared/components";

export const Dashboard: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <BasePage
      title="Página Inicial"
      toolBar={<DetailToolBar showSaveAndBackBotton />}
    >
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Menu
      </Button>
    </BasePage>
  );
};
