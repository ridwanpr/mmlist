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
};

export const SelectOption = ({
  label,
  name,
  id,
  items,
  onChange,
}: SelectOptionProps) => {
  return (
    <div>
      <label htmlFor="status" className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={id}
        className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none hover:cursor-pointer"
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
