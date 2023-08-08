import React, { useEffect, useState } from "react";
import FontIcon from "./fontIcon";
import ServiceName from "./serviceName";
import ContactAddress from "./address";
import { useHttpClient } from "../../../../Hooks/http-hook";
import { toast } from "react-toastify";
import FooterLoader from "./footerloader";
const Footer = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const { isLoading: footerIsLoading, sendRequest: footerSendRequest } =
    useHttpClient();
  const [services, setServices] = useState([]);
  const [footer, setFooter] = useState([]);
  const [link, setLink] = useState([]);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const responseData = await footerSendRequest(
          "https://puncturedukan.onrender.com/api/puncturedukan/footer"
        );
        const { success, message, FooterNav } = responseData;
        if (success) {
          setFooter(FooterNav[0]);
          setLink(FooterNav[0].links);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchFooter();
  }, [footerSendRequest]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `https://puncturedukan.onrender.com/api/puncturedukan/services`
        );
        const { success, message, service } = responseData;
        if (success) {
          setServices(service);
        } else {
          handleError(message);
        }
      } catch (err) {
        handleError(error);
      }
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      {isLoading && <FooterLoader />}
      {footerIsLoading && <FooterLoader />}
      {!isLoading && (
        <div className="footerLayout container bg-gray-50  mx-auto sticky-bottom !mt-auto bottom-0 left-0">
          <div className="flex container mx-auto my-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className=" flex flex-col flex-wrap my-4 ">
                <span className="mx-4 p-2 flex flex-col flex-wrap items-start justify-center">
                  <span className="text-[30px] font-medium ">
                    {footer.title}
                  </span>
                  <span className="text-[18px] font-normal my-3">
                    {footer.subtitle}
                  </span>
                </span>
                <div className="flex flex-wrap w-[100%] h-auto">
                  <FontIcon />
                </div>
              </div>
              <div className="flex flex-col flex-wrap  h-auto relative cursor-pointer">
                <span className="text-[30px] font-semibold ml-2 md:ml-3 lg:ml-5 mb-1 mt-4 ">
                  Services
                </span>
                <ul className=" flex list-none  justify-center flex-col ml-2 md:ml-3 lg:ml-5 ">
                  {services.map((service, index) => (
                    <ServiceName
                      name={service.servicename}
                      fabIcon={service.fabIcon}
                      key={index}
                    />
                  ))}
                </ul>
              </div>
              <ContactAddress
                address={footer.address}
                link={footer.link}
                links={link}
                fabIcon={footer.fabIcon}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
