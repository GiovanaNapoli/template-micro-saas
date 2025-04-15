import { handleAuth } from "@/app/actions/handle-auth";
import { Google } from "developer-icons";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Login Page</h1>
      <form action={handleAuth}>
        <button
          type="submit"
          className="flex items-center gap-2 cursor-pointer p-2 border rounded-md"
        >
          <Google size={16} />
          Signin with Google
        </button>
      </form>
    </main>
  );
}
