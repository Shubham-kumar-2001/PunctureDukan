import React from "react";
import { AuthContexProvider } from "./Store/AuthContextProvider";
import RoutesProvider from "./Provider/Routes/Routes";
const App = () => {
  return (
    <AuthContexProvider>
      <RoutesProvider />
    </AuthContexProvider>
  );
};

export default App;
