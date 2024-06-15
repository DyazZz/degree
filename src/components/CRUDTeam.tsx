import { auth } from "@/auth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import prisma from "@/lib/prisma";

export async function CreateTeam() {
  const session = await auth();

  async function createTeam(formdata: FormData) {
    "use server";
    const rawFormData = {
      name: formdata.get("name")!.toString(),
      desciption: formdata.get("description")!.toString(),
    };

    const user = await prisma.user.findUnique({
      where: {
        id: session!.user!.id,
      },
    });

    const newTeam = await prisma.team.create({
      data: {
        name: rawFormData.name,
        description: rawFormData.desciption,
        users: {
          connect: [user],
        },
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Создать команду</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание новой команды</DialogTitle>
          <DialogDescription>
            Введите данные для новой команды
          </DialogDescription>
        </DialogHeader>
        <form action={createTeam}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input
                required
                id="name"
                name="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Описание
              </Label>
              <Input
                required
                id="description"
                name="description"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
