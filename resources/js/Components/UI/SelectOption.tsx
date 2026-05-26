import type React from "react";

type SelectItem = {
  value: string;
  label: string;
};

type SelectOptionProps = {
  label: string;
  name: string;
  id: string;
  items: SelectItem[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string | number;
};

export const SelectOption = ({
  label,
  name,
  id,
  items,
  onChange,
  value,
}: SelectOptionProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        className="border-border bg-surface-alt text-text focus:border-accent-gold w-full cursor-pointer rounded-xl border px-3 py-2.5 text-sm outline-hidden transition-colors"
      >
        <option value="">Select</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
