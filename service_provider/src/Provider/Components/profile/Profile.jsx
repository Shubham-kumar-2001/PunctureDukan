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
import ConvertToBase64 from "../../../Middleware/helper";
import EditUserData from "./EditUserData";
const Profile = () => {
  var avatar =
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
  const [image, setImage] = useState("");
  const [active, setActive] = useState("Profile");
  console.log(active, "ghfgsdgjsdhj");
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
        `${process.env.REACT_APP_PROVIDER_API}logout`
      );
      const { success, message } = responseData;
      if (success) {
        handleSuccess(message);
        navigate("/", { replace: true });
        authCtx.logout();
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleShowDetail = () => {
    setShowDetail(!showDetail);
    console.log("gfdhgdf");
  };
  const onUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const base64 = await ConvertToBase64(file);
      setImage(base64);
    } catch (err) {}
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_PROVIDER_API}user`
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
      {!isLoading && (
        <div className="container mx-auto flex  rounded-2xl flex-wrap">
          <div className="flex mx-auto flex-col w-[100%] rounded-2xl bg-zinc-400 sm:grid sm:grid-cols-6 md:grid-cols-6 sm:gap-4 sm:w-[100%]">
            <Card
              className={`${
                showDetail
                  ? "!hidden"
                  : "flex flex-col space-y-3 mx-auto w-[100%] pb-[1rem]"
              } sm:space-y-4 sm:mb-0 sm:col-span-2 sm:w-[100%] sm:opacity-100 sm:!flex `}
            >
              <div className="flex items-center flex-col flex-wrap">
                <div className="flex  h-[100px] w-[100px]  mb-3">
                  <label
                    htmlFor="profile"
                    className="h-[100%] w-[100%] rounde-lg"
                  >
                    <img
                      src={image || avatar}
                      className="shadow h-[100%] w-[100%] rounded-[100%] border-[10px] border-solid border-white"
                      alt="avatar"
                    />
                    <input
                      onChange={onUpload}
                      type="file"
                      id="profile"
                      name="profile"
                      className="hiddden opacity-0"
                    />
                  </label>
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
                      <span className="flex flex-wrap space-x-4">
                        <span className="text-[25px] ml-2">
                          <i className="fa fa-sign-out" aria-hidden="true" />
                        </span>
                        <span className="text-[20px] font-medium">Logout</span>
                      </span>
                    )
                  }
                  onClick={handleLogout}
                  className="py-[4px] px-[20px] my-auto"
                />
              </div>
            </Card>
            <div
              className={`${
                !showDetail ? "hidden" : "flex"
              } sm:col-span-4 sm:flex`}
            >
              {active === "Profile" && (
                <Card className="w-[100%] h-[100%] overflow-hidden">
                  <UserDetail
                    userData={userData}
                    handleShowDetail={handleShowDetail}
                  />
                </Card>
              )}
              {active === "Edit Profile" && (
                <Card className="w-[100%] h-[100%] overflow-hidden">
                  <EditUserData
                    handleShowDetail={handleShowDetail}
                    userData={userData}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
