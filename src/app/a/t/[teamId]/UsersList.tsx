"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteRoleFromUser } from "@/functions/role";
import { deleteUserFromTeam } from "@/functions/team";
import { Team, User } from "@prisma/client";

function UsersList({
  users,
  editable = false,
  team,
}: {
  team?: Team;
  users: User[];
  editable: boolean;
}) {
  if (!editable)
    return (
      <div className="flex gap-8">
        {users.map((user) => {
          return (
            <Avatar className="h-20 w-20 outline outline-2 outline-offset-2 outline-blue-600">
              <AvatarImage src={user.image!} />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    );
  if (editable)
    return (
      <div className="flex gap-8">
        {users.map((user) => {
          return (
            <ContextMenu key={user.id}>
              <ContextMenuTrigger>
                <Avatar className="h-20 w-20 outline outline-2 outline-offset-2 outline-blue-600">
                  <AvatarImage src={user.image!} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Профиль</ContextMenuItem>
                <ContextMenuItem>Выдать права модерации</ContextMenuItem>
                <ContextMenuItem>
                  <form
                    action={async () => {
                      console.log("submition");
                      await deleteRoleFromUser(user.id, team!.id!);
                    }}
                  >
                    <Button type="submit" variant="ghost">
                      <p className="text-red-500">Убрать права модерации</p>
                    </Button>
                  </form>
                </ContextMenuItem>
                <ContextMenuItem>
                  <form
                    action={async () => {
                      console.log("submition");
                      await deleteUserFromTeam(team!, user);
                    }}
                  >
                    <Button type="submit" variant="ghost">
                      <p className="text-red-500">Удалить участника</p>
                    </Button>
                  </form>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    );
}

export default UsersList;
