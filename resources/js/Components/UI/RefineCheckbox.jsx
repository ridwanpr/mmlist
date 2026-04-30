import { Checkbox, Field, Label } from "@headlessui/react";

const RefineCheckbox = ({ label, count, checked, onChange }) => {
  return (
    <div className="group/row flex items-center justify-between">
      <Field className="flex cursor-pointer items-center gap-3">
        <Checkbox
          checked={checked}
          onChange={onChange}
          className="bg-surface-alt border-border data-checked:bg-primary data-checked:border-primary focus-visible:ring-primary-soft block size-4 rounded border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          <svg
            className="stroke-surface opacity-0 transition-opacity data-checked:opacity-100"
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
        <Label className="text-text group-hover/row:text-primary-dark cursor-pointer text-sm font-medium transition-colors select-none">
          {label}
        </Label>
      </Field>

      {count && <p className="text-text-muted text-xs">{count}</p>}
    </div>
  );
};

export default RefineCheckbox;
