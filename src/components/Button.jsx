import React from "react";

const Button = ({ children, variant = "default", size = "md", ...props }) => {
  const baseStyles = "rounded-md transition-all duration-200";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-200",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2 text-xl",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
