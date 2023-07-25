import React from "react";
import style from "../Layout/ProfileDropDown/ProfileDropDowm.module.css";
import { Link } from "react-router-dom";
import ButtonForm from "../../../UI/buttonForm";
const ProfileButton = (props) => {
  var str = props.name.replace(/\s+/g, "");

  return (
    <div
      class={`flex flex-wrap  w-[100%] rounded ${
        style.profile_dropdown_list_item
      } ${
        props.active === props.name ? "text-white bg-blue-500" : " "
      } hover:bg-zinc-400`}
    >
      <ButtonForm
        type="button"
        buttonContent={
          <Link
            onClick={() => props.setShowDetail(true)}
            class="flex flex-wrap space-x-4 items-start"
            to={`/puncturedukan/${str.toLowerCase()}`}
          >
            <span className="text-[22px] ml-2">{props.icon}</span>
            <span className="text-[20px] font-medium">{props.name}</span>
          </Link>
        }
        className="py-[4px] px-[20px]"
        onClick={() => props.setActive(props.name)}
      />
    </div>
  );
};

export default ProfileButton;
