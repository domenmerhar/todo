import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu } from "@radix-ui/react-context-menu";
import ContextMenuList from "./context-menu-list";

export default function TaskGroup({
  Icon,
  color,
  completedTasks,
  description,
  dueToday,
  title,
  totalTasks,
  id,
}: {
  Icon: React.ComponentType;
  color: string;
  title: string;
  description: string;
  totalTasks: number;
  completedTasks: number;
  dueToday: number;
  id: number;
}) {
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/app/group/${id}`} className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${color} text-white *:h-5 *:w-5`}
                  >
                    <Icon />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription className="text-sm">
                      {description}
                    </CardDescription>
                  </div>
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

                  {dueToday > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {dueToday} due today
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
