interface BadgeProps {
  label: string;
  color: string;
}

export const Badge = ({ label, color }: BadgeProps) => (
  <div className={`text-xs flex-1 text-center ${color}`}>
    {label}
  </div>
);

