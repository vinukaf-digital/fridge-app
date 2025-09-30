interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => (
  <label htmlFor={htmlFor} className="mb-1 text-sm font-medium text-black">
    {children}
  </label>
);
