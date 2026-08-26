import api from "./api";

import {
  AuditDashboard,
  AuditLog,
} from "@/types/audit";

export async function getAuditDashboard(): Promise<AuditDashboard> {
  const { data } = await api.get<AuditDashboard>(
    "/audit"
  );

  return data;
}

export async function getAuditHistory(): Promise<
  AuditLog[]
> {
  const { data } = await api.get<AuditLog[]>(
    "/audit/history"
  );

  return data;
}

export async function getAuditDetails(
  id: string
): Promise<AuditLog> {
  const { data } = await api.get<AuditLog>(
    `/audit/${id}`
  );

  return data;
}