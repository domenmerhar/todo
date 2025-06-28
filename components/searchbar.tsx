"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useUpdateSearchParams from "@/lib/hooks/useUpdateSearchParams";

export default function SearchBar({ ...props }: React.ComponentProps<"input">) {
  const [query, setQuery] = useState<string>("");
  const update = useUpdateSearchParams("query");

  useEffect(() => {
    const timeout = setTimeout(() => {
      update(query);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [update, query]);

  return (
    <div className="space-y-2">
      <div className="relative bg-gray-50 rounded-md border-0">
        <Input
          type="search"
          {...props}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
