import React from 'react';
import AboutComp from '../../components/about';
import CarouselComp from '../../components/carousel';
import ServiceComp from '../../components/service';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <CarouselComp/>
                <ServiceComp/>
                <AboutComp/>
            </div>
         );
    }
}
 
export default LandingPage;