import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to Our Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-lg mx-auto">
            Discover amazing features and join thousands of users who trust our
            platform.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/sign-in">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Ready to begin your journey? Click above to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
