import React, { useEffect, useState } from "react";

const Clock = () => {
  const [counter, setCounter] = useState(0);
  let idInteval = null;
  const animateNumber = () => {
    setCounter((n) => n + 1);
    if (counter == 3) {
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
    <div className="clock_animate rounded-full h-36 w-36 flex justify-center items-center text-white text-3xl">
      {counter}
    </div>
  );
};

export default Clock;
