import React from 'react'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import Timelines from './pages/Timelines';
import AddNewTimeline from './pages/AddNewTimeline';
import Events from './pages/Events';
import EditTimeline from './pages/EditTimeline';
import Content from './pages/Content';
import ManageTags from './pages/ManageTags';


function App() {
  return (
          <BrowserRouter>
          <Route path='/home' component={Home} />
          <Route path='/timelines' component={Timelines} />
          <Route path='/add-new-timeline' component={AddNewTimeline} />
          <Route path='/edit-timeline/:id' component={EditTimeline}/>
          <Route path='/events/:date_id' component={Events} />
          <Route path='/content/:event_id' component={Content}/>
          <Route path='/manage-tags' component={ManageTags}/>
          <Route exact path='/' render={()=><Redirect to='/home' />} />
        </BrowserRouter>
   
  );
}

export default App;
