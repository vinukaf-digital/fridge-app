import clsx from "clsx";

interface BadgeProps {
  label: string;
  variant: "fresh" | "expiring" | "expired";
}

export const Badge = ({ label, variant }: BadgeProps) => {
  return (
    <div
      className={clsx("text-xs flex-1 text-center px-2 py-1 rounded", {
        "bg-green-500 text-white": variant === "fresh",
        "bg-yellow-500 text-black": variant === "expiring",
        "bg-red-500 text-white": variant === "expired",
      })}
    >
      {label}
    </div>
  );
};
