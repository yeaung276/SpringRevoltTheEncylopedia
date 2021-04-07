from fastapi import APIRouter,Depends,status, HTTPException
import datetime
from sqlalchemy.orm import Session
from schema.timelineSchema import Timeline,toTimelineModel
from schema.eventSchema import Event
from routers.events import createEvent
from models import models
from database import get_db

timelineRouter = APIRouter()



@timelineRouter.get('/timelines',tags=['timelines'])
def getTimelines(db:Session = Depends(get_db)):
    return db.query(models.Timeline).all()

@timelineRouter.post('/create-timeline',status_code=status.HTTP_201_CREATED,tags=['timelines'])
def createTimeline(requestBody: Timeline,db:Session=Depends(get_db)):

    if(requestBody.create_event):
        event = Event(title='',title_img='',datetime=requestBody.datetime,location='',tags=[])
        event_id = createEvent(event,db).id
    else:
        event_id = None
    new_timeline = models.Timeline(datetime=requestBody.datetime, title=requestBody.title,
                                    timeline_type=requestBody.timeline_type, event_id=event_id)
    db.add(new_timeline)
    db.commit()
    db.refresh(new_timeline)
    return new_timeline

@timelineRouter.put('/edit-timeline/{id}',status_code=status.HTTP_202_ACCEPTED,tags=['timelines'])
def editTimeline(id:int,requestBody:Timeline,db:Session=Depends(get_db)):
    timeline = db.query(models.Timeline).filter(models.Timeline.id==id)
    if not timeline.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Timeline not found')
    timeline.update(toTimelineModel(requestBody))
    db.commit()
    return requestBody

@timelineRouter.delete('/delete-timeline/{id}',tags=['timelines'])
def deleteTimeline(id:int,db:Session=Depends(get_db)):
    timeline = db.query(models.Timeline).filter(models.Timeline.id==id)
    if not timeline.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='Timeline not found')
    timeline.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}