import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu } from "@radix-ui/react-context-menu";
import ContextMenuList from "./context-menu-list";
import { cn } from "@/lib/utils";

export default function TaskGroup({
  Icon,
  color,
  completedTasks,
  title,
  totalTasks,
  id,
  className,
}: {
  Icon: React.ComponentType;
  color: string;
  title: string;
  totalTasks: number;
  completedTasks: number;
  id: number;
  className?: string;
}) {
  const completionPercentage =
    Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/home/${id}`} className="block">
          <Card
            className={cn(
              "hover:shadow-lg transition-shadow cursor-pointer",
              className
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg text-white *:h-5 *:w-5`}
                    style={{ backgroundColor: color }}
                  >
                    <Icon />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
                <ContextMenuList id={id} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {completedTasks}/{totalTasks} tasks
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
