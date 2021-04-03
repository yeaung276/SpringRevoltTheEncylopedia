import React from 'react'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import Timelines from './pages/Timelines';
import AddNewTimeline from './pages/AddNewTimeline';
import Events from './pages/Events';


function App() {
  return (
          <BrowserRouter>
          <Route path='/home' component={Home} />
          <Route path='/timelines' component={Timelines} />
          <Route path='/add-new-timeline' component={AddNewTimeline} />
          <Route path='/events' component={Events} />
          <Route exact path='/' render={()=><Redirect to='/home' />} />
        </BrowserRouter>
   
  );
}

export default App;
