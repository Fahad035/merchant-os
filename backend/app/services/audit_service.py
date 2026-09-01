from sqlalchemy.orm import Session

from app.repositories.audit_repository import (
    AuditRepository,
)

from app.models.audit_log import ( AuditLog )


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

    def create_log(
        self,
        merchant_id,
        recommendation_id,
        event_type,
        actor,
        details,
    ):

        log = AuditLog(
            merchant_id=merchant_id,
            recommendation_id=recommendation_id,
            event_type=event_type,
            actor=actor,
            details=details,
        )

        self.db.add(log)

        self.db.commit()

        self.db.refresh(log)

        return log