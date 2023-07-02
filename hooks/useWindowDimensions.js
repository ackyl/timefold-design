import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth, innerHeight } = window;

  return {
    width: innerWidth,
    height: innerHeight,
    isMobileView: innerWidth < 960,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
    isMobileView: true,
  });

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
