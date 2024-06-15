"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Task } from "@prisma/client";
import { useState } from "react";

function TasksBody({ tasks }: { tasks: Task[] }) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  return (
    <div className="flex gap-8">
      <section className="flex w-5/12 flex-col gap-12">
        {tasks.map((task) => (
          <div key={task.id}>
            <h2 className="mb-4">{task.expirationDate.toLocaleDateString()}</h2>
            <Button
              asChild
              variant="outline"
              onClick={() => setActiveTask(task)}
              className="bg-blue-50"
            >
              <Card className="flex cursor-pointer items-center justify-between px-8 py-12">
                <p>{task.name}</p>
                <p>{">"}</p>
              </Card>
            </Button>
          </div>
        ))}
      </section>
      <section className="mt-10 w-1/2">
        {activeTask ? (
          <Card className="sticky top-8 flex min-h-[60dvh] flex-col gap-8 bg-blue-50 p-8">
            <h2 className="text-2xl font-semibold">{activeTask.name}</h2>
            <p>{activeTask.description}</p>
            <div className="ml-auto mt-auto flex w-fit gap-6">
              <Button>Выполнено</Button>
              <Button onClick={() => setActiveTask(null)}>Закрыть</Button>
            </div>
          </Card>
        ) : (
          <Card className="sticky top-8 flex min-h-[60dvh] flex-col gap-8 p-8">
            <p>Здесь будет выводится описание задания</p>
          </Card>
        )}
      </section>
    </div>
  );
}

export default TasksBody;
