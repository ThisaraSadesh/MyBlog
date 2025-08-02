"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login";

  return showSidebar ? <Sidebar /> : null;
}
