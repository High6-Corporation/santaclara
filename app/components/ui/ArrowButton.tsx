"use client";

import { useState } from "react";

interface ArrowButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function ArrowButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[21px] rounded-[100px] shrink-0 cursor-pointer transition-all duration-300 ease-in-out font-body font-semibold text-[16px] tracking-[-0.64px] whitespace-nowrap";

  const variantStyles = {
    primary: "bg-[#e31c26] text-white hover:bg-[#a91f1a]",
    secondary: "bg-[#04217b] text-white hover:bg-[#031545]",
    outline:
      "bg-transparent border-2 border-white text-white hover:bg-white/10",
  };

  const content = (
    <>
      {children}
      <div
        className={`relative shrink-0 size-[24px] transition-transform duration-300 ease-in-out ${
          isHovered ? "rotate-[-45deg]" : "rotate-0"
        }`}
      >
        <img
          src="/images/arrow-icon.svg"
          alt="Arrow"
          className="absolute inset-0 size-full"
        />
      </div>
    </>
  );

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
