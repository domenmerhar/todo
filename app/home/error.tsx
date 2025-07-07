"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">404</h1>
          <p className="text-lg md:text-md text-gray-600 max-w-lg mx-auto">
            Something went wrong!
          </p>
        </div>

        <Button onClick={reset} size="lg" className="text-lg px-8 py-3">
          Return to website
        </Button>
      </div>
    </div>
  );
}
