import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function useUpdateSearchParams(
  name: string,
  initialValue?: string
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(name);

  useEffect(() => {
    if (!currentValue && initialValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, initialValue);
      router.replace(`?${params.toString()}`);
    }
  }, [currentValue, initialValue, router, searchParams, name]);

  const update = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(`?${params.toString()}`);
    },
    [name, searchParams, router]
  );

  return update;
}
