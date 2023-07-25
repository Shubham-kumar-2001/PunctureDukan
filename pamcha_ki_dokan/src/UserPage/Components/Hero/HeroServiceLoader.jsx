import React from "react";
import { Link } from "react-router-dom";
const HeroLoaderService = () => {
  return (
    <div class="card shadow rounded-none animate-pulse w-[100%]">
      <div class="image-content w-[100%]">
        <div class="card-image w-[100%] ">
          <span className="placeholder w-[100%] h-[100%] rounded-lg"></span>
        </div>
      </div>
      <div class="flex flex-col items-center space-y-2 mb-4">
        <h2 class="w-[100%] text-center">
          <span className="placeholder w-1/2"></span>
        </h2>
        <p class="w-[100%] inline-block text-center">
          <span className="placeholder w-[90%]"></span>
          <span className="placeholder w-[40%] mr-3"></span>
          <span className="placeholder w-[40%]"></span>
          <span className="placeholder w-[80%]"></span>
          <span className="placeholder w-[80%]"></span>
        </p>
        <h2 className="w-[100%] inline-block text-center">
          <span className="placeholder w-[60%]"></span>
        </h2>
        <Link
          to="#"
          tabindex="-1"
          className="disabled placeholder w-1/2 px-5 py-4 rounded"
        />
      </div>
    </div>
  );
};

export default HeroLoaderService;
