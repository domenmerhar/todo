import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">404</h1>
          <p className="text-lg md:text-md text-gray-600 max-w-lg mx-auto">
            Looks like you&apos;ve ventured into the unknown digial realm.
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="text-lg px-8 py-3">
            Return to website
          </Button>
        </Link>
      </div>
    </div>
  );
}
