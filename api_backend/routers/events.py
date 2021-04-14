from typing import List
from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schema.eventSchema import Event,toEventModel,eventGeneral,eventDetail,eventTags
from models import models

eventRouter = APIRouter(
    prefix='/events',
    tags=['event']
)


@eventRouter.get('',response_model=List[eventGeneral])
def getEvents(db:Session=Depends(get_db)):
    return db.query(models.Event).all()

@eventRouter.get('/{id}',response_model=eventDetail)
def getEvent(id:int,db:Session=Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id==id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')
    return  event

@eventRouter.post('/create-event',status_code=status.HTTP_201_CREATED)
def createEvent(requestBody:Event,db:Session=Depends(get_db)):
    date = db.query(models.Date).filter(models.Date.datetime==requestBody.datetime).first()
    if not date:
        date = models.Date(datetime=requestBody.datetime)
        db.add(date)
        db.commit()
        db.refresh(date)
    new_event = models.Event(datetime_id=date.id,
                            title=requestBody.title,title_img=requestBody.title_img,location=requestBody.location)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    for tag_id in requestBody.tags:
        new_tagmap = models.TagMapper(event_id=new_event.id,tag_id=tag_id)
        db.add(new_tagmap)
        db.commit()
    db.flush()
    return new_event

@eventRouter.put('/update-event/{id}',status_code=status.HTTP_202_ACCEPTED)
def updateEvent(id:int,requestBody:Event,db:Session=Depends(get_db)):
    date = db.query(models.Date).filter(models.Date.datetime==requestBody.datetime).first()
    if not date:
        date = models.Date(datetime=requestBody.datetime)
        db.add(date)
        db.commit()
        db.refresh(date)
    event = db.query(models.Event).filter(models.Event.id==id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')
    event.update(toEventModel(requestBody,date.id))
    db.commit()
    return requestBody

@eventRouter.delete('/delete-event/{id}')
def deleteEvent(id:int,db:Session=Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id==id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='event not found')
    event.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}

@eventRouter.get('/getTags/{id}',response_model=eventTags)
def getTagsByEvent(id:int,db:Session=Depends(get_db)):
    event = db.query(models.Event).get(id)
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')
    return  event

@eventRouter.post('/addTags/{id}')
def addTagToEvent(id:int,tag_id:int,db:Session=Depends(get_db)):
    new_tagmap = models.TagMapper(event_id=id,tag_id=tag_id)
    db.add(new_tagmap)
    db.commit()
    db.flush()
    return {'detail': 'Tag added'}

@eventRouter.delete('/removeTags/{id}')
def removeTagFromEvent(id:int,db:Session=Depends(get_db)):
    tag = db.query(models.TagMapper).filter(models.TagMapper.id==id)
    if not tag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='record not found')
    tag.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'record deleted'}