import React from 'react';
import AboutComp from '../../components/about';
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
                <SwiperComp />
            </div>
         );
    }
}
 
export default LandingPage;