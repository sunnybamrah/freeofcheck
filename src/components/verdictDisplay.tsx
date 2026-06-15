import type { ComponentType } from "react";
import type { VerdictState } from "../lib/types";
import { AlertTriangle, HelpCircle, InfoCircle, MinusCircle } from "./Icons";

interface IconC {
  className?: string;
  size?: number;
  title?: string;
}

export interface VerdictDisplay {
  Icon: ComponentType<IconC>;
  /** chip text + bg classes (icon + text + color — never color alone) */
  chip: string;
  /** thin left accent bar on the card */
  accent: string;
}

// Color tokens from the dark palette (spec §4.1). Contrast verified in M7 (axe).
export const VERDICT_DISPLAY: Record<VerdictState, VerdictDisplay> = {
  contains: {
    Icon: AlertTriangle,
    chip: "bg-verdict-badBg text-verdict-badText",
    accent: "bg-verdict-badText",
  },
  ambiguous: {
    Icon: AlertTriangle,
    chip: "bg-verdict-warnBg text-verdict-warnText",
    accent: "bg-verdict-warnText",
  },
  not_listed: {
    // Neutral icon (not a green checkmark) — a checkmark also reads as "safe".
    Icon: InfoCircle,
    chip: "bg-verdict-okBg text-verdict-okText",
    accent: "bg-verdict-okText",
  },
  no_data: {
    Icon: MinusCircle,
    chip: "bg-verdict-noneBg text-verdict-noneText",
    accent: "bg-verdict-noneText",
  },
};

export { HelpCircle };
