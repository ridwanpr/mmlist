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
  footer?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const ModalDialog = ({
  isOpen,
  setIsOpen,
  title,
  children,
  footer,
  onSubmit,
}: ModalDialogProps) => {
  const header = (
    <div className="border-border flex shrink-0 items-center justify-between border-b p-4">
      <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="hover:bg-surface-alt rounded-full p-2 transition-colors"
      >
        <LuX className="h-5 w-5" />
      </button>
    </div>
  );

  const body = <div className="flex-1 overflow-y-auto p-4">{children}</div>;

  const footerEl = footer && (
    <div className="border-border flex shrink-0 gap-3 border-t p-4">
      {footer}
    </div>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 transition-opacity" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 sm:p-0">
        <DialogPanel className="bg-surface border-border flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border shadow-xl">
          {onSubmit ? (
            <form onSubmit={onSubmit} className="flex h-full flex-col">
              {header}
              {body}
              {footerEl}
            </form>
          ) : (
            <div className="flex h-full flex-col">
              {header}
              {body}
              {footerEl}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
