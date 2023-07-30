import { useState } from "react";
import HomePage from "../Components/Home/HomePage";
import Services from "../Components/Service/Services";
import ContactUs from "../Components/ContactUs/ContactUs";
import LocateWithIp from "../Components/Map/LocateWithIP";
import Profile from "../Components/profile/Profile";
import Order from "../Components/Order/Order";
import Login from "../Components/Authentication/Login/Login";
import RegisterFirstStep from "../Components/Authentication/Register/RegisterFirst";
import RegisterSecondStep from "../Components/Authentication/Register/RegisterSecondStep";
import RegisterThirdStep from "../Components/Authentication/Register/RegisterThirdStep";
import RegisterPassword from "../Components/Authentication/Register/RegisterPassword";
import RouterLayout from "./RouterLayout";
import ProtectedRoute from "./ProtectedRoute";
import RedirectingRoute from "./RedirectingRoute";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProviderDetail from "../Components/BookService/ProviderData/ProviderDetail";
import BookService from "../Components/BookService/Service/BookerService";
const Routes = () => {
  const [user, setUser] = useState({});
  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };
  const resetUser = () => {
    setUser({});
  };
  const routesForPublic = [
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: <Navigate replace to="/puncturedukan" />,
        },
        {
          path: "/puncturedukan",
          element: <HomePage />,
        },
        {
          path: "/puncturedukan/services",
          element: <Services />,
        },
        {
          path: "/puncturedukan/about",
          element: <div>About Us</div>,
        },
        {
          path: "/puncturedukan/contactus",
          element: <ContactUs />,
        },
        {
          path: "*",
          element: <div>Page not Found</div>,
        },
      ],
    },
  ];
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/puncturedukan/locate",
              element: <LocateWithIp />,
            },
            {
              path: "/puncturedukan/profile",
              element: <Profile />,
            },
            {
              path: "/puncturedukan/editprofile",
              element: <Profile />,
            },
            {
              path: "/puncturedukan/order",
              element: <Order />,
            },
            {
              path: "/puncturedukan/providerdetail",
              element: <ProviderDetail />,
            },
            {
              path: "/puncturedukan/service/:service_id",
              element: <BookService />,
            },
          ],
        },
      ],
    },
  ];
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: <RedirectingRoute />,
          children: [
            {
              path: "/puncturedukan/login",
              element: <Login />,
            },
            {
              path: "/puncturedukan/register/first",
              element: <RegisterFirstStep updateUser={updateUser} />,
            },
            {
              path: "/puncturedukan/register/second",
              element: <RegisterSecondStep updateUser={updateUser} />,
            },
            {
              path: "/puncturedukan/register/third",
              element: <RegisterThirdStep updateUser={updateUser} />,
            },
            {
              path: "/puncturedukan/register/final",
              element: <RegisterPassword user={user} resetUser={resetUser} />,
            },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
