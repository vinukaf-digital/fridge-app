interface ButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const Button = ({ onClick, variant = 'primary', children, className = '', ariaLabel }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-gray-300 text-gray-700 hover:bg-gray-400"
  };
  
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};