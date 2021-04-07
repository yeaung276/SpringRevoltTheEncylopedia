from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Timeline(Base):
    __tablename__ = 'Timeline'

    id =  Column(Integer, index=True, primary_key=True)
    datetime = Column(DateTime)
    title = Column(String)
    timeline_type = Column(Integer)
    event_id = Column(Integer,ForeignKey('Event.id'))
    event = relationship('Event',back_populates='timeline')

class Event(Base):
    __tablename__ = 'Event'

    id = Column(Integer, index=True, primary_key=True)
    datetime = Column(DateTime)
    title = Column(String)
    title_img = Column(String)
    location = Column(String)
    timeline = relationship('Timeline',back_populates='event')

class Tag(Base):
    __tablename__ = 'Tag'

    id = Column(Integer, index=True, primary_key=True)
    name = Column(String)

class User(Base):
    __tablename__ = 'User'
    
    id = Column(Integer, index=True, primary_key=True)
    username = Column(String)
    email = Column(String)
    passwordHash = Column(String)

class TagMapper(Base):
    __tablename__ = 'TagMapper'

    id = Column(Integer, index=True, primary_key=True)
    event_id = Column(Integer, ForeignKey('Event.id'))
    tag_id = Column(Integer, ForeignKey('Tag.id'))
