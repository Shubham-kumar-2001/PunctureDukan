import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../Middleware/middleware";
import { useHttpClient } from "../Hooks/http-hook";
import Cookies from "js-cookie";

const AuthContex = React.createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  user_id: "",
});

export const AuthContexProvider = (props) => {
  const [token, setToken] = useState(
    Cookies.get("userjwt", { domain: "puncturedukan.onrender.com" })
  );
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await sendRequest(
          "https://puncturedukan.onrender.com/api/puncturedukan/auth/authenticate"
        );
      } catch (err) {
        setToken("");
        Cookies.remove("userjwt");
        localStorage.clear();
      }
    };
    fetchUsers();
  }, [token]);
  const loginHandler = (token) => {
    setToken(token);
    Cookies.set("userjwt", token);
  };
  const logoutHandler = () => {
    setToken("");
    Cookies.remove("userjwt");
    localStorage.clear();
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
