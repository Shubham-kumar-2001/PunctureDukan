import React from "react";
import ListOrder from "./list";
import { orderData } from "../../../Data";
const Order = () => {
  return (
    <div className="container mx-auto">
      <div className="w-[90%] flex flex-wrap mx-auto items-center justify-center">
        <ul className="m-0 p-0 flex-1 space-y-5">
          {orderData.map((data, index) => (
            <ListOrder
              image={data.image}
              serviceName={data.serviceName}
              name={data.name}
              price={data.price}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
