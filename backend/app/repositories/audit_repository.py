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