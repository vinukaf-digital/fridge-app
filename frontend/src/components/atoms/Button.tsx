import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const Button = ({
  onClick,
  variant = "primary",
  children,
  className = "",
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "px-4 py-2 rounded font-medium transition-colors",
        {
          "bg-blue-900 text-white hover:bg-blue-600": variant === "primary",
          "bg-gray-500 text-white hover:bg-gray-600": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          "bg-gray-300 text-gray-700 hover:bg-gray-400": variant === "ghost",
        },
        className
      )}
    >
      {children}
    </button>
  );
};
