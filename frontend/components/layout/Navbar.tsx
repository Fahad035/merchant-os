"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "M";
}

export default function Navbar() {
  const { merchant, logout } = useAuth();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur-md">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-border/60 bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground md:flex">
          <Search className="h-4 w-4" />
          <span>Quick search…</span>
        </div>

        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </button>

        <div className="flex items-center gap-3 border-l border-border/60 pl-4">
          <Avatar className="ring-2 ring-primary/20">
            <AvatarFallback className="brand-gradient text-white">
              {merchant ? initialsFor(merchant.owner_name) : "…"}
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">
              {merchant?.owner_name ?? "Loading…"}
            </p>
            <p className="text-xs text-muted-foreground">
              {merchant?.business_name ?? ""}
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Log out"
            title="Log out"
            className="ml-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}