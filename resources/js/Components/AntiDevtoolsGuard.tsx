/* eslint-disable no-debugger */
/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";

interface AntiDevtoolsGuardProps {
  children: React.ReactNode;
}

const AntiDevtoolsGuard = ({ children }: AntiDevtoolsGuardProps) => {
  const [isPassed, setIsPassed] = useState<boolean>(
    () => !!import.meta.env.DEV,
  );
  const [isCaught, setIsCaught] = useState<boolean>(false);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    // Local variable acts as a gate lock to prevent spamming React state
    let hasUnlockedGate = false;

    const executeGatecheck = (): void => {
      // 1. Viewport Size Check (Catches docked DevTools instantly)
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      if (widthThreshold || heightThreshold) {
        triggerBlock();
        return;
      }

      // 2. Timing Evaluation Trap (Catches undocked DevTools windows)
      const startTime = performance.now();

      debugger; // Crucial: Must remain present to trigger the console breakpoint pause

      const endTime = performance.now();

      if (endTime - startTime > 100) {
        triggerBlock();
      } else if (!hasUnlockedGate) {
        // Only trigger the React state change once on the very first successful pass
        hasUnlockedGate = true;
        setTimeout(() => {
          setIsPassed(true);
        }, 0);
      }
    };

    const triggerBlock = (): void => {
      setIsCaught(true);
      window.location.replace("about:blank");
    };

    executeGatecheck();

    const validationInterval = setInterval(executeGatecheck, 1000);

    return () => clearInterval(validationInterval);
  }, []);

  if (isCaught || !isPassed) {
    return <div className="hidden" aria-hidden="true" />;
  }

  return <>{children}</>;
};

export default AntiDevtoolsGuard;
