import * as React from "react";
import { cn } from "../../lib/utils";

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea";
}

export const Field = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  ({ className, label, error, as: Component = "input", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-ink">{label}</label>
        <Component
          ref={ref as any}
          className={cn(
            "flex w-full rounded-md border border-rose/30 bg-porcelain px-3 py-2 text-sm ring-offset-porcelain placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-deep",
            Component === "textarea" && "min-h-[100px]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-deep">{error}</p>}
      </div>
    );
  }
);
Field.displayName = "Field";
