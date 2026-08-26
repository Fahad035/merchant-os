from sqlalchemy.orm import Session

from app.repositories.audit_repository import (
    AuditRepository,
)


class AuditService:

    def __init__(self, db: Session):
        self.repository = AuditRepository(db)

    def dashboard(self):
        logs = self.repository.get_all()

        approved = [
            log
            for log in logs
            if log.status.lower() == "approved"
        ]

        rejected = [
            log
            for log in logs
            if log.status.lower() == "rejected"
        ]

        executed = [
            log
            for log in logs
            if log.status.lower() == "executed"
        ]

        return {
            "summary": {
                "total": len(logs),
                "approved": len(approved),
                "rejected": len(rejected),
                "executed": len(executed),
            },
            "logs": logs,
        }

    def history(self):
        return self.repository.get_all()

    def get(self, audit_id):
        return self.repository.get_by_id(audit_id)