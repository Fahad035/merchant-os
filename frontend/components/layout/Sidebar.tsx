"use client";

import { SIDEBAR_ITEMS } from "./sidebar-items";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r bg-white h-screen flex flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          MerchantOS
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          AI Commerce Copilot
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
          />
        ))}
      </nav>

      <div className="border-t p-5 text-sm text-gray-500">
        MerchantOS v1.0
      </div>
    </aside>
  );
}