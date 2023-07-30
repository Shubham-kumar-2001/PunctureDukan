import React from "react";
import ButtonForm from "../../../UI/buttonForm";
import { useHttpClient } from "../../../Hooks/http-hook";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "./../../../Store/cart-slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";
const PaymentsRequest = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const serviceInCart = useSelector((state) => state.cart);
  const cartServiceAddHandler = () => {
    dispatch(cartSliceActions.addServiceToCart(props.payment.price));
  };
  const cartServicesRemoveHandler = () => {
    dispatch(cartSliceActions.removeServiceToCart(props.payment.price));
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const { isLoading, sendRequest } = useHttpClient();
  const { sendRequest: paymentsSendRequest } = useHttpClient();
  // alert(process.env.REACT_APP_RAZOR_PAY_ID);
  const initPayment = (data) => {
    const options = {
      key: `${process.env.REACT_APP_RAZOR_PAY_ID}`,
      amount: data.amount,
      currency: data.currency,
      name: props.payment.servicename,
      description: "Test Transaction",
      image: props.payment.image,
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentsVerification = await paymentsSendRequest(
            `${process.env.REACT_APP_PAYMENT}verifypayments`,
            "POST",
            JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(paymentsVerification);
          const { success, message } = paymentsVerification;
          if (success) {
            handleSuccess(message);
            localStorage.removeItem("userData");
            localStorage.removeItem("providerData");
            localStorage.removeItem("userAddress");
            localStorage.removeItem("providerAddress");
            localStorage.removeItem("acceptorder");
            localStorage.removeItem("verifyotp");
            navigate("/");
          }
        } catch (error) {
          handleError(error.message);
        }
      },
      prefill: {
        name: props.payment.name,
        username: props.payment.username,
        mobilenumber: props.payment.mobilenumber,
      },
      notes: {
        address: props.payment.address,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentsRequestHandler = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const fetchPaymentsRequest = await sendRequest(
        `${process.env.REACT_APP_PAYMENT}paymentsorder`,
        "POST",
        JSON.stringify({
          amount: serviceInCart.totalCartPrice,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { success, message, data } = fetchPaymentsRequest;
      if (success) {
        handleSuccess(message);
        initPayment(data);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container sm:max-w-[400px] mx-auto">
      <div className="w-[95%] mx-auto flex flex-col justify-center items-start space-y-3">
        <div className="bg-white w-[100%] h-auto ">
          <img
            src={props.payment.image}
            alt="Loading.."
            className="max-h-[95%] max-w-[95%] m-auto"
          />
        </div>
        <div className="bg-white flex items-start w-[95%] mx-auto border-b-[1px] border-solid border-zinc-400 pb-2">
          <div className="grid grid-cols-2 gap-2 w-[100%]">
            <span className="text-[18px] font-semibold text-stone-900 text-start">
              {props.payment.servicename}
            </span>
            <span className="font-bold text-[19px] text-stone-900 text-end ml-auto">
              ₹{props.payment.price}/service
            </span>
          </div>
        </div>
        <div className="w-[100%]">
          <div
            className="flex flex-wrap flex-col overflow-hidden justify-center
          relative w-[95%] bg-white space-y-6 mx-auto mb-4"
          >
            <div className="flex items-start w-[100%] space-y-2 text-[18px] font-medium flex-col border-b-[1px] border-solid border-zinc-400 pb-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-[18px] font-semibold text-start">
                  Enter the no of services
                </span>
                <div className="w-[100%] space-x-6 text-end">
                  <button
                    onClick={cartServicesRemoveHandler}
                    className="rounded-[50%] border-[1px] border-solid border-zinc-600 p-2"
                  >
                    -
                  </button>
                  <span className="text-[19px] font-semibold">
                    {serviceInCart.totalQuantity}
                  </span>
                  <button
                    onClick={cartServiceAddHandler}
                    className="rounded-[50%] border-[1px] border-solid border-zinc-600 p-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <span className="text-[20px] font-semibold border-b-[1px] border-solid border-zinc-400 pb-2">
              <span className="text-[20px] font-bold">Total Price</span>:- ₹
              {serviceInCart.totalCartPrice}
            </span>
            <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-[90%]">
              <ButtonForm
                type="button"
                onClick={paymentsRequestHandler}
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
                    "Send Request"
                  )
                }
                className="btn-primary text-[18px] w-[100%] px-[2.6rem] py-[.7rem] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsRequest;
