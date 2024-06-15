import { ReactElement } from "react";

function PageBody({ children }: { children: ReactElement }) {
  return <div className="px-6">{children}</div>;
}

export default PageBody;
