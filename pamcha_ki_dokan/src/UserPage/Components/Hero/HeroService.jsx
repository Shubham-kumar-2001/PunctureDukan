import React from "react";
import "./HeroService.css";
import { Link } from "react-router-dom";
import ButtonForm from "../../../UI/buttonForm";
const HeroService = (props) => {
  return (
    <div class="card shadow w-[100%]">
      <div class="image-content">
        <span class="overlay"></span>
        <div class="card-image">
          <img src={props.image} alt="" class="card-img" />
        </div>
      </div>
      <div class="card-content space-y-4">
        <h2 class="name">
          {props.name.length > 21
            ? `${props.name.substring(0, 250)}...`
            : props.name}
        </h2>
        <p class="description">{props.aboutServices}</p>
        <h2 className="price font-semibold text-[1.2rem]">₹ {props.price}</h2>
        <ButtonForm
          type="button"
          className="button"
          buttonContent={
            <Link to={`/puncturedukan/service/${props.service_id}`}>
              Book Service
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default HeroService;
