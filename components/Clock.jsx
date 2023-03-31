import React, { useEffect, useRef, useState } from "react";

const Clock = () => {
  /* const [counter, setCounter] = useState(0); */
  const counter = useRef(0);
  let idInteval = null;
  const animateNumber = () => {
    counter.current.innerHTML = Number(counter.current.textContent) + 1;
    if (counter.current.innerHTML == "3") {
      clearInterval(idInteval);
    }
    console.log(counter);
  };
  useEffect(() => {
    idInteval = setInterval(animateNumber, 1000);
    return () => {
      clearInterval(idInteval);
    };
  }, []);

  return (
    <div
      ref={counter}
      className="clock_animate rounded-full h-36 w-36 flex justify-center items-center text-white text-3xl"
    ></div>
  );
};

export default Clock;
