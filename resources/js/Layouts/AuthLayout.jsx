import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const AuthLayout = ({ children }) => {
  const { flash } = usePage();

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

  return (
    <div className="bg-background">
      <Toaster position="top-right" richColors />
      <div className="mx-auto min-h-dvh max-w-xl p-4 md:flex md:flex-col md:items-center md:justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
