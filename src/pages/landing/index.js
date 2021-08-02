import React from 'react';
import AboutComp from '../../components/about';
import ServiceComp from '../../components/service';
import CarouselComp from '../../components/carousel';
import SwiperComp from '../../components/swiper';
// import NavbarComp from '../../components/navbar';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <CarouselComp/>
                <ServiceComp />
                <SwiperComp />
                <AboutComp />
            </div>
         );
    }
}
 
export default LandingPage;