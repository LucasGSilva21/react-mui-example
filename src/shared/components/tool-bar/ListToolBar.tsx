import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environment";

interface IListToolBarProps {
  textToSearch?: string;
  textNewBotton?: string;
  showSearchInput?: boolean;
  showNewBotton?: boolean;
  onChangeTextSearch?: (newText: string) => void;
  onClickNewBotton?: () => void;
}

export const ListToolBar: React.FC<IListToolBarProps> = ({
  textToSearch = "",
  textNewBotton = "Novo",
  showSearchInput = false,
  showNewBotton = true,
  onChangeTextSearch,
  onClickNewBotton,
}) => {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      display="flex"
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      gap={1}
      alignItems="center"
    >
      {showSearchInput && (
        <TextField
          size="small"
          value={textToSearch}
          onChange={(e) => onChangeTextSearch?.(e.target.value)}
          placeholder={Environment.SEARCH_INPUT}
        />
      )}
      <Box display="flex" flex={1} justifyContent="end">
        {showNewBotton && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onClickNewBotton}
          >
            {textNewBotton}
          </Button>
        )}
      </Box>
    </Box>
  );
};
