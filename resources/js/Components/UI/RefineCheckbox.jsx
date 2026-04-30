import { Checkbox, Field, Label } from "@headlessui/react";

const RefineCheckbox = ({ label, count, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <Field className="flex items-center gap-6">
        <Checkbox
          checked={checked}
          onChange={onChange}
          className="group bg-surface-alt data-checked:bg-primary block size-4 rounded border"
        >
          <svg
            className="stroke-white opacity-0 group-data-checked:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <Label>{label}</Label>
      </Field>
      {count && <p className="text-text-muted">{count}</p>}
    </div>
  );
};

export default RefineCheckbox;
