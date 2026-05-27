/// <reference types="vite/client" />
import React, { useEffect } from "react";

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

const AnalyticsWrapper = ({ children }: AnalyticsWrapperProps) => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      import("disable-devtool")
        .then((module) => {
          const DisableDevtool = module.default;
          DisableDevtool({
            disableMenu: false,
            clearLog: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return <>{children}</>;
};

export default AnalyticsWrapper;
