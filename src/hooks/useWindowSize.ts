import { useState, useEffect } from "react";
interface ISize {
  height: number;
  width: number;
}
const useWindowSize = (): ISize => {
  function getSize(): ISize {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize(getSize());
      
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
