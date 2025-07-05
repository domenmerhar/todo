import { Spinner } from "@/components/ui/spinner";

export default function RootLoading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
