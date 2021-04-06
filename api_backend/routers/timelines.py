from fastapi import APIRouter,Depends
import datetime
from sqlalchemy.orm import Session
from schema.timelineSchema import Timeline
from schema.eventSchema import Event
from routers.events import createEvent
from models import models
from database import get_db

timelineRouter = APIRouter()



@timelineRouter.get('/timelines')
def getTimelines(db:Session = Depends(get_db)):
    return db.query(models.Timeline).all()

@timelineRouter.post('/create-timeline')
def createTimeline(requestBody: Timeline,db:Session=Depends(get_db)):

    if(requestBody.create_event):
        event = Event(title='',title_img='',datetime=datetime.datetime.now(),location='',tags=[])
        event_id = createEvent(event,db).id
    else:
        event_id = None
    new_timeline = models.Timeline(datetime=requestBody.datetime, title=requestBody.title,
                                    timeline_type=requestBody.timeline_type, event_id=event_id)
    db.add(new_timeline)
    db.commit()
    db.refresh(new_timeline)
    return new_timeline