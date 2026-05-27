import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, Toaster } from "sonner";

import DekstopNav from "../Components/DekstopNav";
import Footer from "../Components/Footer";
import MobileNav from "../Components/MobileNav";
import AnalyticsWrapper from "../Components/AnalyticsWrapper";

interface FrontLayoutProps {
  children: React.ReactNode;
}

interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

const FrontLayout = ({ children }: FrontLayoutProps) => {
  const { flash } = usePage() as unknown as { flash: FlashMessages };

  useEffect(() => {
    if (!flash) return;

    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

  return (
    <>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className:
            "font-sans !bg-surface !text-text border !border-border shadow-xl rounded-xl p-4 !w-fit !min-w-[240px] !max-w-md",
          classNames: {
            success: "!border-l-4 !border-l-success [&_svg]:!text-success",
            error: "!border-l-4 !border-l-accent-red [&_svg]:!text-accent-red",
            warning:
              "!border-l-4 !border-l-accent-gold [&_svg]:!text-accent-gold",
            info: "!border-l-4 !border-l-primary [&_svg]:!text-primary",
            description: "text-text-muted",
            closeButton:
              "!bg-surface !text-text-muted !border-border hover:!text-text",
          },
        }}
      />

      <AnalyticsWrapper>
        <div className="bg-background relative flex min-h-screen flex-col">
          <div>
            <DekstopNav />
          </div>
          <main className="flex flex-1 flex-col">{children}</main>
          <div className="lg:hidden">
            <MobileNav />
          </div>
          <Footer />
        </div>
      </AnalyticsWrapper>
    </>
  );
};

export default FrontLayout;
