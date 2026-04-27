import os
import logging
from logging.config import fileConfig

from flask import current_app
 
from alembic import context
from sqlalchemy import create_engine
from extensions import db

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')


def get_engine():
    # 1. Try to get the engine from the Flask app (for normal use)
    try:
        return current_app.extensions['migrate'].db.engine
    except (TypeError, AttributeError, RuntimeError):
        # 2. If that fails (which it does in Railway during build), 
        #    manually create an engine using the DATABASE_URL environment variable
        from sqlalchemy import create_engine
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            raise ValueError("DATABASE_URL is not set in environment!")
        return create_engine(database_url)


def get_engine_url():
    try:
        return get_engine().url.render_as_string(hide_password=False).replace(
            '%', '%%')
    except AttributeError:
        return str(get_engine().url).replace('%', '%%')


# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
config.set_main_option('sqlalchemy.url', get_engine_url())
target_db = current_app.extensions['migrate'].db

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_metadata():
    if hasattr(target_db, 'metadatas'):
        return target_db.metadatas[None]
    return target_db.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url, target_metadata=get_metadata(), literal_binds=True
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    
    # 1. Get the URL directly from the environment (Railway Dashboard)
    db_url = os.environ.get("DATABASE_URL")
    
    # Create the engine directly with the environment URL
    connectable = create_engine(db_url)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=db.metadata, # Ensure this matches your db object
            # IMPORTANT: Do not pass sqlalchemy.url here
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
