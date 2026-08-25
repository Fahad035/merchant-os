from sqlalchemy import text

from app.core.database import engine


def test_connection():
    with engine.connect() as connection:
        database = connection.execute(
            text("SELECT current_database();")
        ).scalar()

        version = connection.execute(
            text("SELECT version();")
        ).scalar()

        print("=" * 60)
        print("✅ Database Connected Successfully")
        print("=" * 60)
        print(f"Database : {database}")
        print(f"Engine   : PostgreSQL")
        print()
        print(version)
        print("=" * 60)


if __name__ == "__main__":
    test_connection()