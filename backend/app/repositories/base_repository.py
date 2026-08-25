from typing import Any, Generic, TypeVar
from uuid import UUID

from sqlalchemy.orm import Session

from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, db: Session, model: type[ModelType]):
        self.db = db
        self.model = model

    def get(self, obj_id: UUID) -> ModelType | None:
        return (
            self.db.query(self.model)
            .filter(self.model.id == obj_id)
            .first()
        )

    def get_all(self) -> list[ModelType]:
        return self.db.query(self.model).all()

    def create(self, **kwargs: Any) -> ModelType:
        obj = self.model(**kwargs)

        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)

        return obj

    def update(
        self,
        obj: ModelType,
        **kwargs: Any,
    ) -> ModelType:

        for key, value in kwargs.items():
            setattr(obj, key, value)

        self.db.commit()
        self.db.refresh(obj)

        return obj

    def delete(self, obj: ModelType) -> None:
        self.db.delete(obj)
        self.db.commit()