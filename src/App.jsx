import Topbar from "./components/top-bar";
import Router from "./router";
import styled from "styled-components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
  },
  palette: {
    mode: "light",

    primary: {
      main: "#2a316e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <Topbar></Topbar>
        <Router />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
