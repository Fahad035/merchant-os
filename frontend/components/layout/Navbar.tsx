"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">Md Fahad</p>
            <p className="text-xs text-gray-500">
              Merchant
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}