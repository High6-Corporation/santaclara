import Link from "next/link";
import { ArrowButton } from "../ui/ArrowButton";

interface ButtonConfig {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

interface ContentBlockProps {
  subtitle?: string;
  badge?: string;
  title?: string;
  titleImage?: string;
  titleSuffix?: string;
  paragraphs?: React.ReactNode[];
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  showLine?: boolean;
  lineWidth?: string;
  align?: "left" | "center";
  textColor?: string;
  titleColor?: string;
  lineColor?: string;
  badgeBorderColor?: string;
  badgeTextColor?: string;
  className?: string;
  gap?: string;
  titleTracking?: string;
  titleSize?: string;
  textSize?: string;
  removeParagraphSpacing?: boolean;
  bulletIcon?: string;
  paragraphMarginTop?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function ContentBlock({
  subtitle,
  badge,
  title,
  titleImage,
  titleSuffix,
  paragraphs,
  primaryButton,
  secondaryButton,
  showLine = true,
  lineWidth = "w-80",
  align = "left",
  textColor = "text-[#1e1e1e]",
  titleColor = "text-[#04217B]",
  lineColor = "bg-[#1e1e1e]",
  badgeBorderColor = "border-[#2c2525]",
  badgeTextColor = "text-[#2c2525]",
  className = "",
  gap = "gap-10",
  titleTracking = "tracking-[-2.4px]",
  titleSize = "text-[36px] md:text-[48px] lg:text-[60px]",
  textSize = "text-[16px]",
  removeParagraphSpacing = false,
  bulletIcon,
  paragraphMarginTop,
  titleTag: TitleTag = 'h2',
}: ContentBlockProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const lineAlignClass = align === "center" ? "mx-auto" : "";
  const hasButtons = primaryButton || secondaryButton;

  return (
    <div className={`flex flex-col ${gap} ${alignClass} ${className}`}>
      <div className="flex flex-col gap-4">
        {badge && (
          <div className={`inline-flex h-[48px] items-center justify-center px-[24px] relative rounded-[99px] border ${badgeBorderColor} w-fit`}>
            <span className={`font-body font-normal ${badgeTextColor} text-[16px] whitespace-nowrap`}>{badge}</span>
          </div>
        )}
        {subtitle && (
          <h4
            className={`text-2xl leading-6 tracking-tight ${textColor} font-body`}
          >
            {subtitle}
          </h4>
        )}
        {(title || titleImage || titleSuffix) && (
          <TitleTag
            className={`${titleSize} leading-[1.1] ${titleTracking} ${titleColor} flex items-center justify-center gap-2 font-body`}
          >
            {title}
            {titleImage && (
              <img
                src={titleImage}
                alt=""
                className="h-6 md:h-10 w-auto inline-block"
              />
            )}
            {titleSuffix}
          </TitleTag>
        )}
      </div>

      {showLine && (
        <div className={`${lineWidth} h-[2px] ${lineColor} ${lineAlignClass}`} />
      )}

      {paragraphs && paragraphs.length > 0 && (
        <div className={`${textSize} leading-[28px] tracking-[-0.64px] ${textColor} font-body ${paragraphMarginTop}`}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="flex items-start gap-3">
              {bulletIcon && (
                <img 
                  src={bulletIcon} 
                  alt="" 
                  className="w-[32px] h-[32px] mt-1 flex-shrink-0"
                />
              )}
              <span>
                {paragraph}
                {!removeParagraphSpacing && index < paragraphs.length - 1 && (
                  <span className="hidden lg:block">&nbsp;</span>
                )}
              </span>
            </p>
          ))}
        </div>
      )}

      {hasButtons && (
        <div className="flex flex-wrap gap-4">
          {primaryButton && (
            <ArrowButton
              href={primaryButton.href}
              onClick={primaryButton.onClick}
              variant={primaryButton.variant || "primary"}
            >
              {primaryButton.text}
            </ArrowButton>
          )}
          {secondaryButton && (
            <ArrowButton
              href={secondaryButton.href}
              onClick={secondaryButton.onClick}
              variant={secondaryButton.variant || "outline"}
            >
              {secondaryButton.text}
            </ArrowButton>
          )}
        </div>
      )}
    </div>
  );
}

// Mobile version
export function MobileContentBlock({
  subtitle,
  badge,
  title,
  titleImage,
  titleSuffix,
  paragraphs,
  primaryButton,
  secondaryButton,
  showLine = true,
  align = "center",
  textColor = "text-[#1e1e1e]",
  titleColor = "text-[#04217B]",
  lineColor = "bg-[#1e1e1e]",
  badgeBorderColor = "border-[#2c2525]",
  badgeTextColor = "text-[#2c2525]",
  className = "",
  paragraphMarginTop,
}: ContentBlockProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const hasButtons = primaryButton || secondaryButton;

  return (
    <div className={`mb-8 ${alignClass} ${className}`}>
      {badge && (
        <div className={`inline-flex h-[48px] items-center justify-center px-[24px] relative rounded-[99px] border ${badgeBorderColor} w-fit mb-4`}>
          <span className={`font-body font-normal ${badgeTextColor} text-[16px] whitespace-nowrap`}>{badge}</span>
        </div>
      )}
      {subtitle && (
        <h4
          className={`text-xl md:text-2xl leading-5 md:leading-6 ${textColor} mb-4 font-body`}
        >
          {subtitle}
        </h4>
      )}
      {(title || titleImage || titleSuffix) && (
        <h3
          className={`text-[28px] leading-9 md:text-[44px] md:leading-[48px] ${titleColor} mb-6 font-heading flex items-center justify-center gap-2`}
        >
          {title}
          {titleImage && (
            <img
              src={titleImage}
              alt=""
              className="h-6 md:h-10 w-auto inline-block"
            />
          )}
          {titleSuffix}
        </h3>
      )}

      {showLine && (
        <div className={`w-full max-w-xs h-px ${lineColor} mb-6 mx-auto`} />
      )}

      {paragraphs && paragraphs.length > 0 && (
        <div
          className={`text-sm md:text-base ${textColor} space-y-4 mb-8 font-body ${paragraphMarginTop}`}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 1 ? "hidden lg:block" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {hasButtons && (
        <div
          className={`flex flex-wrap gap-4 ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
        >
          {primaryButton && (
            <ArrowButton
              href={primaryButton.href}
              onClick={primaryButton.onClick}
              variant={primaryButton.variant || "primary"}
            >
              {primaryButton.text}
            </ArrowButton>
          )}
          {secondaryButton && (
            <ArrowButton
              href={secondaryButton.href}
              onClick={secondaryButton.onClick}
              variant={secondaryButton.variant || "outline"}
            >
              {secondaryButton.text}
            </ArrowButton>
          )}
        </div>
      )}
    </div>
  );
}
