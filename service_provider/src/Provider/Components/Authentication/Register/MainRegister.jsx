// import React, { useState } from "react";
// import RegisterFirstStep from "./RegisterFirst";
// import AddService from "../../AddService/AddService";
// // import OrderPop from "../../Order/orderPop";
// import OrderModelPOPUP from "../../Order/OrderModelPOPUP.jsx";
// import RegisterThirdStep from "./RegisterThirdStep";
// import RegisterPassword from "./RegisterPassword";
// import { Navigate } from "react-router-dom";
// const MainRegister = () => {
//   const [user, setUser] = useState({ state: 1 });
//   const updateUser = (data) => {
//     setUser((prevUser) => ({ ...prevUser, ...data }));
//   };
//   const resetUser = () => {
//     setUser({});
//   };
//   const nexthandler = () => {
//     setUser((user.state = user.state + 1));
//   };
//   const prevHandler = () => {
//     setUser((user.state = user.state - 1));
//   };
//   switch (user.state) {
//     case 1:
//       return (
//         <RegisterFirstStep updateUser={updateUser} nextHandler={nexthandler} />
//       );
//     case 2:
//       return (
//         <RegisterThirdStep updateUser={updateUser} nextHandler={nexthandler} />
//       );
//     case 3:
//       return <AddService nextHandler = {nexthandler} prevHandler={prevHandler} update/>;
//     case 4:
//       return <OrderModelPOPUP />;
//     case 5:
//       return <RegisterPassword user={user} resetUser={resetUser} />;
//     default:
//       <Navigate to="/" />;
//   }
// };

// export default MainRegister;
