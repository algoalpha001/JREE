import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => (
  <Sonner theme="light" className="toaster group" style={{ "--normal-bg": "var(--surface-1)", "--normal-text": "var(--text-1)", "--normal-border": "var(--hairline-strong)" } as CSSProperties} {...props} />
);
export { Toaster };
