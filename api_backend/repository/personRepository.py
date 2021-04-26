from sqlalchemy.orm import Session
from models import models

def getById(db:Session,id:int):
    return db.query(models.Person).get(id)

def add(db:Session,name='',age=0,photo=''):
    new_person = models.Person(name=name,age=age,photo=photo,content='')
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person

def updateById(db:Session,id,updateFields:dict):
    db.query(models.Person).filter(models.Person.id==id).update(updateFields)
    return 1

def deleteById(db:Session,id:int):
    db.query(models.Person).filter(models.Person.id==id).delete(synchronoze_session=False)
    return 1