import { useAuth } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
import DashLayout from "../ui/dashboard/DashLayout";
import { checkRole } from "@/utils/roles";

export default function Layout({ children }: { children: React.ReactNode }) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <div className="flex flex-auto">
      <DashLayout>{children}</DashLayout>
    </div>
  );
}
