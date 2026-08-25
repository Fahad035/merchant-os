import {
  LayoutDashboard,
  Bot,
  Package,
  Megaphone,
  ShoppingCart,
  ClipboardList,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: Bot,
  },
  {
    title: "Catalog",
    href: "/catalog",
    icon: Package,
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    title: "Checkout",
    href: "/checkout",
    icon: ShoppingCart,
  },
  {
    title: "Audit",
    href: "/audit",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];