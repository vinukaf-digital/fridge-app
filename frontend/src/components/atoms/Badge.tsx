import clsx from "clsx";

interface BadgeProps {
  label: string;
  variant: "fresh" | "expiring" | "expired";
}

export const Badge = ({ label, variant }: BadgeProps) => {
  return (
    <div
      className={clsx("text-xs flex-1 text-center px-1 py-2 rounded-full inline-block", {
        "bg-green-400 text-white": variant === "fresh",
        "bg-yellow-400 text-black": variant === "expiring",
        "bg-red-400 text-white": variant === "expired",
      })}
    >
      {label}
    </div>
  );
};
