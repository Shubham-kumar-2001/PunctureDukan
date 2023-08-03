import React from "react";
import { Link } from "react-router-dom";
const NothingOnOrder = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-2xl tracking-tight font-extrabold lg:text-3xl text-blue-600 dark:text-blue-500">
            Your Order Section
          </h1>
          <div class="flex flex-col items-center justify-center">
            <div class="flex items-center justify-center flex-col">
              <img
                src="https://i.imgur.com/dCdflKN.png"
                alt=""
                width="130"
                height="130"
                class="w-[60%] mb-4 mr-3"
              />
              <h3>
                <strong>Your order is Empty</strong>
              </h3>
              <h4>Place Provide some service to make me Happy </h4>
            </div>
          </div>
          <Link
            to="/"
            class="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NothingOnOrder;
