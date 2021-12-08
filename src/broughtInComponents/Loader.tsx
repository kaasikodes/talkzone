import React from "react";
import { motion } from "framer-motion";
import { TransitionDefinition } from "framer-motion/types/types";

const Loader = () => {
  return (
    <div className="h-4 w-full flex justify-center items-center">
      <motion.div
        className="bg-green-400 w-full"
        animate={{
          x: ["400px", "0", "-400px"],
        }}
        transition={{
          yoyo: Infinity as unknown as TransitionDefinition,
          duration: 1 as unknown as TransitionDefinition,
          type: "tween" as unknown as TransitionDefinition,
        }}
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
        }}
      ></motion.div>
    </div>
  );
};

export default Loader;
