import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type React from "react";
import { LuX } from "react-icons/lu";

interface ModalDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

const ModalDialog = ({ isOpen, setIsOpen, title, children }: ModalDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 transition-opacity" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 sm:p-0">
        <DialogPanel className="bg-surface border-border flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border shadow-xl">
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b p-4">
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-surface-alt rounded-full p-2 transition-colors"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Body area */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>

          {/* Footer Actions */}
          <div className="border-border flex gap-3 border-t p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="border-border hover:bg-surface-alt flex-1 rounded-lg border py-2.5 font-medium transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary flex-1 rounded-lg py-2.5 font-medium text-white transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
