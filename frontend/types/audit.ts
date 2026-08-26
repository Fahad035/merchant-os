export interface AuditLog {
  id: string;

  merchant_id: string;

  action: string;

  reasoning: string;

  status: string;

  created_at: string;
}

export interface AuditSummary {
  total: number;

  approved: number;

  rejected: number;

  executed: number;
}

export interface AuditDashboard {
  summary: AuditSummary;

  logs: AuditLog[];
}