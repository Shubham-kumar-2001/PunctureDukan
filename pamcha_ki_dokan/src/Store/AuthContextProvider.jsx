import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getCurrentUser } from "../Middleware/middleware";
import { useHttpClient } from "../Hooks/http-hook";
import axios from "axios";

const AuthContex = React.createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  user_id: "",
});

export const AuthContexProvider = (props) => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [token, setToken] = useState(cookies.userjwt);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios.get(
          "https://puncturedukan.onrender.com/api/puncturedukan/auth/authenticate"
        );
      } catch (err) {
        setToken("");
        localStorage.removeItem("userjwt");
        removeCookies("userjwt");
      }
    };
    setTimeout(() => {
      fetchUsers();
    }, 4000);
  }, [token]);
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("userjwt", token);
    setCookies("userjwt", token);
    console.log(token);
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("userjwt");
    removeCookies("userjwt");
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
