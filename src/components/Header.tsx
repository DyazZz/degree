import { auth } from "@/auth";
import UserButton from "./UserButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { cookies } from "next/headers";
import DevMode from "./DevMode";
import { redirect } from "next/navigation";
import Search from "./Search";

async function Header({ type, teamId }) {
  const session = await auth();
  const user = session!.user!;
  const store = cookies();

  if (type === "app")
    return (
      <header className=" flex w-full justify-between border-b-2 bg-blue-500 px-8 py-3 pl-[120px]">
        <Search teamId={teamId} />
        <div className="flex items-center gap-4">
          {/* <DevMode /> */}
          <UserButton user={user} />
        </div>
      </header>
    );

  return (
    <header className="flex w-full justify-between border-b-2 px-8 py-3">
      <p></p>
      <UserButton user={user} />
    </header>
  );
}

export default Header;
