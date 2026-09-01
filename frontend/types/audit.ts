export interface AuditLog {
  id: string;

  merchant_id: string;

  recommendation_id: string;

  event_type: string;

  actor: string;

  details: string;

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