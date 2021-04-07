from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import models
from schema.userSchema import User,toUserModel, userGeneral
from utils import Hash

userRouter = APIRouter()

@userRouter.post('/create-user',response_model=userGeneral,tags=['user'])
def createUser(requestBody:User,db:Session=Depends(get_db)):
    new_user = models.User(**toUserModel(requestBody),passwordHash=Hash.bcrypt(requestBody.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
