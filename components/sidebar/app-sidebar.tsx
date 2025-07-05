import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Avatar from "@/components/avatar";
import { DoorOpenIcon, KeyRound, Plus, UserRoundPen } from "lucide-react";
import SidebarTrigger from "./sidebar-button";

import AddTaskGroupModal from "../modal/add-task-group-modal";
import SidebarDialog from "./sidebar-dialog";
import { EditUsernameModal } from "../modal/edit-username-modal";
import EditPasswordModal from "../modal/edit-password-modal";
import { Button } from "../ui/button";
import { getSession, signOut } from "@/lib/actions/auth";

export async function AppSidebar() {
  const session = await getSession();

  const name = session?.user?.name || "Username";
  const shortName =
    name[0].toUpperCase() +
    name
      .replaceAll(/[aeiou]/gi, "")
      .slice(0, 1)
      .toUpperCase();

  return (
    <>
      <Sidebar side="right" collapsible="icon" className="min-w-12">
        <SidebarRail />
        <SidebarHeader>
          <SidebarTrigger tooltipContent="Username">
            <Avatar variant="large">{shortName}</Avatar> {name}
          </SidebarTrigger>
          <SidebarSeparator className="my-2" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="space-y-4">
            <SidebarMenuItem>
              <SidebarDialog
                icon={<UserRoundPen className="stroke-secondary size-12 p-0" />}
                text="Edit Username"
              >
                <EditUsernameModal />
              </SidebarDialog>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarDialog
                icon={<KeyRound className="stroke-secondary size-12 p-0" />}
                text="Edit Password"
              >
                <EditPasswordModal />
              </SidebarDialog>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarTrigger tooltipContent="Sign Out">
                <Button className="size-12 p-3" asChild onClick={signOut}>
                  <DoorOpenIcon />
                </Button>
                Sign Out
              </SidebarTrigger>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator className="my-2" />

          <SidebarDialog
            icon={<Plus className="stroke-secondary size-12 p-0" />}
            text="Add Group"
          >
            <AddTaskGroupModal />
          </SidebarDialog>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
