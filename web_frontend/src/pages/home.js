import React from 'react';
import {Layout} from 'antd';
import PageHeader from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';


function Home(){
    return(
       <Layout>
           <PageHeader/>
           <Layout.Content>
               Home
           </Layout.Content>
           <PageFooter/>
       </Layout>
    )
}

export default Home;
