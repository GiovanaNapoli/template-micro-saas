import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard Page</h1>
      <p>
        {session?.user?.email ? session.user.email : "usuario não esta logado"}
      </p>
    </main>
  );
}
