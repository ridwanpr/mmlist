import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import type { SetStateAction } from 'react';
import type React from 'react';
import { LuX } from 'react-icons/lu';

type AdvanceFilterModalProps = {
  showAdvanceFilter: boolean;
  setShowAdvanceFilter: React.Dispatch<SetStateAction<boolean>>;
};

const AdvanceFilterModal = ({
  showAdvanceFilter,
  setShowAdvanceFilter,
}: AdvanceFilterModalProps) => {
  return (
    <Dialog
      open={showAdvanceFilter}
      onClose={() => setShowAdvanceFilter(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="bg-surface border-border flex max-h-[85dvh] w-full flex-col rounded-t-2xl border border-b-0 shadow-2xl transition duration-200 data-closed:translate-y-4 data-closed:opacity-0 sm:max-w-md sm:rounded-2xl sm:border-b"
        >
          {/* Header */}
          <div className="border-border/60 flex items-center justify-between border-b px-5 py-4">
            <DialogTitle className="text-text font-serif text-lg font-semibold">
              Advance Filter
            </DialogTitle>
            <button className="text-text-muted hover:text-text hover:bg-surface-alt cursor-pointer rounded-lg p-1.5 transition-colors">
              <LuX className="size-4" />
            </button>
          </div>

          {/* Body */}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AdvanceFilterModal;
