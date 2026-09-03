"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";

import { AuditLog } from "@/types/audit";

import { useAudit } from "@/hooks/useAudit";

import AuditStats from "@/components/audit/AuditStats";
import AuditTimeline from "@/components/audit/AuditTimeline";
import AuditSearch from "@/components/audit/AuditSearch";
import AuditTable from "@/components/audit/AuditTable";
import AuditDetailsDialog from "@/components/audit/AuditDetailsDialog";

export default function AuditPage() {
  const {
    loading,
    error,

    logs,

    total,
    approved,
    rejected,
    executed,

    search,
    setSearch,
  } = useAudit();

  const [
    selected,
    setSelected,
  ] = useState<AuditLog | null>(
    null
  );

  const [
    dialogOpen,
    setDialogOpen,
  ] = useState(false);

  function viewLog(log: AuditLog) {
    setSelected(log);

    setDialogOpen(true);
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading audit logs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div>

        <h1 className="text-3xl font-bold">
          Audit Center
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor every AI recommendation,
          approval, rejection and execution.
        </p>

      </div>

      <AuditStats
        total={total}
        approved={approved}
        rejected={rejected}
        executed={executed}
      />

      <Card className="border-primary p-6">

        <h2 className="text-xl font-semibold">
          AI Governance
        </h2>

        <p className="mt-3 text-muted-foreground">
          Every AI decision is recorded with
          reasoning, timestamps and execution
          history to provide a complete audit
          trail for merchants.
        </p>

      </Card>

      <AuditSearch
        value={search}
        onChange={setSearch}
      />

      <AuditTimeline
        logs={logs}
      />

      <Card className="p-6">

        <h2 className="mb-5 text-xl font-semibold">
          Audit History
        </h2>

        <AuditTable
          logs={logs}
          onView={viewLog}
        />

      </Card>

      <AuditDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        log={selected}
      />

    </div>
  );
}