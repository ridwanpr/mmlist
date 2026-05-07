import { Field, Input, Label } from "@headlessui/react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  handleChange,
}: InputFieldProps) => {
  return (
    <Field className="space-y-1">
      <Label className="text-text text-sm font-medium">{label}</Label>

      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="border-border text-text placeholder:text-text-muted/70 focus:border-primary focus:ring-primary/15 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition outline-none focus:ring-2"
      />
    </Field>
  );
};

export default InputField;