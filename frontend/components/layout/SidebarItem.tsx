"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItem as SidebarItemType } from "./sidebar-items";
import { cn } from "@/lib/utils";

interface Props {
  item: SidebarItemType;
}

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "brand-gradient text-white shadow-pop"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon
        size={18}
        className={cn(
          "shrink-0 transition-transform",
          active ? "text-white" : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground"
        )}
      />

      <span className="truncate">{item.title}</span>

      {active && (
        <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-white/90" />
      )}
    </Link>
  );
}