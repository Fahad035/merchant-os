"use client";

import { Sparkles } from "lucide-react";
import { SIDEBAR_ITEMS } from "./sidebar-items";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl brand-gradient shadow-pop">
          <Sparkles className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-white">
            MerchantOS
          </h1>
          <p className="truncate text-xs text-sidebar-foreground/60">
            AI Commerce Copilot
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          Workspace
        </p>

        <div className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-sidebar-foreground/50">
            MerchantOS v1.0
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>
      </div>
    </aside>
  );
}