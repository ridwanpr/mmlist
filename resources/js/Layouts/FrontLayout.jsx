import { router, usePage } from "@inertiajs/react";
import DekstopNav from "../Components/UI/DekstopNav";
import Footer from "../Components/UI/Footer";
import MobileNav from "../Components/UI/MobileNav";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const FrontLayout = ({ children }) => {
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
    <>
      <div className="relative min-h-screen">
        <Toaster position="top-right" richColors />
        <div>
          <DekstopNav />
        </div>
        <main>{children}</main>
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FrontLayout;
