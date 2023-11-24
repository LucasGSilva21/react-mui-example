import { PropsWithChildren, ReactNode } from "react";
import {
  Box,
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDrawerContext } from "../contexts";

interface IBasePageProps {
  title: string;
  toolBar?: ReactNode;
}

export const BasePage: React.FC<PropsWithChildren<IBasePageProps>> = ({
  children,
  title,
  toolBar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>
      {toolBar && <Box>{toolBar}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
