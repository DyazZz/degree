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

async function CreateArticle({ chapterId }: { chapterId: number }) {
  const session = auth();

  async function createArticle(formdata: FormData) {
    "use server";
    const rawFormData = {
      name: formdata.get("name")!.toString(),
    };

    await prisma.article.create({
      data: {
        name: rawFormData.name,
        chapterId: chapterId,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Новая статья</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание новой статьи</DialogTitle>
          <DialogDescription>Введите данные для новой статьи</DialogDescription>
        </DialogHeader>
        <form action={createArticle}>
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

export default CreateArticle;
