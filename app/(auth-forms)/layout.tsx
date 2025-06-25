import { Card } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">{children}</Card>
      </div>
    </section>
  );
}
