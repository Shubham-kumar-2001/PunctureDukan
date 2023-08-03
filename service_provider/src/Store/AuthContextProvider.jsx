import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getCurrentUser } from "../Middleware/middleware";
import { useHttpClient } from "../Hooks/http-hook";

const AuthContex = React.createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  user_id: "",
});

export const AuthContexProvider = (props) => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [token, setToken] = useState(cookies.providerjwt);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await sendRequest(
          "https://puncturedukan.onrender.com/api/puncturedukan/serviceprovider/authenticate"
        );
      } catch (err) {
        setToken("");
        localStorage.removeItem("providerjwt");
        removeCookies("providerjwt", {
          path: "/",
          withCredentials: true,
          httpOnly: true,
          maxAge: 7 * 24 * 3600 * 1000,
          sameSite: "none",
          secure: false,
          expires: 1,
        });
      }
    };
    fetchUsers();
  }, [token]);
  const loginHandler = (token) => {
    setToken(token);
    console.log(token);
    localStorage.setItem("providerjwt", token);
    setCookies("providerjwt", token, {
      path: "/",
    });
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("providerjwt");
    removeCookies("providerjwt", {
      path: "/",
      withCredentials: true,
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      sameSite: "none",
      secure: true,
      expires: 1,
    });
  };
  const contexValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    user_id: token ? getCurrentUser(token).username : "",
  };
  return (
    <AuthContex.Provider value={contexValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
