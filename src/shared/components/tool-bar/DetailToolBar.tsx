import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  useTheme,
} from "@mui/material";

interface IDetailToolBarProps {
  textNewBotton?: string;
  showSaveBotton?: boolean;
  showSaveAndBackBotton?: boolean;
  showDeleteBotton?: boolean;
  showNewBotton?: boolean;
  showBackBotton?: boolean;
  showLoadSaveBotton?: boolean;
  showLoadSaveAndBackBotton?: boolean;
  showLoadDeleteBotton?: boolean;
  showLoadNewBotton?: boolean;
  showLoadBackBotton?: boolean;
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
  showLoadSaveBotton = false,
  showLoadSaveAndBackBotton = false,
  showLoadDeleteBotton = false,
  showLoadNewBotton = false,
  showLoadBackBotton = false,
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
      {showSaveBotton && !showLoadSaveBotton && (
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
      {showLoadSaveBotton && <Skeleton width={110} height={60} />}

      {showSaveAndBackBotton && !showLoadSaveAndBackBotton && (
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
      {showLoadSaveAndBackBotton && <Skeleton width={180} height={60} />}

      {showDeleteBotton && !showLoadDeleteBotton && (
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
      {showLoadDeleteBotton && <Skeleton width={110} height={60} />}

      {showNewBotton && !showLoadNewBotton && (
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
      {showLoadNewBotton && <Skeleton width={110} height={60} />}

      <Divider variant="middle" orientation="vertical" />

      {showBackBotton && !showLoadBackBotton && (
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
      {showLoadBackBotton && <Skeleton width={110} height={60} />}
    </Box>
  );
};
