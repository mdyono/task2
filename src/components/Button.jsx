import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, variant = "default", size = "md", onClick }) {
  const variants = {
    default: "bg-blue-500 text-white",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-200",
  };

  const sizes = {
    md: "px-4 py-2 text-base",
    icon: "p-2 rounded-full",
  };

  return (
    <motion.button
      className={`rounded-md ${variants[variant]} ${sizes[size]} flex items-center justify-center`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
