import { useEffect } from "react";
import { toast } from "sonner";

export default function useToastTrue(boolean: boolean, text: string) {
  useEffect(() => {
    if (!boolean) return;

    toast.success(text);
  }, [boolean, text]);
}
