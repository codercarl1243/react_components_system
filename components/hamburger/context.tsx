import { createContext, useContext } from "react";
import type { HamburgerState } from '@/components/hamburger/hamburger.types';

export const HamburgerContext = createContext<HamburgerState | null>(null);

export function useHamburgerContext(): HamburgerState {
  const ctx = useContext(HamburgerContext);
  if (!ctx) {
    throw new Error("Hamburger components must be used within <Hamburger.Root>");
  }
  return ctx;
}
