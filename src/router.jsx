import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ConnectAdmin from "./components/connect-admin";
import Onboarding from "./components/onboarding";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Onboarding />,
    },
    {
      path: "/connect-admin",
      element: <ConnectAdmin />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
