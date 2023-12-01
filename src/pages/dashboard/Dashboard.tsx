import React from "react";
import { BasePage } from "../../shared/layouts";
import { useDrawerContext } from "../../shared/contexts";
import { Button } from "@mui/material";
import { ListToolBar } from "../../shared/components";

export const Dashboard: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <BasePage title="Página Inicial" toolBar={<ListToolBar showSearchInput />}>
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Menu
      </Button>
    </BasePage>
  );
};
