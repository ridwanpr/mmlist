import { usePage } from "@inertiajs/react";
import DekstopNav from "../Components/UI/DekstopNav";
import Footer from "../Components/UI/Footer";
import MobileNav from "../Components/UI/MobileNav";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const FrontLayout = ({ children }) => {
  const { flash } = usePage();

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

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
