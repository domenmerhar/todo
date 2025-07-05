import { ICONS } from "@/lib/constants/icons";
import { getGroupById } from "@/lib/db/group";
import { notFound } from "next/navigation";
import React, { CSSProperties } from "react";

export default async function GroupTitle({ groupId }: { groupId: string }) {
  const res = await getGroupById(groupId);

  if (!res.success || !res.group) return notFound();

  const { color, group_name: groupName, icon } = res.group;

  const Icon = ICONS.find(({ name }) => name === icon)?.value;
  const iconStyle: CSSProperties = { backgroundColor: color };

  return (
    <div className="flex gap-4 items-center mb-4">
      {Icon ? (
        <Icon style={iconStyle} className="text-white size-12 p-2 rounded-lg" />
      ) : null}
      <h2 className="text-2xl font-bold">{groupName}</h2>
    </div>
  );
}
