import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Estamos no lado do servidor!!!
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Protected Dashboard</h1>
      <p>
        {session?.user?.email
          ? session?.user?.email
          : "Usuário não esta logado!!!"}
      </p>
      {session.user?.email && (
        <div className="flex flex-col justify-center items-center gap-2">
          <form action={handleAuth}>
            <button
              type="submit"
              className="border rounded-md px-2 py-1 cursor-pointer"
            >
              Logout
            </button>
          </form>
          <Link href="/pagamentos" className="underline text-sky-500">
            {" "}
            Pagamentos{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
