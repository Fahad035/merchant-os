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
        "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-black"
      )}
    >
      <Icon size={20} />

      <span>{item.title}</span>
    </Link>
  );
}