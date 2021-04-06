from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Timeline(Base):
    __tablename__ = 'Timeline'

    id =  Column(Integer, index=True, primary_key=True)
    datetime = Column(DateTime)
    title = Column(String)
    timeline_type = Column(Integer)
    event_id = Column(Integer)

class Event(Base):
    __tablename__ = 'Event'

    id = Column(Integer, index=True, primary_key=True)
    datetime = Column(DateTime)
    title = Column(String)
    title_img = Column(String)
    location = Column(String)
