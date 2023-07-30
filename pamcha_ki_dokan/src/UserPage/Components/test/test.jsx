import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Child from "./child";

const Test = () => {
  const intervalRef = useRef(null);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      setCounter((v) => v + 1);
      console.log("hello");
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div>
      <div>Interval:-{counter}</div>
      <Child counter={counter} currentTimer={intervalRef.current} />
    </div>
  );
};

export default Test;
