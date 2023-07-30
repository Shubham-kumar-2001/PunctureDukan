import { useEffect } from "react";

const Child = (props) => {
  useEffect(() => {
    if (props.counter < 5) return;
    clearInterval(props.currentTimer);
  }, [props.counter, props.currentTimer]);
  return null;
};

export default Child;
