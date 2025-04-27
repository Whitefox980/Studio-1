import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github"); // Ili drugi provider
      }}
    >
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}