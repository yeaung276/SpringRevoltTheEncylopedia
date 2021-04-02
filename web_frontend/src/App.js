import React from 'react'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import {PageHeader,Layout} from 'antd';
import './App.css';
import Home from './pages/home';
import Timelines from './pages/Timelines';
import AddNewTimeline from './pages/AddNewTimeline';

function App() {
  return (
    <Layout>
        <PageHeader
        style={{backgroundColor: '#843b62'}}
        onBack={() => window.history.back()}
        title={<span style={{color: '#0b032d'}}>Spring Revolution Myanmar</span>}
        extra={[

        ]}
        />

      <Layout.Content>
        <div className='container'>
          <BrowserRouter>
          <Route path='/home' component={Home} />
          <Route path='/timelines' component={Timelines} />
          <Route path='/add-new-timeline' component={AddNewTimeline} />
          <Route exact path='/' render={()=><Redirect to='/home' />} />
        </BrowserRouter>
        </div>
        
      </Layout.Content>

      <Layout.Footer style={{ textAlign: 'center' }}>Myanmar Revolution ©2021 Created by MALMal</Layout.Footer>

    </Layout>
   
  );
}

export default App;
