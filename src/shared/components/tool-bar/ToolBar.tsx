import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IToolBarProps {
  textToSearch?: string;
  showSearchInput?: boolean;
  onChangeTextSearch?: (newText: string) => void;
  textNewBotton?: string;
  showNewBotton?: boolean;
  onClickNewBotton?: () => void;
}

export const ToolBar: React.FC<IToolBarProps> = ({
  textToSearch = "",
  showSearchInput = false,
  onChangeTextSearch,
  textNewBotton = "Novo",
  showNewBotton = true,
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
          placeholder="Pesquisar..."
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
