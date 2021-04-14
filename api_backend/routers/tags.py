from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from models import models
from database import get_db


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
    tag.delete(synchronize_session=False)
    db.commit()
    return {'detail': 'done'}