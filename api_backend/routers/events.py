from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database import get_db
from schema.eventSchema import Event
from models import models

eventRouter = APIRouter()

events = []

@eventRouter.get('/events')
def getEvents(db:Session=Depends(get_db)):
    return db.query(models.Event).all()

@eventRouter.get('/events/{id}')
def getEvent(id:int,db:Session=Depends(get_db)):
    return db.query(models.Event).filter(models.Event.id==id).first()

@eventRouter.post('/create-event')
def createEvent(requestBody:Event,db:Session=Depends(get_db)):
    new_event = models.Event(datetime=requestBody.datetime,
                            title=requestBody.title,title_img=requestBody.title_img,location=requestBody.location)

    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@eventRouter.put('/update-event/{id}')
def updateEvent(id:int,request:Event):
    return {
        'id': id,
        **vars(request)
    }

@eventRouter.delete('/delete-event/{id}')
def deleteEvent(id:int):
    return f'event {id} deleted'