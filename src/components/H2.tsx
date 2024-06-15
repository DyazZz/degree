import React from "react";

function H2({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`text-2xl font-semibold ${className}`}>{children}</h1>;
}

export default H2;
