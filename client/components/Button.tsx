import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "secondary",
  size = "md",
  external = false,
  className,
}: ButtonProps) {
  const baseStyles = "font-meta font-semibold transition-all inline-block";

  const variantStyles = {
    primary:
      "bg-dark-accent text-brand-black px-8 py-3 rounded-full hover:bg-opacity-90",
    secondary:
      "bg-dark-accent text-brand-black px-6 py-2 rounded-full hover:bg-opacity-90 border border-dark-accent",
    text: "text-brand-white hover:underline",
  };

  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base",
    lg: "text-lg px-8 py-3",
  };

  const finalClassName = cn(
    baseStyles,
    variantStyles[variant],
    size !== "md" && sizeStyles[size],
    className
  );

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link to={href} className={finalClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
}
