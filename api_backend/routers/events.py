from typing import List
from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schema.eventSchema import Event,toEventModel,eventGeneral
from models import models

eventRouter = APIRouter()


@eventRouter.get('/events',response_model=List[eventGeneral],tags=['event'])
def getEvents(db:Session=Depends(get_db)):
    return db.query(models.Event).all()

@eventRouter.get('/events/{id}',tags=['event'])
def getEvent(id:int,db:Session=Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id==id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')
    return  event

@eventRouter.post('/create-event',status_code=status.HTTP_201_CREATED,tags=['event'])
def createEvent(requestBody:Event,db:Session=Depends(get_db)):
    new_event = models.Event(datetime=requestBody.datetime,
                            title=requestBody.title,title_img=requestBody.title_img,location=requestBody.location)

    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@eventRouter.put('/update-event/{id}',status_code=status.HTTP_202_ACCEPTED,tags=['event'])
def updateEvent(id:int,requestBody:Event,db:Session=Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id==id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Event not found')
    event.update(toEventModel(requestBody))
    db.commit()
    return requestBody

@eventRouter.delete('/delete-event/{id}',tags=['event'])
def deleteEvent(id:int,db:Session=Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id==id)
    if not event.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='event not found')
    event.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}