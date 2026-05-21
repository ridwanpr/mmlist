import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, Toaster } from "sonner";

import DekstopNav from "../Components/DekstopNav";
import Footer from "../Components/Footer";
import MobileNav from "../Components/MobileNav";

interface FrontLayoutProps {
  children: React.ReactNode;
}

const FrontLayout = ({ children }: FrontLayoutProps) => {
  const { flash } = usePage();

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

  return (
    <>
      <div className="bg-background relative flex min-h-screen flex-col">
        <Toaster position="top-right" richColors closeButton />
        <div>
          <DekstopNav />
        </div>
        <main className="flex flex-1 flex-col">{children}</main>
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FrontLayout;
