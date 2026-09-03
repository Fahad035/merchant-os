"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  const { merchant, loading } = useAuth();
  const router = useRouter();

  // Client-side guard, in addition to middleware.ts — belt and braces in
  // case middleware is ever bypassed (e.g. a stale/cleared cookie mid-session).
  // useEffect(() => {
  //   if (!loading && !merchant) {
  //     router.replace("/login");
  //   }
  // }, [loading, merchant, router]);

  if (loading || !merchant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <div className="flex flex-1 flex-col pl-64">
        <Navbar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}