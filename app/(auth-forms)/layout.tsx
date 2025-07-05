import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function AuthFormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await getSession()) redirect("/home");

  return (
    <section>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">{children}</Card>
      </div>
    </section>
  );
}
