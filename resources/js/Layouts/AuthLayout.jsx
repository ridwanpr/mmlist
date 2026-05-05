import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const AuthLayout = ({ children }) => {
  const { flash } = usePage();

  useEffect(() => {
    const cleanup = router.on("flash", (event) => {
      const { success, error, warning, info } = event.detail.flash;

      if (success) toast.success(success);
      if (error) toast.error(error);
      if (warning) toast.warning(warning);
      if (info) toast.info(info);
    });

    return () => cleanup();
  }, []);

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
