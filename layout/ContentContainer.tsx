import Link from "next/link";

type ContentLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const ContentContainer = ({
  children,
  className,
}: ContentLayoutProps) => {
  return (
    <div className={`container max-w-7xl mx-auto ${className}`}>{children}</div>
  );
};
