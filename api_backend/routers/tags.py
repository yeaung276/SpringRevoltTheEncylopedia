from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from models import models
from database import get_db
from schema.tagSchema import tagEvent


tagRouter = APIRouter(
    prefix='/tags',
    tags=['tags']
)

@tagRouter.get('')
def getTags(db:Session = Depends(get_db)):
    return db.query(models.Tag).all()

@tagRouter.post('/create-tag')
def createTag(name:str,db:Session=Depends(get_db)):
    new_tag = models.Tag(name=name)
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    return new_tag

@tagRouter.delete('/delete-tag/{id}')
def deleteTag(id:int,db:Session=Depends(get_db)):
    tag = db.query(models.Tag).filter(models.Tag.id==id)
    if not tag.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='Tag not found')
    db.query(models.TagMapper).filter(models.TagMapper.tag_id==tag.first().id).delete(synchronize_session=False)
    tag.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}

@tagRouter.post('/tag-event')
def tagEvent(requestBody:tagEvent,db:Session=Depends(get_db)):
    mapper = db.query(models.TagMapper).filter(models.TagMapper.event_id==requestBody.event_id
            ).filter(models.TagMapper.tag_id==requestBody.tag_id)
    if not mapper.first():
        new_mapper = models.TagMapper(event_id=requestBody.event_id,tag_id=requestBody.tag_id)
        db.add(new_mapper)
        db.commit()
        db.refresh(new_mapper)
    return {'detail': 'done'}

@tagRouter.delete('/untag-event/{id}')
def untagEvent(id:int,db:Session=Depends(get_db)):
    mapper = db.query(models.TagMapper).filter(models.TagMapper.id==id)
    if not mapper.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='tag not found')
    mapper.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}