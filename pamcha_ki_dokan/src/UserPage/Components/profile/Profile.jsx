import React, { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import style from "../Layout/ProfileDropDown/ProfileDropDowm.module.css";
import { useState } from "react";
import UserDetail from "./userDetail";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContex from "../../../Store/AuthContextProvider";
import useWindowDimensions from "../../../GetWindowHeightAndWidth/Height&width";
import { useHttpClient } from "../../../Hooks/http-hook";
import ErrorModule from "../../../ErrorModule/ErrorModule";
import LoadingSpinner from "./../../../UIElements/LoadingSpinner";
import ButtonForm from "../../../UI/buttonForm";
import Card from "../../../UI/Card";
import { profileButtonData } from "./../../../Data/index";
const Profile = () => {
  const [active, setActive] = useState("Profile");
  const [showDetail, setShowDetail] = useState(false);
  const [userData, setUserData] = useState([]);
  const authCtx = useContext(AuthContex);
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
        `${process.env.REACT_APP_USER_API}logout`
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
  };
  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const { width } = useWindowDimensions();
  var wid = width >= 600 ? true : false;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_USER_API}user`
        );
        const { success, message, userData } = responseData;
        if (success) {
          setUserData(userData);
        } else {
          handleError(message);
          authCtx.logout();
        }
      } catch (err) {
        authCtx.logout();
      }
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {<ErrorModule error={error} onClick={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && width >= 600 && (
        <div className="container mx-auto flex bg-white shadow rounded flex-wrap">
          <div className="grid sm:grid-cols-6 md:grid-cols-6 gap-4 w-[100%]">
            <div
              className={`card w-[90%] rounded-e-xl flex flex-col space-y-3 mx-auto  sm:col-span-2 md:col-span-2`}
            >
              <div className="flex items-center flex-col flex-wrap">
                <div className="flex  h-[100px] w-[100px]  mb-3">
                  <img
                    src="https://images.unsplash.com/profile-1570558224590-0decbc3253fdimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
                    alt="Loading.."
                    className="shadow h-[100%] w-[100%] rounded-[100%] border-[10px] border-solid border-white"
                  />
                </div>
                <div className="flex items-center w-[100%] justify-center border-[1] border-solid mb-[1rem] border-zinc-200 bg-zinc-200  py-[3px]">
                  <span className="text-[21px] font-normal">
                    {userData.username}
                  </span>
                </div>
              </div>
              {profileButtonData.map((data, index) => (
                <ProfileButton
                  key={index}
                  name={data.name}
                  active={active}
                  setActive={setActive}
                  icon={data.icon}
                  setShowDetail={setShowDetail}
                />
              ))}
              <div
                className={`flex flex-wrap w-[100%] rounded hover:bg-zinc-400 ${style.profile_dropdown_list_item}`}
              >
                <ButtonForm
                  type="button"
                  buttonContent={
                    isLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
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
                        <span class=" text-white text-[15px] ml-[0.7rem]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center">
                        <span
                          className={`mr-[0.8rem] text-[1.5rem]  w-[2.3rem] h-[2.3rem] rounded-[50%] ${style.profile_dropdown_list_item_link}`}
                        >
                          <i className="fa fa-sign-out" aria-hidden="true" />
                        </span>
                        <span className=" text-[1rem] font-[500] text-black">
                          Logout
                        </span>
                      </span>
                    )
                  }
                  onClick={handleLogout}
                  className="py-[4px] px-[20px]"
                />
              </div>
            </div>
            <div className="col-span-4">
              {active === "Profile" && (
                <Card className="w-[100%] h-[100%] overflow-hidden">
                  <UserDetail userData={userData} />
                </Card>
              )}
              {active === "Edit Profile" && (
                <Card className="w-[100%] h-[100%] overflow-hidden">
                  <UserDetail />
                  <div className="absolute top-[5.5rem] left-[1rem] text-zinc-900 text-[20px] ">
                    <ButtonForm
                      type="button"
                      buttonContent={
                        <i
                          className="fa fa-long-arrow-left"
                          aria-hidden="true"
                        ></i>
                      }
                      onClick={handleShowDetail}
                    />
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoading && width < 600 && (
        <div className="container">
          <div className="flex flex-wrap  mx-auto flex-col w-[95%] card shadow rounded border-[1]">
            {!showDetail && (
              <div className="flex flex-col space-y-3 mx-auto w-[95%] mb-[2rem]">
                <div className="flex items-center flex-col flex-wrap">
                  <div className="flex h-[100px] w-[100px]  mb-3">
                    <img
                      src="https://images.unsplash.com/profile-1570558224590-0decbc3253fdimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
                      alt="Loading.."
                      className="shadow h-[100%] w-[100%] rounded-[100%] border-[10px] border-solid border-white"
                    />
                  </div>
                  <div className="flex items-center w-[100%] justify-center border-[1] border-solid mb-[1rem] border-zinc-200 bg-zinc-200  py-[3px]">
                    <span className="text-[21px] font-normal">
                      {authCtx.user_id}
                    </span>
                  </div>
                </div>
                {profileButtonData.map((data, index) => (
                  <ProfileButton
                    key={index}
                    name={data.name}
                    active={active}
                    setActive={setActive}
                    icon={data.icon}
                    setShowDetail={setShowDetail}
                  />
                ))}
                <div
                  className={`flex flex-wrap w-[100%] rounded hover:bg-zinc-400  ${style.profile_dropdown_list_item}`}
                >
                  <ButtonForm
                    type="button"
                    buttonContent={
                      isLoading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-blue-900"
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
                          <span class=" text-white text-[15px] ml-[0.7rem]">
                            Loading...
                          </span>
                        </div>
                      ) : (
                        <span className="flex items-center">
                          <span
                            className={`mr-[0.8rem] text-[1.5rem]  w-[2.3rem] h-[2.3rem] rounded-[50%] ${style.profile_dropdown_list_item_link}`}
                          >
                            <i className="fa fa-sign-out" aria-hidden="true" />
                          </span>
                          <span className=" text-[1rem] font-[500] text-black">
                            Logout
                          </span>
                        </span>
                      )
                    }
                    onClick={handleLogout}
                    className="py-[4px] px-[20px]"
                  />
                </div>
              </div>
            )}
            {showDetail && (
              <div>
                {active === "Profile" && (
                  <Card className="w-[100%] h-[100%] overflow-hidden">
                    <UserDetail userData={userData} />
                    {!wid && (
                      <div className="absolute top-1 left-[1rem] text-zinc-900 text-[30px] ">
                        <ButtonForm
                          type="button"
                          buttonContent={
                            <i
                              className="fa fa-long-arrow-left"
                              aria-hidden="true"
                            ></i>
                          }
                          onClick={handleShowDetail}
                        />
                      </div>
                    )}
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
