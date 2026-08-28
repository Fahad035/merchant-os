from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog
from app.repositories.base_repository import BaseRepository


class AuditRepository(BaseRepository[AuditLog]):
    def __init__(self, db: Session):
        super().__init__(db, AuditLog)

    def by_event(self, event: str):
        return (
            self.db.query(AuditLog)
            .filter(
                AuditLog.event_type == event
            )
            .all()
        )

    def create(

    self,

    merchant_id,

    recommendation_id,

    action,

    details,

    ):

        audit = AuditLog(

            merchant_id=merchant_id,

            recommendation_id=recommendation_id,

            action=action,

            details=details,

        )

        self.db.add(audit)

        self.db.commit()

        self.db.refresh(audit)

        return audit