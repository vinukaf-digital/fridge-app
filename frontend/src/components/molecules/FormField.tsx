import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'date';
  value: string;
  onChange: (value: string) => void;
}

export const FormField = ({ id, label, type, value, onChange }: FormFieldProps) => (
  <div className="flex flex-col">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} ariaLabel={label} />
  </div>
);

