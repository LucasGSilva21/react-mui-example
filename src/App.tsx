import { Button } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "./shared/contexts";

export const App = () => {
  const { toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        Menu
      </Button>
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Trocar tema
      </Button>
    </div>
  );
};
