import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border bg-transparent hover:bg-gray-100",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
};
