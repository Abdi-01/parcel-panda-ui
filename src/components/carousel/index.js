import React from 'react';
import { Carousel } from 'react-bootstrap';
import bg1 from '../../asset/img/bg1.jpg'

class CarouselComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Carousel >
                    <Carousel.Item>
                        <img style={{height: '70vh'}} className="d-block w-100" src={bg1} alt="First slide"/>
                    </Carousel.Item>
                </Carousel>
                <Carousel.Caption>
                </Carousel.Caption>
            </div>
         );
    }
}
 
export default CarouselComp;