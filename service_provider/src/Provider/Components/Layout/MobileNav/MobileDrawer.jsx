import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContex from "../../../../Store/AuthContextProvider";
import ButtonForm from "../../../../UI/buttonForm";
import { useHttpClient } from "../../../../Hooks/http-hook";
import { toast } from "react-toastify";
import MobilenavButton from "./MobileNavButton";
import MobileList from "./mobileList";
const MobileDrawer = (props) => {
  const [userDrawer, setUserDrawer] = useState(false);
  const [credentialDrawer, setCredentialDrawer] = useState(false);
  const authCtx = useContext(AuthContex);
  const userDrawerHandler = () => {
    setUserDrawer(!userDrawer);
  };
  const credentialDrawerHandler = () => {
    setCredentialDrawer(!credentialDrawer);
  };
  const { isLoading, error, sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const handleLogout = async () => {
    try {
      const responseData = await sendRequest(
        `https://puncturedukan.onrender.com/api/puncturedukan/serviceprovider/logout`
      );
      const { success, message } = responseData;
      if (success) {
        handleSuccess(message);
        authCtx.logout();
        navigate("/", { replace: true });
      } else {
        handleError(message);
      }
    } catch (er) {
      handleError(error);
    }
    props.setDrawerIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-64 dark:bg-gray-800">
        <h5
          onClick={props.onClick}
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          <Link to="/">PunctureDukan</Link>
        </h5>
        <button
          onClick={props.onClick}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {authCtx.user_id && (
              <>
                <MobilenavButton
                  handler={userDrawerHandler}
                  name={props.userMobileNav.name}
                  username={authCtx.user_id}
                  fabIcon={props.userMobileNav.fabIcon}
                  onClick={props.onClick}
                  list={props.userMobileNav.list}
                  Drawer={userDrawer}
                  service={false}
                  isLoading={isLoading}
                />

                <MobilenavButton
                  handler={credentialDrawerHandler}
                  name={props.credentialMobilenav.name}
                  fabIcon={props.credentialMobilenav.fabIcon}
                  onClick={props.onClick}
                  list={props.credentialMobilenav.list}
                  Drawer={credentialDrawer}
                  service={false}
                />
              </>
            )}
            {authCtx.user_id &&
              props.authorized.list.map((auth, index) => (
                <MobileList
                  onClick={props.onClick}
                  name={auth.name}
                  fabIcon={auth.fabIcon}
                  key={index}
                />
              ))}
            {!authCtx.user_id &&
              props.notAuthorized.list.map((auth, index) => (
                <MobileList
                  onClick={props.onClick}
                  name={auth.name}
                  fabIcon={auth.fabIcon}
                  key={index}
                />
              ))}
            {authCtx.user_id && (
              <li>
                <ButtonForm
                  type="button"
                  buttonContent={
                    isLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className=" text-white text-[15px] ml-[0.7rem]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                          <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                          <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Logout
                        </span>
                      </span>
                    )
                  }
                  onClick={handleLogout}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
