from fastapi import APIRouter,Depends,HTTPException,status
from typing import List
from sqlalchemy.orm import Session
from models import models
from database import get_db
from schema.dateSchema import DateResponse,EventsByDateResponse

dateRouter = APIRouter(
    prefix='/date',
    tags=['date']
)

@dateRouter.get('',response_model=List[DateResponse])
def getDates(db:Session=Depends(get_db)):
    date = db.query(models.Date).all()
    return date

@dateRouter.get('/{id}',response_model=EventsByDateResponse)
def getEventsByDate(id:int,db:Session=Depends(get_db)):
    events = db.query(models.Date).filter(models.Date.id==id).first()
    if not events:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='not found')
    return events