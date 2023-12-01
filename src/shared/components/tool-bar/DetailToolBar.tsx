import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IDetailToolBarProps {
  textNewBotton?: string;
  showSaveBotton?: boolean;
  showSaveAndBackBotton?: boolean;
  showDeleteBotton?: boolean;
  showNewBotton?: boolean;
  showBackBotton?: boolean;
  onClickSaveBotton?: () => void;
  onClickSaveAndBackBotton?: () => void;
  onClickDeleteBotton?: () => void;
  onClickNewBotton?: () => void;
  onClickBackBotton?: () => void;
}

export const DetailToolBar: React.FC<IDetailToolBarProps> = ({
  textNewBotton = "Novo",
  showSaveBotton = true,
  showSaveAndBackBotton = false,
  showDeleteBotton = true,
  showNewBotton = true,
  showBackBotton = true,
  onClickSaveBotton,
  onClickSaveAndBackBotton,
  onClickDeleteBotton,
  onClickNewBotton,
  onClickBackBotton,
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
      {showSaveBotton && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveBotton}
        >
          Salvar
        </Button>
      )}
      {showSaveAndBackBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndBackBotton}
        >
          Salvar e voltar
        </Button>
      )}
      {showDeleteBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDeleteBotton}
        >
          Apagar
        </Button>
      )}
      {showNewBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNewBotton}
        >
          {textNewBotton}
        </Button>
      )}
      <Divider variant="middle" orientation="vertical" />
      {showBackBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBackBotton}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
