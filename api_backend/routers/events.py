from fastapi import APIRouter
from schema.postSchema import Event

router = APIRouter()

@router.get('/events')
def getEvents():
    return 'all events'

@router.get('/events/{id}')
def getEvent(id:int):
    return f'event {id}'

@router.post('/create-event')
def createEvent(request:Event):
    return request

@router.put('/update-event/{id}')
def updateEvent(id:int):
    return f'event {id} updated'

@router.delete('/delete-event/{id}')
def deleteEvent(id:int):
    return f'event {id} deleted'