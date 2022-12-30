import Logo from "./components/logo";
import Onboarding from "./components/onboarding";
import Topbar from "./components/top-bar";
import Router from "./router";
import { useState } from "react";

function App() {
  return (
    <>
      <Topbar>
        <Logo />
      </Topbar>
      <Router />
    </>
  );
}

export default App;
