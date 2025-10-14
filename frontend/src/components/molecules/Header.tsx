interface HeaderProps {
  userName: string;
  subtitle: string;
}

export const Header = ({ userName, subtitle }: HeaderProps) => (
  <div className="flex flex-col self-center">
    <h1
      className="text-4xl sm:text-6xl font-extrabold text-center sm:text-left"
      style={{ color: "#003A59" }}
    >
      Good Morning, {userName}!
    </h1>
    <h3
      className="text-2xl sm:text-3xl font-semibold text-center sm:text-left"
      style={{ color: "#728197" }}
    >
      {subtitle}
    </h3>
  </div>
);
