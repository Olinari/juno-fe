import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import Onboarding from "./components/onboarding";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Onboarding />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
