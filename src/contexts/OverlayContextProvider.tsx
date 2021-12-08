import React, { useState, createContext } from "react";

interface OverlayInterface {
  componentName: string;
  handleCompName: Function;
}

export const OverlayContext = createContext<OverlayInterface | null>(null);

const OverlayContextProvider: React.FC = (props) => {
  const [componentName, setComponentName] = useState("");
  const handleCompName = (name: string) => {
    setComponentName(name);
  };

  return (
    <OverlayContext.Provider value={{ componentName, handleCompName }}>
      {props.children}
    </OverlayContext.Provider>
  );
};

export default OverlayContextProvider;
