import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getSession())) redirect("/sign-in");

  return <section>{children}</section>;
}
