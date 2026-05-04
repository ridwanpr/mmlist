import { Field, Input, Label } from "@headlessui/react";

const InputField = ({ label, name, type, placeholder, autoComplete }) => {
  return (
    <Field className="space-y-1.5">
      <Label className="text-text text-sm font-medium">{label}</Label>
      <Input
        name={name}
        type={type}
        autoComplete={autoComplete || name}
        placeholder={placeholder}
        className="border-border text-text placeholder:text-text-muted/70 focus:border-primary focus:ring-primary/15 w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm transition outline-none focus:ring-2"
      />
    </Field>
  );
};

export default InputField;
