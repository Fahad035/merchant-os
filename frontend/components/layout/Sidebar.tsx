"use client";

import { SIDEBAR_ITEMS } from "./sidebar-items";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white flex flex-col z-50">

      {/* Logo */}

      <div className="border-b px-6 py-7">
        <h1 className="text-3xl font-bold">
          MerchantOS
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          AI Commerce Copilot
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
          />
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t px-6 py-5 text-sm text-gray-500">
        MerchantOS v1.0
      </div>

    </aside>
  );
}