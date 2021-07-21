import React from 'react';
import CarouselComp from '../../components/carousel';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <CarouselComp/>
            </div>
         );
    }
}
 
export default LandingPage;