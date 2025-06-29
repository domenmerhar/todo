import { CheckCircle2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { SidebarCustomTrigger } from "@/components/sidebar/sidebar-custom-trigger";
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumbs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen} className="inline-block">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TodoGroups</h1>

            <SidebarCustomTrigger className="size-10 ml-auto md:hidden" />
          </div>
        </header>

        <div className="flex">
          <main className="min-w-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NavigationBreadcrumb className="mb-6" /> {children}
          </main>

          <AppSidebar />
        </div>
      </SidebarProvider>
    </>
  );
}
