import React from "react";

function H1({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
}

export default H1;
