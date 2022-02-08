import React, { useMemo } from "react";
import "./App.css";
import ThemeConfig from "./components/theme/ThemeConfig";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import CustomAlert from "./components/ui/Alert/CustomAlert";

type RoutesType = {
  path: string;
  element: JSX.Element;
  private: boolean;
};

function App() {
  const routes = useMemo(() => {
    const arr: RoutesType[] = [
      {
        path: "/home",
        element: <Home />,
        private: true,
      },
      {
        path: "/login",
        element: <Login />,
        private: true,
      },
      {
        path: "/loginCreate",
        element: <Login enableCreate />,
        private: true,
      },
      {
        path: "/",
        element: <Login msj="pepepep" />,
        private: false,
      },
    ];
    return arr.map((item, index) => {
      const ele = item.private ? (
        <PrivateRoute
          path={item.path}
          blockRedirect={item.path === "/login" || item.path === "/loginCreate"}
        >
          {item.element}
        </PrivateRoute>
      ) : (
        item.element
      );
      return <Route key={`RouteApp${index}`} path={item.path} element={ele} />;
    });
  }, []);

  return (
    <ThemeProvider theme={ThemeConfig}>
      <CssBaseline />
      <BrowserRouter>
        <CustomAlert />
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
