"use client";

import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import { Switch } from "./ui/switch";
import { useState } from "react";

function DevMode() {
  const cookiemode = getCookie("mode");
  const [mode, setMode] = useState(cookiemode);
  return (
    <div className="flex items-center gap-2">
      <p>DevMode</p>
      <Switch
        checked={cookiemode === "dev"}
        onCheckedChange={() => {
          if (mode === "dev") {
            setCookie("mode", "plain");
            setMode("plain");
          } else {
            setCookie("mode", "dev");
            setMode("dev");
          }
        }}
      />
    </div>
  );
}

export default DevMode;
