import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
        {
          "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl border border-white/20": variant === "default",
          "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl border border-white/20": variant === "destructive",
          "glass-card border border-white/30 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-700 dark:text-slate-300 hover:shadow-lg": variant === "outline",
          "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-700": variant === "secondary",
          "hover:bg-purple-500/10 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 rounded-lg": variant === "ghost",
          "text-purple-600 underline-offset-4 hover:underline dark:text-purple-400": variant === "link",
        },
        {
          "h-10 px-4 py-2 text-sm": size === "default",
          "h-8 rounded-lg px-3 text-xs": size === "sm",
          "h-12 rounded-xl px-8 text-lg": size === "lg",
          "h-10 w-10 rounded-lg": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }

