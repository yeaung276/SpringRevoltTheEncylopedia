from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from models import models
from schema.contentSchema import Content,ContentEditRequest
from database import get_db

contentRouter = APIRouter(
    prefix='/content',
    tags=['content']
)

@contentRouter.get('')
def getContents(db:Session=Depends(get_db)):
    return db.query(models.Content).all()

@contentRouter.post('/create-content')
def createContent(requestBody:Content,db:Session=Depends(get_db)):
    new_content = models.Content(event_id=requestBody.event_id,content_type=requestBody.content_type,
                                label=requestBody.label,content=requestBody.content)
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    return new_content

@contentRouter.put('/update-content/{id}')
def updateContent(id:int, requestBody:ContentEditRequest,db:Session=Depends(get_db)):
    content = db.query(models.Content).get(id)
    if not content:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='content not found.')
    content.label = requestBody.label
    content.content = requestBody.content
    db.commit()
    return content

@contentRouter.delete('/delete-content/{id}')
def deleteContent(id:int,db:Session=Depends(get_db)):
    content = db.query(models.Content).filter(models.Content.id==id)
    if not content.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='content not found')
    content.delete(synchronize_action=False)
    db.commit()
    return {'detail': 'done'}
