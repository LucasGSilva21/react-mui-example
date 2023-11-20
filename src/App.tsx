import { Button } from "@mui/material";
import { useAppThemeContext } from "./shared/contexts";

export const App = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Teste
      </Button>
    </div>
  );
};
