import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { SideBar } from "./shared/components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppThemeProvider>
    <DrawerProvider>
      <BrowserRouter>
        <SideBar>
          <AppRoutes />
        </SideBar>
      </BrowserRouter>
    </DrawerProvider>
  </AppThemeProvider>
);
