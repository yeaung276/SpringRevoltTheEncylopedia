import React from 'react';
import {Layout, Carousel, Image} from 'antd';
import PageHeader from '../Components/PageHeader';
import PageFooter from '../Components/PageFooter';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';


function Home(){
    return(
       <Layout>
           <PageHeader/>
           <Layout.Content>
           <Carousel autoplay style={{marginTop: '1rem'}}>
                <div className='home-image'>
                    <Image
                    preview={false}
                
                    src={img1}
                /></div>
                <div className='home-image'>
                <Image
                    preview={false}
                   
                    src={img2}
                /></div>
                <div className='home-image'>
                <Image
                    preview={false}
                   
                    src={img3}
                /></div>
                <div className='home-image'>
                <Image
                    preview={false}
                    
                    src={img4}
                /></div>

            </Carousel>
            <h2 style={{textAlign: 'center'}}>Guys Help Me Design This; I need feedback</h2>
           </Layout.Content>
           <PageFooter/>
       </Layout>
    )
}

export default Home;
