type SelectItem = {
  value: string;
  label: string;
};

type SelectOptionProps = {
  label: string;
  items: SelectItem[];
};

export const SelectOption = ({ label, items }: SelectOptionProps) => {
  return (
    <div>
      <label htmlFor="status" className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <select
        name="status"
        id="status"
        className="border-border bg-surface text-text hover:bg-surface-alt w-full rounded-lg border px-3 py-2.5 outline-none hover:cursor-pointer"
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
