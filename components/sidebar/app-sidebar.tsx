import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import Avatar from "@/components/avatar";
import { Plus } from "lucide-react";
import SidebarTrigger from "./sidebar-button";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddTaskGroupModal from "../ui/add-task-group-modal";

export function AppSidebar() {
  return (
    <Dialog>
      <Sidebar side="right" collapsible="icon" className="min-w-12">
        <SidebarRail />
        <SidebarHeader>
          <SidebarTrigger tooltipContent="Username">
            <Avatar variant="large">CN</Avatar>
          </SidebarTrigger>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup></SidebarGroup>
          <SidebarGroup />
        </SidebarContent>

        <SidebarFooter>
          <DialogTrigger asChild>
            <SidebarTrigger tooltipContent="Add Group">
              <Button className="size-10" asChild>
                <Plus className="stroke-secondary size-12 p-0" />
              </Button>
            </SidebarTrigger>
          </DialogTrigger>
        </SidebarFooter>
      </Sidebar>

      <AddTaskGroupModal />
    </Dialog>
  );
}
