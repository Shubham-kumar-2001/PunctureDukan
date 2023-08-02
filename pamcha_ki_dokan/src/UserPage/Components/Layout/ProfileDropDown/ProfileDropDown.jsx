import React from "react";
import style from "./ProfileDropDowm.module.css";
import ProfileList from "./list";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../../../../Store/AuthContextProvider";
import ButtonForm from "../../../../UI/buttonForm";
import { useHttpClient } from "../../../../Hooks/http-hook";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import ProfileListLoader from "./listLoader";
const ProfileDropDown = (props) => {
  console.log(props);
  const [profileData, setProfileData] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const { isLoading: profileLoading, sendRequest: profileSendRequest } =
    useHttpClient();
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
        `https://puncturedukan.onrender.com/api/puncturedukan/auth/logout`
      );
      const { success, message } = responseData;
      if (success) {
        handleSuccess(message);
        navigate("/", { replace: true });
        authCtx.logout();
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await profileSendRequest(
          `https://puncturedukan.onrender.com/api/puncturedukan/navdata`
        );
        const { success, message, headerNav } = responseData;
        console.log(headerNav);
        if (success) {
          setProfileData(headerNav[4].list);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [profileSendRequest]);
  const userName = authCtx.user_id
    ? authCtx.user_id.slice(0, authCtx.user_id.length - 6)
    : "";
  return (
    <div class="relative w-fit flex items-center justify-center mr-[2rem]">
      <div
        className={`flex items-center justify-between pr-[1rem] bg-inherit
         cursor-pointer ${style.profile_dropdown_btn}`}
      >
        <ButtonForm
          type="buttton"
          className="flex flex-wrap items-center justify-center text-inherit bg-inherit mt-1"
          buttonContent={
            profileLoading ? (
              <div className="bg-gray-200 h-3 rounded-full dark:bg-gray-700 w-20 placeholder"></div>
            ) : (
              <span className="flex items-center justify-center  space-x-2">
                <span className="text-[19px] font-normal text-white">
                  {userName}
                </span>
                <span
                  className={`flex flex-wrap items-start text-white text-[20px] ${style.icon}`}
                >
                  <i className={`fa fa-caret-right `} aria-hidden="true" />
                </span>
                <span
                  className={`flex-wrap items-start text-white text-[20px] mb-[0.5rem] hidden ${style.secIcon}`}
                >
                  <i className={`fa fa-sort-desc `} aria-hidden="true" />
                </span>
              </span>
            )
          }
        />
        <ul
          className={`${style.profile_dropdown_list} absolute top-[55px] w-[220px] right-[-30px] bg-white 
          rounded max-h-[500px]  shadow hidden`}
        >
          {profileData.map((item, index) => (
            <ProfileList name={item.name} fabIcon={item.fabIcon} key={index} />
          ))}
          <li
            class={`pt-[0.5rem] pr-0 pl-[1rem] ${style.profile_dropdown_list_item}`}
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
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropDown;
