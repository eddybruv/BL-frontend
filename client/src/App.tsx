import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
