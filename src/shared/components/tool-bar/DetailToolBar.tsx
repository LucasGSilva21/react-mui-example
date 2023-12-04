import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
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
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
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
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showLoadSaveBotton && <Skeleton width={110} height={60} />}

      {showSaveAndBackBotton &&
        !showLoadSaveAndBackBotton &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSaveAndBackBotton}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e voltar
            </Typography>
          </Button>
        )}
      {showLoadSaveAndBackBotton && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteBotton && !showLoadDeleteBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDeleteBotton}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showLoadDeleteBotton && <Skeleton width={110} height={60} />}

      {showNewBotton && !showLoadNewBotton && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNewBotton}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textNewBotton}
          </Typography>
        </Button>
      )}
      {showLoadNewBotton && !smDown && <Skeleton width={110} height={60} />}

      {showBackBotton &&
        (showNewBotton ||
          showDeleteBotton ||
          showSaveBotton ||
          showSaveAndBackBotton) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showBackBotton && !showLoadBackBotton && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBackBotton}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showLoadBackBotton && <Skeleton width={110} height={60} />}
    </Box>
  );
};
