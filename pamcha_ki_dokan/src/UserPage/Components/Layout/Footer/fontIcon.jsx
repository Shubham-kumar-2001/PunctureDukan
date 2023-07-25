import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
const FontIcon = () => {
  return (
    <ul className="list-none flex flex-wrap  space-x-6">
      <div className="w-[100%] h-[30px] " />
      <li className="flex items-start">
        <FontAwesomeIcon
          icon={faFacebookF}
          size="2x"
          className="hover:animate-bounce"
        />
      </li>
      <li>
        <FontAwesomeIcon
          icon={faInstagram}
          size="2x"
          className="hover:animate-bounce"
        />
      </li>
      <li>
        <FontAwesomeIcon
          icon={faLinkedin}
          size="2x"
          className="hover:animate-bounce"
        />
      </li>
      <li>
        <FontAwesomeIcon
          icon={faWhatsapp}
          size="2x"
          className="hover:animate-bounce"
        />
      </li>
      <li>
        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          className="hover:animate-bounce"
        />
      </li>
    </ul>
  );
};

export default FontIcon;
