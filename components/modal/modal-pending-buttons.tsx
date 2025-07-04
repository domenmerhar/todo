import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ModalPendingButtons({
  isPending,
  buttonOneText,
  buttonTwoText,
}: {
  isPending: boolean;
  buttonOneText: string;
  buttonTwoText: string;
}) {
  return (
    <>
      <DialogClose asChild>
        <Button variant="outline" disabled={isPending}>
          {isPending ? <Spinner className="text-gray-100" /> : buttonOneText}
        </Button>
      </DialogClose>

      <Button type="submit" disabled={isPending}>
        {isPending ? <Spinner className="text-gray-100" /> : buttonTwoText}
      </Button>
    </>
  );
}
