import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const StatisticCard = ({
  title,
  content,
  contentDescription,
}: {
  title: string | number;
  content: string;
  contentDescription: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{contentDescription}</p>
      </CardContent>
    </Card>
  );
};
