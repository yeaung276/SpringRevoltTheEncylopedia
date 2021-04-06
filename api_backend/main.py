from fastapi import FastAPI
import routers.events as Events
import routers.timelines as Timelines
from database import Base, engine
from models import models


app = FastAPI()

models.Base.metadata.create_all(bind=engine)


app.include_router(Events.eventRouter)
app.include_router(Timelines.timelineRouter)

@app.get('/')
def hello():
    about = 'This api is wirtten for the website to remember the fallen heros who lost their lives during spring revolution myanmar 2021. "What we can do is to remember our heros and our enemyes."'
    return about

