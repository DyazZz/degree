"use client";
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
import { createChapter, updateChapter } from "@/functions/chapter";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

export async function CreateChapter({ teamId }: { teamId: string }) {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Создать раздел</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание нового раздела</DialogTitle>
          <DialogDescription>
            Введите данные для нового раздела
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            await createChapter(formData, teamId);
            router.refresh();
          }}
        >
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

export async function UpdateChapter({ chapter }: { chapter: Chapter }) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Редактировать раздел</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование раздела</DialogTitle>
          <DialogDescription>Введите данные для раздела</DialogDescription>
        </DialogHeader>
        <form
          action={async (formatData) => {
            await updateChapter(formatData, chapter.id);
            router.refresh();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input
                required
                id="name"
                name="name"
                defaultValue={chapter.name}
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
                defaultValue={chapter.description}
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
