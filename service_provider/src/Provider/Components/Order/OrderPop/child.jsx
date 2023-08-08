import { useEffect } from "react";

const Child = (props) => {
  var len = Object.keys(props.orderData).length;
  useEffect(() => {
    if (len <= 0) return;
    clearInterval(props.currentTimer);
  }, [len, props.currentTimer]);
  return null;
};

export default Child;
