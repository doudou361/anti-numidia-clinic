import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-rose-deep text-porcelain hover:opacity-90": variant === "primary",
            "border border-rose text-rose-deep hover:bg-rose/10": variant === "secondary",
            "text-rose-deep hover:bg-rose/10": variant === "ghost",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
