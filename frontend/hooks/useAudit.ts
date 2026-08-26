"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getAuditDashboard } from "@/lib/audit-api";

import { AuditLog } from "@/types/audit";

export function useAudit() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [total, setTotal] =
    useState(0);

  const [approved, setApproved] =
    useState(0);

  const [rejected, setRejected] =
    useState(0);

  const [executed, setExecuted] =
    useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const dashboard =
          await getAuditDashboard();

        setLogs(dashboard.logs);

        setTotal(
          dashboard.summary.total
        );

        setApproved(
          dashboard.summary.approved
        );

        setRejected(
          dashboard.summary.rejected
        );

        setExecuted(
          dashboard.summary.executed
        );
      } catch (err: any) {
        setError(
          err?.message ??
            "Unable to load audit logs."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const term =
        search.toLowerCase();

      return (
        log.action
          .toLowerCase()
          .includes(term) ||
        log.reasoning
          .toLowerCase()
          .includes(term) ||
        log.status
          .toLowerCase()
          .includes(term)
      );
    });
  }, [logs, search]);

  return {
    loading,

    error,

    logs: filteredLogs,

    total,

    approved,

    rejected,

    executed,

    search,

    setSearch,
  };
}