import type React from "react";
import { Field, Input, Label } from "@headlessui/react";

interface InputFieldProps {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
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
    <Field className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={name} className="text-text text-sm font-medium">
          {label}
        </Label>
      )}

      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/70 w-full rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
      />
    </Field>
  );
};

export default InputField;
