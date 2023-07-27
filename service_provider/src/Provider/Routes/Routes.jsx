import { useState } from "react";
import RouterLayout from "./RouterLayout";
import ProtectedRoute from "./ProtectedRoute";
import LocateWithIp from "../Components/Map/DirectionMapBox";
import Profile from "./../Components/profile/Profile";
import RedirectingRoute from "./RedirectingRoute";
import LoginForm from "./../Components/Authentication/Login/LoginForm";
import RegisterFirstStep from "./../Components/Authentication/Register/RegisterFirst";
import RegisterSecondStep from "./../Components/Authentication/Register/RegisterSecondStep";
import RegisterThirdStep from "./../Components/Authentication/Register/RegisterThirdStep";
import RegisterPassword from "./../Components/Authentication/Register/RegisterPassword";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ContactUs from "../Components/ContactUs/ContactUs";
import AddService from "../Components/AddService/AddService";
import Order from "../Components/Order/Order";
import OrderModelPOPUP from "../Components/Order/OrderModelPOPUP.jsx";
import PaymentsRequest from "../Components/Payments/PaymentsRequest";
const RoutesProvider = () => {
  const [user, setUser] = useState({});
  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };
  const resetUser = () => {
    setUser({});
  };
  const [payment, setPayment] = useState();
  const [verify, setVerify] = useState(false);
  const routesForPublic = [
    {
      element: <RouterLayout />,
      children: [
        {
          path: "/",
          element: (
            <Navigate replace to="/serviceprovider/puncturedukan/login" />
          ),
        },
        // {
        //   path: "/serviceprovider/puncturedukan",
        //   element: <div>hello</div>,
        // },

        {
          path: "serviceprovider/puncturedukan/contactus",
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
      element: <RouterLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/serviceprovider/puncturedukan/locate",
              element: (
                <OrderModelPOPUP
                  setVerify={setVerify}
                  setPayment={setPayment}
                />
              ),
            },
            {
              path: "/serviceprovider/puncturedukan/profile",
              element: <Profile />,
            },
            {
              path: "/serviceprovider/puncturedukan/editprofile",
              element: <Profile />,
            },
            {
              path: "/serviceprovider/puncturedukan/order",
              element: <Order />,
            },
            {
              path: "/serviceprovider/puncturedukan/addservice",
              element: <AddService />,
            },
            {
              path: "/serviceprovider/puncturedukan/payment",
              element: verify ? (
                <PaymentsRequest payment={payment} />
              ) : (
                <Navigate replace to="/serviceprovider/puncturedukan/locate" />
              ),
            },
          ],
        },
      ],
    },
  ];
  const routesForNotAuthenticatedOnly = [
    {
      element: <RouterLayout />,
      children: [
        {
          element: <RedirectingRoute />,
          children: [
            {
              path: "/serviceprovider/puncturedukan/login",
              element: <LoginForm />,
            },
            {
              path: "/serviceprovider/puncturedukan/register/first",
              element: <RegisterFirstStep updateUser={updateUser} />,
            },
            {
              path: "/serviceprovider/puncturedukan/register/second",
              element: <RegisterSecondStep updateUser={updateUser} />,
            },
            {
              path: "/serviceprovider/puncturedukan/register/third",
              element: <RegisterThirdStep updateUser={updateUser} />,
            },
            {
              path: "/serviceprovider/puncturedukan/register/final",
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

export default RoutesProvider;
