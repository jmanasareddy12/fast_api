from alembic import op
import sqlalchemy as sa

revision = "b08a4b826fcc"
down_revision = "0e4dfb73efd8"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=255), nullable=False),
    )


def downgrade():
    op.drop_table("users")