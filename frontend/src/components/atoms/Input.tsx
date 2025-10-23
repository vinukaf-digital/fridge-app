interface InputProps {
  id: string;
  type: 'text' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

export const Input = ({ id, type, value, onChange, placeholder, ariaLabel }: InputProps) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label={ariaLabel}
    className="border border-gray-400 rounded px-3 py-2 shadow"
  />
);
