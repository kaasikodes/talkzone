import { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { OverlayContext } from "../contexts/OverlayContextProvider";
const MobileBtn = () => {
  const OverlayCtx = useContext(OverlayContext);
  const componentName = OverlayCtx?.componentName;
  const setComponentName = OverlayCtx?.handleCompName;
  const handleClick = () => {
    if (componentName === "mobile menu") {
      (setComponentName as unknown as Function)("");
      return;
    }
    (setComponentName as unknown as Function)("mobile menu");
  };

  return (
    <div onClick={handleClick}>
      <FiMenu className="text-blue-600 text-xl font-bold" />
    </div>
  );
};

export default MobileBtn;
