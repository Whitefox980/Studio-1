import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return <div>Morate biti prijavljeni</div>;
  }

  return (
    <div>
      <h1>Dobrodošli, {session.user?.name}</h1>
      {/* Dashboard sadržaj */}
    </div>
  );
}