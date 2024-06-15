import { auth } from "@/auth";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import prisma from "@/lib/prisma";

async function Profile() {
  const session = await auth();

  const userData = await prisma.user.findUnique({
    where: {
      id: session!.user!.id,
    },
    include: {
      teams: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <H1>Профиль</H1>

      <div>
        <H2>Имя пользователя</H2>
        <p>{userData?.name}</p>
      </div>
      <div>
        <H2>Электронная почта</H2>
        <p>{userData?.email}</p>
      </div>
    </div>
  );
}

export default Profile;
