import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Categories from "./pages/Categories";
import {HomeProvider} from "./context/HomeContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8146ff",
    },
    secondary: {
      main: "#dedbed",
    },
  },
  typography: {
    allVariants: {
      color: "#dedbed",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </HomeProvider>
    </ThemeProvider>
  );
}

export default App;
